import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenType } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleware.getDinamicallyAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
  userMiddleware.getUserDinamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changeUserPassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  // commonMiddleware.isBodyValid(UserValidator.forgotUserPassword),
  userMiddleware.getUserDinamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  `/password/forgot/:token`,
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  commonMiddleware.isBodyValid(UserValidator.forgotUserPassword),
  authMiddleware.checkOldPassword,
  authController.setForgotPassword
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getUserDinamicallyOrThrow("email"),
  authController.sendActivateToken
);

router.put(
  `/activate/:token`,
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
