import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as mongoose from "mongoose";

config();
import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter, userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

console.log(process.env.PORT);

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL).then();
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT}`);
});
