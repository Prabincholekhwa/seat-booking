import { Request, Response, NextFunction } from 'express';
import { Authentication } from '../helpers';
import { HttpStatusEnum } from '../enums';
import { errorResponseData } from '../utils';
import path = require('path');
import { Profile } from 'passport-google-oauth20';
import { UserRepository } from '../repositories';
declare global {
  namespace Express {
    interface Request {
      authData?: any;
    }
  }
}

export async function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token?.toString() || req.headers.authorization?.toString() || req.signedCookies["accessToken"] ;
  const oAuthToken = req.cookies.oAuthAccessToken ;
  if(!oAuthToken && !token){
        return errorResponseData(
      {
        message: "Access Token Required",
        res,
        statusCode: HttpStatusEnum.UNAUTHORIZED
      }
    )
  }
 if(oAuthToken){
 const { _json } = req.user as Profile;
  const user = await new UserRepository().findOne({where:{
    email: _json.email
  },attributes: ['id', 'email']})
  req.authData = user;
  req.authData.authMethod = 'Oauth';
  return next();
 }
  const data = await Authentication.authenticate(token.slice(6), res);
  req.authData = data;
  return next();
}
