import express from "express";
import config from "./config";
import userRouter from "./routes/userRouter";
import connectToDB from "./service/db";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";

const { PORT } = config;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.get("/health", (req, res) => {
  res.send("healthy");
});

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
