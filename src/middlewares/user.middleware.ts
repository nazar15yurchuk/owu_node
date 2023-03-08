import { NextFunction, Request, Response } from "express";

import { User } from "../models/User.module";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      next();
    } catch (e) {
      next(e)
    }
  }
}

export const userMiddleware = new UserMiddleware();
