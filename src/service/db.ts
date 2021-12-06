import mongoose from "mongoose";
import config from "../config";

const { MONGO_DB_URL } = config;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("Connecter to DB");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
};

export default connectToDB;
