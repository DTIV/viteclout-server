import express from "express";
import config from "./config";
import userRouter from "./routes/userRouter";
import connectToDB from "./service/db";

const { PORT } = config;

const app = express();

app.use(userRouter);

const bootstrap = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`App is running at ${PORT}`);
    });
  } catch (err) {
    console.log("Error while bootstraping");
    console.log(err);
  }
};

bootstrap();
