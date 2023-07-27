import { Router, Request, Response, NextFunction } from "express";
import { Login, Register, Role } from "../types/credential";
import CredentialService from "../services/credential.service";
import { validate } from "../middleware/validation";
import { authSchema } from "../types/schema";

const router = Router();

const credentialService = new CredentialService();

router.post(
  "/register",
  validate(authSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Register Request");

    try {
      const registerData: Register = {
        ...req.body,
        role: Role.USER,
      };

      const user = await credentialService.register(registerData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validate(authSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Login Request");

    try {
      const auth: Login = req.body;
      const token = await credentialService.login(auth);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
