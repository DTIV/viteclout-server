import passport from "passport";
import { Strategy } from "passport-twitter";
require("dotenv").config();
import User from "../../models/user";
import userController from "../user/userController";

export const intitPassportTwitter = () => {
  //serialize user to current session
  //https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
  passport.serializeUser((user: any, done: any) => {
    return done(null, user);
  })

  // !!! DO NOT RETURN ENTIRE USER OBJECT  !!!!
  passport.deserializeUser((user: any, done: any) => {
    return done(null, user);
  })

  passport.use(  
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        callbackURL: "/auth/twitter/callback",
      },
      function (token, tokenSecret, profile, cb) {
        console.log(profile)
        cb(null, profile)
        // userController.findOrCreate(profile.id);
      }
    )
  );
};
