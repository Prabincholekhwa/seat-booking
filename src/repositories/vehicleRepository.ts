import { InputVehicleInterface, VehicleInterface } from "../interfaces";
import { BaseRepository } from "./baseRepository";
import Model from "../models";

export class VehicleRepository extends BaseRepository<
InputVehicleInterface,
VehicleInterface
> {
  constructor() {
    super(Model.Vehicle);
  }
}
