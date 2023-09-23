import Boom from "boom";
import { WhereOptions, Op } from "sequelize";
import {
  ArgsVehicleCategoryInterface,
  VehicleCategoryInterface,
  InputVehicleCategoryInterface,
} from "../interfaces";
import { CategoryRepository } from "../repositories";

export class VehicleCategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  findAndCountAll({
    offset,
    limit,
    search,
    sort,
    order,
  }: ArgsVehicleCategoryInterface): Promise<{
    count: number;
    rows: VehicleCategoryInterface[];
  }> {
    let where: WhereOptions<any> = {};
    return this.repository.findAndCountAll({
      where,
      offset,
      limit,
      order: [[order, sort]],
    });
  }

   async findByPk(id: number): Promise<VehicleCategoryInterface> {
    const CategoryExists = await this.repository.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!CategoryExists) {
      throw Boom.notFound("Category does not exist!", [
        {
          message: "Category does not exist!",
          path: ["id"],
        },
      ]);
    }
    return CategoryExists;
  }

  findAll(where?: WhereOptions<any>): Promise<VehicleCategoryInterface[]> {
    return this.repository.findAll({ where });
  }
  async create(input: InputVehicleCategoryInterface): Promise<VehicleCategoryInterface> {
    return this.repository.create(input);
  }
}

