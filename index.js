const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./Routers/authRouter");
const userRouter = require("./Routers/userRouter");

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gpsApp");
    app.listen(PORT, () => console.log(`server start on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
