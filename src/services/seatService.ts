import Boom from "boom";
import { WhereOptions, IncludeOptions } from "sequelize";
import {
  ArgsSeatInterface,
  SeatInterface,
  InputSeatInterface,
} from "../interfaces";
import { SeatRepository } from "../repositories";
import Vehicle from "../models/vehicle";
import Category from "../models/category";

export class SeatService {
  private repository: SeatRepository;

  constructor() {
    this.repository = new SeatRepository();
  }

  findAndCountAll({
    vehicleId,
    offset,
    limit,
    search,
    sort,
    order,
  }: ArgsSeatInterface): Promise<{
    count: number;
    rows: SeatInterface[];
  }> {
    let where: WhereOptions<any> = {};
    if(vehicleId){
      where.vehicleId = vehicleId;
    }
    const include: IncludeOptions[] = [
      {
        model: Vehicle,
        as: "vehicle",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      },
    ];
    return this.repository.findAndCountAll({
      where,
      include,
      offset,
      limit,
      order: [[order, sort]],
    });
  }

   async findByPk(id: number): Promise<SeatInterface> {
    const include: IncludeOptions[] = [
      {
        model: Vehicle,
        as: "vehicle",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      },
    ];
    const seatExists = await this.repository.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include
    });
    if (!seatExists) {
      throw Boom.notFound("Seat does not exist!", [
        {
          message: "Seat does not exist!",
          path: ["id"],
        },
      ]);
    }
    return seatExists;
  }

  findAll(where?: WhereOptions<any>): Promise<SeatInterface[]> {
    return this.repository.findAll({ where });
  }
  async create(input: InputSeatInterface): Promise<SeatInterface> {
    return this.repository.create(input);
  }
}

