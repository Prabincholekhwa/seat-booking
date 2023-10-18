import * as Sequelize from "sequelize";
import {
  ModelTimestampExtend,
  PaginationOrderSearchExtend,
} from "../../interfaces"

export interface InputUserInterface {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
}

export interface UserInterface extends ModelTimestampExtend {
  id: Sequelize.CreationOptional<number>;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  avatar: string
}



export interface OAuthInputUserInterface {
  fullName: string;
  email: string;
  avatar: string;
}


export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface {}