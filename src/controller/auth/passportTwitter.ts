import passport from "passport";
import { Strategy } from "passport-twitter";
require("dotenv").config();

export const intitPassportTwitter = () => {
  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        callbackURL: "http://localhost:3000/auth/twitter/callback",
      },
      function (token, tokenSecret, profile, cb) {
        // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
  );
};
