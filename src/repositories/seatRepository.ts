import { InputSeatInterface, SeatInterface } from "../interfaces";
import { BaseRepository } from "./baseRepository";
import Model from "../models";

export class SeatRepository extends BaseRepository<
InputSeatInterface,
SeatInterface
> {
  constructor() {
    super(Model.Seat);
  }
}
