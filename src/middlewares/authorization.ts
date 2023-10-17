import { Request, Response, NextFunction } from 'express';
import { Authentication } from '../helpers';
import { HttpStatusEnum } from '../enums';
import { errorResponseData } from '../utils';

declare global {
  namespace Express {
    interface Request {
      authData?: any;
    }
  }
}

export async function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token?.toString() || req.headers.authorization?.toString() || req.signedCookies["accessToken"];
  if (!token) {
    return errorResponseData(
      {
        message: "Access Token Required",
        res,
        statusCode: HttpStatusEnum.UNAUTHORIZED
      }
    )
  }
  const data = await Authentication.authenticate(token.slice(6), res);
  req.authData = data;
  next();
}
