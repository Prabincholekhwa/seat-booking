import * as Sequelize from "sequelize";
import {
  ModelTimestampExtend,
  PaginationOrderSearchExtend,
} from "..";

export interface InputSeatInterface {
  vehicleId: number;
  uniqueCode: string;
  seatType: string;
  status: string;
}

export interface SeatInterface extends ModelTimestampExtend {
  id: Sequelize.CreationOptional<number>;
  vehicleId: number;
  uniqueCode: string;
  seatType: string;
  status: string;
}

export interface SeatModelInterface
  extends Sequelize.Model<SeatInterface, Partial<InputSeatInterface>>,
    SeatInterface {}

export interface ArgsSeatInterface extends PaginationOrderSearchExtend {
  order: string;
  vehicleId:number;
}
