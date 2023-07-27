import config from "../config";
import logger from "../middleware/logger";
import { CreateJWT } from "../types/credential";
import jwt from "jsonwebtoken";

const { jwtSecret } = config;

export default class JWTService {
  decodeJWT(token: string) {
    const decoded = jwt.verify(token, jwtSecret);
    logger.info({ decoded }, "token successfully decoded");

    return decoded;
  }

  signJWT(jwtData: CreateJWT) {
    const token = jwt.sign(jwtData, jwtSecret, { expiresIn: "1d" });

    logger.info({ token }, "token successfully generated");
    return token;
  }
}
