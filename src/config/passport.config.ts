import passport from "passport";
import { Strategy } from "passport-google-oauth20";
// const Strategy = require('passport-google-oauth');
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constants";

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/auth/google/redirect",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log("passport callback function fired");
      console.log(profile);

      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        picture: profile._json.picture,
      };

      return done(null, user);
    },
  ),
);

// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://www.example.com/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

export const passportConfig = passport;
