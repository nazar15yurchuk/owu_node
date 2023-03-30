import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as http from "http";
import * as mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import * as swaggerUi from "swagger-ui-express";

import * as swaggerJson from "./utils/swagger.json";

config();

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter, userRouter } from "./routers";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:63342/",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  // io.emit("user:connected", { message: "USER CONNECTED" });
  // socket.broadcast.emit("user:connected", { message: "USER CONNECTED" });

  socket.on("message:send", (text) => {
    io.emit("message:get", `${text}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on("join:room", ({ roomId }) => {
    socket.join(roomId);

    socket
      .to(roomId)
      .emit("user:joined", { socketId: socket.id, action: "Joined" });

    socket.on("leave:room", ({ roomId }) => {
      socket.leave(roomId);
      socket
        .to(roomId)
        .emit("user:left", { socketId: socket.id, action: "Left" });
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

console.log(process.env.PORT);

server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL).then();
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT}`);
});
