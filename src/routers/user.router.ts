import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
