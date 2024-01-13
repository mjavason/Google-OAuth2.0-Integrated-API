import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
// const Strategy = require('passport-google-oauth');
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../constants';

export const passportConfig = passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'api/v1/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport callback function fired")
      console.log('User profile:', profile)
    }
  )
);
