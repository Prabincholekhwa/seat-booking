import * as Sequelize from "sequelize";
import {
  ModelTimestampExtend,
  PaginationOrderSearchExtend,
} from "..";

export interface InputVehicleInterface {
  categoryId: number;
  regNo: string;
  addedBy: number;
}

export interface VehicleInterface extends ModelTimestampExtend {
  id: Sequelize.CreationOptional<number>;
  categoryId: number;
  regNo: string;
  addedBy: number;
}

export interface VehicleModelInterface
  extends Sequelize.Model<VehicleInterface, Partial<InputVehicleInterface>>,
    VehicleInterface {}

export interface ArgsVehicleInterface extends PaginationOrderSearchExtend {
  order: string;
  categoryId: number
}
