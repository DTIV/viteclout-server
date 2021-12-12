import passport from "passport";
import { Strategy } from "passport-twitter";
require("dotenv").config();
import User from "../../models/user";
import userController from "../user/userController";

export const intitPassportTwitter = () => {
  console.log("Initializing twitter")
  passport.use(  
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        callbackURL: "http://localhost:3000/auth/viteconnect",
      },
      function (token, tokenSecret, profile, cb) {
        console.log(token, tokenSecret, profile, cb);
        console.log(profile)
        userController.findOrCreate(profile.id);
      }
    )

  );
  console.log("HERE")
};
//http://localhost:3000/auth/twitter/callback