import { UserInterface, InputUserInterface, LoginResponseInterface, OAuthInputUserInterface } from "../interfaces";
import { UserRepository } from "../repositories/userRepository";
import { Password } from "../helpers"
import { Mailsender, MailTemplate } from "../helpers";
import redisClient from "../config/redisClients"
import { Op } from "sequelize";
import { successResponseData, errorResponseData } from "../utils";
import { Authentication } from "../helpers";
import Boom from "boom";
import { statSync } from "fs";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async userExist(email: string, phoneNumber?: string): Promise<UserInterface> {
    if (email && phoneNumber) {
      return await this.repository.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { phoneNumber }
          ]
        }
      })
    }

    return await this.repository.findOne({
      where: {
        email
      }
    })
  }


  async findByPk(id: number): Promise<UserInterface> {
    const UserExists = await this.repository.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt","password"],
      },
    });
    if(UserExists){
      throw Boom.notFound("User Does not exist",[
        {
        message:"User does not exist",
        path:["id"]
      }
      ])
    }
    return UserExists;
  }

  async create(input: InputUserInterface): Promise<UserInterface> {
    const userExist = await this.userExist(input.email, input.phoneNumber);
    if (userExist) {
      throw Boom.badRequest("email or phoneNumber already registered", {
        code: "ALREADY_REGISTERED",
        message: "The provided email or phoneNumber is already registered in the system.",
    }); 
    }
    const hashedPassword = await Password.generateSaltHashBcrypt(input.password);
    const emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const emailOptions = {
      to: `${input.email}`,
      subject: "Verify Email",
      text: "Please Verify Your Email",
      html: MailTemplate.verifyEmailTempletae(`${input.fullName}`, Number(emailVerificationCode))
    };

    await redisClient.set(`${"otp" + input.email}`, `${emailVerificationCode}`, 'EX', 3600, 'NX');
    await Mailsender.sendEmail(emailOptions)
    input.password = hashedPassword;
    const data = await this.repository.create(input);
    return await this.repository.findByPk(data.id,
      {
        attributes: {
          exclude:['password']
        }
      }
      );
  }

  async OAuthcreate(input: OAuthInputUserInterface): Promise<UserInterface> {
    
    const emailVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOptions = {
      to: `${input.email}`,
      subject: "Verify Email",
      text: "Please Verify Your Email",
      html: MailTemplate.verifyEmailTempletae(`${input.fullName}`, Number(emailVerificationCode))
    };

    await redisClient.set(`${"otp" + input.email}`, `${emailVerificationCode}`, 'EX', 3600, 'NX');
    await Mailsender.sendEmail(emailOptions)
    const data = await this.repository.create(input);
    return await this.repository.findByPk(data.id,
      {
        attributes: {
          exclude:['password']
        }
      }
      );
  }

  

  async updateIsVerifiedByEmail(id: number, email: string, status: boolean): Promise<number[]> {
      const isAlreadyVerified = await this.repository.updateOne({
        id,
        input: {
          isVerified: status,
        },
      });
      if(isAlreadyVerified){
        await redisClient.del(`${"otp" + email}`);
      }
      return isAlreadyVerified;
  }
  async login(input: UserInterface): Promise<LoginResponseInterface> {
    const userExist = await this.userExist(input.email, input.phoneNumber);
    if (userExist) {
      const passwordMatched = await Password.verifyPasswordBcrypt(input.password, userExist.password);
      if (passwordMatched) {
        return await Authentication.getAccessToken(userExist.id);
      }
      throw Boom.unauthorized("Invalid Password");
    }
    throw Boom.notFound("Invalid Email or PhoneNumber", [
      {
        message: "",
        path: ["Password"],
        error: "Invalid Password"
      },
    ]);
  }
}
