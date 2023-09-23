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


export interface UserInterface extends ModelTimestampExtend, InputUserInterface {
  id: Sequelize.CreationOptional<number>;
}

export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface {}