import express from "express";
import * as mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5100;
app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/sept-2022");
});
