import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
require('dotenv').config();
import { UserService } from  "./services"

passport.use(
    new GoogleStrategy({
        clientID: `${process.env.OAUTHENTICATION_CLIENT_ID}`,
        clientSecret: `${process.env.OAUTHENTICATION_CLIENT_SECRET}`,
        callbackURL:"http://localhost:4002/api/v1/user/auth/google/callback",
        scope:["profile", "email"]
    },
      async(accessToken, refreshToken, issuer, profile, callback)=>{
        const userExist = await new UserService().userExist(profile._json.email);
        if(!userExist){
           await new UserService().OAuthcreate({
            email:profile._json.email,
             fullName: `${profile._json.name}`,
              avatar: profile._json.picture ? profile._json.picture : null });
        }
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