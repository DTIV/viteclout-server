import express from "express";
import config from "./config";
import userRouter from "./routes/userRouter";
import connectToDB from "./service/db";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
import healthRouter from "./routes/healthRouter";
import { intitPassportTwitter } from "./controller/auth/passportTwitter";
const session = require("express-session");

const { PORT } = config;

// Create express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "melody hensley is my spirit animal" }));

// Registering routes
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/health", healthRouter);

// Initalising passport twitter
intitPassportTwitter();

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
