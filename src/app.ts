import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message,
  });
});

const PORT = 5100;
app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/sept-2022").then();
});
