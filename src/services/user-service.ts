import dotenv from "dotenv";
import querystring from "querystring";
import axios from "axios";
import prisma from "../apps/database";
import { ResponseError } from "../errors/response-error";
import { UpdateDepositGrowid } from "../models/users-model";
import { Validation } from "./validation";
import { UserValidation } from "../validations/user-validation";
import { User } from "@prisma/client";

dotenv.config();
export class UserService {
  static loginDiscord(): String {
    const urlQuery = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      response_type: "code",
      scope: "identify",
    });
    return urlQuery;
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

    const { access_token } = response.data;

    let user = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!user.data) {
      throw new ResponseError(404, "Something wrong with discord Oauth");
    }

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
          token: access_token,
        },
      });
    } else {
      await prisma.user.update({
        data: {
          token: access_token,
        },
        where: {
          user_id: user.data.id,
        },
      });
    }

    return access_token;
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
}
