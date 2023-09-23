import * as Sequelize from "sequelize";
import {
  ModelTimestampExtend,
  PaginationOrderSearchExtend,
} from "..";
import { SortEnum } from "../../enums";

export interface InputVehicleCategoryInterface {
  name: string;
  description: string;
  row: number;
  column: number;
}

export interface VehicleCategoryInterface extends ModelTimestampExtend {
  id: Sequelize.CreationOptional<number>;
  name:string;
  description: string;
  row: number;
  column: number;
}

export interface VehicleCategoryModelInterface
  extends Sequelize.Model<VehicleCategoryInterface, Partial<InputVehicleCategoryInterface>>,
  VehicleCategoryInterface {}


  export interface ArgsVehicleCategoryInterface extends PaginationOrderSearchExtend {
    order: string;
    sort: SortEnum;
  }
