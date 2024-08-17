import dotenv from "dotenv";
import querystring from "querystring";
import axios from "axios";
import prisma from "../apps/database";
import { ResponseError } from "../errors/response-error";
import {
  UpdateDepositGrowid,
  UserSaveRequest,
  UserSaveResponse,
} from "../models/users-model";
import { Validation } from "./validation";
import { UserValidation } from "../validations/user-validation";
import { Store, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();
export class UserService {
  static generateRandomState() {
    return crypto.randomBytes(16).toString("hex");
  }
  static loginDiscord(): { url: string; oauthState: string } {
    const state = this.generateRandomState();
    const urlQuery = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      response_type: "code",
      scope: "identify",
      state: state,
    });
    return {
      url: urlQuery,
      oauthState: state,
    };
  }

  static async callbackDiscordLogin(code: string): Promise<string> {
    if (!code) {
      throw new ResponseError(404, "Code not provide");
    }
    const params = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      scope: "identify",
    });
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response);

    const { access_token, refresh_token } = response.data;

    let user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!user.data) {
      throw new ResponseError(404, "Something wrong with discord Oauth");
    }

    const newToken = jwt.sign(
      {
        id: user.data.id,
      },
      process.env.JWT_SECRET_KEY! || "INIRAHASIA"
    );

    console.log(newToken);
    console.log(process.env.JWT_SECRET_KEY);
    console.log(user.data.id);

    const isUserExist = await prisma.user.findFirst({
      where: {
        user_id: user.data.id,
      },
    });

    if (!isUserExist) {
      await prisma.user.create({
        data: {
          user_id: user.data.id,
          username: user.data.username,
          avatar: user.data.avatar,
          token: newToken,
        },
      });
    } else {
      console.log("updaing token");
      await prisma.user.update({
        data: {
          token: newToken,
        },
        where: {
          user_id: user.data.id,
        },
      });
    }

    return newToken;
  }

  static async updateDepositGrowid(
    user: User,
    deposit: UpdateDepositGrowid
  ): Promise<UpdateDepositGrowid> {
    deposit = Validation.validate(UserValidation.UPDATEDEPOSITGROWID, deposit);

    const growid = await prisma.user.count({
      where: {
        growid: deposit.growid,
      },
    });

    if (growid > 1) {
      throw new ResponseError(400, "Growid has taken");
    }

    const newGrowid = await prisma.user.update({
      data: {
        growid: deposit.growid.toLowerCase(),
      },
      where: {
        user_id: user.user_id,
      },
      select: {
        growid: true,
      },
    });

    return {
      growid: newGrowid.growid ?? "NO_SET_GROWID",
    };
  }

  static async getStoreByToken(token: string): Promise<any> {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
      include: {
        store: {
          select: {
            store_id: true,
            is_active: true,
          },
        },
      },
    });
    return user?.store;
  }

  static async saveUser(user: UserSaveRequest): Promise<UserSaveResponse> {
    const newUser = Validation.validate(UserValidation.SAVEUSER, user);

    let existUser = await prisma.user.findFirst({
      where: {
        user_id: newUser.id,
      },
    });

    if (existUser) {
      existUser = await prisma.user.update({
        data: {
          username: newUser.username,
          token: newUser.token,
        },
        where: {
          user_id: newUser.id,
        },
      });
    } else {
      existUser = await prisma.user.create({
        data: {
          user_id: newUser.id,
          username: newUser.username,
          token: newUser.token,
          avatar: newUser.avatar,
        },
      });
      await prisma.store.create({
        data: {
          store_id: crypto.randomUUID(),
          user_id: newUser.id,
          store_name: `${newUser.username}'s store`,
          private_key: crypto.randomUUID(),
          is_active: false,
          name: newUser.username,
        },
      });
    }

    const store = await prisma.store.findFirst({
      where: {
        user_id: newUser.id,
      },
    });

    return {
      token: existUser.token,
      store_id: store?.store_id || null,
    };
  }
}
