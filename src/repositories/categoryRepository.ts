import { InputVehicleCategoryInterface, VehicleCategoryInterface } from "../interfaces";
import { BaseRepository } from "./baseRepository";
import Model from "../models";

export class CategoryRepository extends BaseRepository<
InputVehicleCategoryInterface,
VehicleCategoryInterface
> {
  constructor() {
    super(Model.Category);
  }
}
