import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import fs from 'fs';
import path from "path";
import { UserInterface } from "../interfaces";
import {UserRepository} from "../repositories";
import { errorResponseData } from "../utils";
require("dotenv").config();
import { HttpStatusEnum } from "../enums";
import Boom from "boom";

require("dotenv").config();

class Authentication {
  private static instance: Authentication;


  static get(): Authentication {
    if (!Authentication.instance) {
        Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

   async getAccessToken(user_id:number):Promise<{ token: string; expiresIn: string; user: UserInterface}>{
    const payload = {
        id: user_id
    };
    const expiresIn = "12h";
    const pathToPrivateKey = path.join(__dirname,"..","privateKey.pem");
    const privateKey = fs.readFileSync(pathToPrivateKey,"utf8");
    const signedToken = jwt.sign(payload,privateKey,{
      algorithm:"RS256",
      expiresIn
    });
    const user = await new UserRepository().findByPk(user_id,{attributes: ['id', 'email']});
    return {
      token: "Bearer" + signedToken,
      expiresIn,
      user
    }
  }

  async authenticate(token: string, res:any): Promise<{ user: UserInterface } | boolean | any> {
    try{
      const pathToPublicKey = path.join(__dirname, "..", "publicKey.pem");
      const publicKey = fs.readFileSync(pathToPublicKey, "utf8");
      const decoded: JwtPayload = jwt.verify(token, publicKey) as JwtPayload;
      const user = await new UserRepository().findByPk(decoded.id, { attributes: ['id', 'email'] }) as UserInterface | null;
      if (user) {
        return {
          user,
        };
      }
      return false;
    }
    catch(error:any){
      return errorResponseData({
        message: `${error.message}`,
        res,
        statusCode:HttpStatusEnum.UNAUTHORIZED
        
      })
    }
  }
}
const authentication = Authentication.get();
export { authentication as Authentication };
