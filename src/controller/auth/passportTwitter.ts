import passport from "passport";
import { Strategy } from "passport-twitter";
require("dotenv").config();
import User from "../../models/user";
import userController from "../user/userController";

export const intitPassportTwitter = () => {
  //serialize user to current session
  //https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

  passport.serializeUser((user: any, done: any) => {
    return done(null, user._id);
  })

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, doc: any) => {
      return done(null, doc);
    })
  })

  passport.use(  
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        callbackURL: "/auth/twitter/callback",
      },
      function (token, tokenSecret, profile, cb) {
        User.findOne({twitterId: profile.username}, async (err:Error, doc: any) => {
          if(err){ 
            return cb(err, null)
          }
          if(!doc){
            const newUser = userController.findOrCreate(profile.username, profile.id);
            // doc object gets sent to serializer
            cb(null, newUser)
          }
          // doc object gets sent to serializer
          console.log("DOC",doc)
          cb(null, doc)
        })
        
        
      }
    )
  );
};
