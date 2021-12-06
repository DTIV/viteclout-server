import mongoose from "mongoose";

const DB_URL =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connecter to DB");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
};

export default connectToDB;
