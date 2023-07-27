import { JwtPayload } from "jsonwebtoken";
import { Base, BaseTable, CreateOmit } from "./common";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type Credential = Base & {
  username: string;
  password: string;
  role: Role;
};

export type CredentialTable = BaseTable & {
  user_id: string;
  username: string;
  password: string;
  role: Role;
};

export type CreateCredential = Omit<Credential, CreateOmit>;

export type Login = Pick<Credential, "username" | "password">;

export type Register = Pick<Credential, "username" | "password" | "role">;

export type CreateJWT = {
  credentialId: string;
  role: Role;
};

export interface UserPayload extends JwtPayload {
  credentialId: string;
  role: Role;
}
