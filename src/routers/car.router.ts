import { Router } from "express";

import { commonMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.post(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.createCar),
  carController.create
);

router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isCarIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isCarIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.updateCar),
  carController.update
);

router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isCarIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete
);

export const carRouter = router;
