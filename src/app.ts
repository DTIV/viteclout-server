import express from "express";
import config from "./config";
const { PORT } = config;

const app = express();

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
