import Boom from "boom";
import { WhereOptions, Op, IncludeOptions } from "sequelize";
import {
  ArgsVehicleInterface,
  VehicleInterface,
  InputVehicleInterface,
} from "../interfaces";
import { VehicleRepository } from "../repositories";
import { VehicleCategoryService } from "./categoryService";
import { Seating } from "../helpers";
import { SeatRepository } from "../repositories";
import Seat from "../models/seat";
import Category from "../models/category";

export class VehicleService {
  private repository: VehicleRepository;
  private repositorySeat: SeatRepository;

  constructor() {
    this.repository = new VehicleRepository();
    this.repositorySeat = new SeatRepository();
  }

  findAndCountAll({
    categoryId,
    offset,
    limit,
    search,
    sort,
    order,
  }: ArgsVehicleInterface): Promise<{
    count: number;
    rows: VehicleInterface[];
  }> {
    let where: WhereOptions<any> = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    const include: IncludeOptions[] = [
      {
        model: Seat,
        as: "seats",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "vehicleId"],
        },
      },
      {
        model: Category,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      },
    ];
    return this.repository.findAndCountAll({
      where,
      include,
      offset,
      limit,
      order: [[order, sort]],
      distinct: true
    });
  }
  
  
  

  async findByPk(id: number): Promise<VehicleInterface> {
    const VehicleExists = await this.repository.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!VehicleExists) {
      throw Boom.notFound("Vehicle does not exist!", [
        {
          message: "Vehicle does not exist!",
          path: ["id"],
        },
      ]);
    }
    return VehicleExists;
  }

  findAll(where?: WhereOptions<any>): Promise<VehicleInterface[]> {
    return this.repository.findAll({ where });
  }

  

  async create(input: InputVehicleInterface): Promise<VehicleInterface> {
    const categoryDetails = await new VehicleCategoryService().findByPk(input.categoryId);
    const data = Seating.generateAnBnCn(categoryDetails.column, categoryDetails.row);
  
    const allSeats = [...data.A, ...data.B, ...data.C];
    const savedVehicle = await this.repository.create({
      categoryId: input.categoryId,
      regNo: input.regNo,
      addedBy: input.addedBy,
    });
    const saveVehicleId: number = parseInt(savedVehicle.id as unknown as string, 10);
  
    const seatTypeMapping: { [key: string]: string[] } = {
      // Define seat numbers that are "Window" seats for each category
      Bus: [
        "A1", "A3", "A5", "A7", "A9", "A11", "A13", "A15", "A17",
        "B2", "B4", "B6", "B8", "B10", "B12", "B14", "B16", "B18",
        "C1", "C5",
      ],
      Microbus: [
        "A1", "A2", "B2", "B4", "C1", "C4",
      ],
    };
  
    const bulkSeatData = allSeats.map((seat) => ({
      vehicleId: saveVehicleId,
      uniqueCode: seat,
      seatType: seatTypeMapping[categoryDetails.name]?.includes(seat) ? "Window" : "Aisle",
      status: "Available",
    }));
  
    await this.repositorySeat.bulkCreate(bulkSeatData);
    return savedVehicle;
  }
  
  
  

  async editVehicle(id: number, input: {}): Promise<number> {
      const [affectedRows] = await this.repository.updateOne({ id, input });
      return affectedRows;
  }
}
