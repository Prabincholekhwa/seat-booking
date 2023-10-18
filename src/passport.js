import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
require('dotenv').config();

passport.use(
    new GoogleStrategy({
        clientID: `${process.env.OAUTHENTICATION_CLIENT_ID}`,
        clientSecret: `${process.env.OAUTHENTICATION_CLIENT_SECRET}`,
        callbackURL:"http://localhost:4002/api/v1/user/auth/google/callback",
        scope:["profile", "email"]
    },
      (accessToken, refreshToken, profile, callback)=>{
        callback(null, profile);
      }
    )
);

passport.serializeUser((user, done)=>{
  done(null, user);
});

passport.deserializeUser((user, done)=>{
  done(null, user);
});

export {passport};