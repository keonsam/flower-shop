import { UnAuthorizedError } from "../types/ApplicationError";
import { Role } from "../types/credential";
import { NextFunction, Request, Response } from "express";

export const authorization =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!roles.includes(user.role)) {
      throw new UnAuthorizedError("Unauthorized: invalid user role");
    }

    next();
  };
