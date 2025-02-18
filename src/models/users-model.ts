import { User } from "@prisma/client";
import { Request } from "express";
import session, { Session, SessionData } from "express-session";

export type UserLoginResponse = {
  token: string;
};

export interface UserSessionRequest extends Request {
  session: any;
}

export interface UserRequest extends Request {
  user?: User;
}

export type UpdateDepositGrowid = {
  growid: string;
};

export type GetUserInfoResponse = {
  growid: string;
  username: string;
};

export type UserSaveRequest = {
  username: string;
  token: string;
  id: string;
  avatar: string;
};

export type UserSaveResponse = {
  token: string;
  store_id: string | null;
};
