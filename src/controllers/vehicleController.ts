import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { VehicleService } from "../services";
import { errorResponseData, successResponseData } from "../utils";
import { pgMaxLimit, pgMinLimit, defaultOrder, defaultSort } from "../config";

export class VehicleController {
  constructor() { }
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const data = await new VehicleService().findAll();
      return successResponseData({
        message: "All Vehicle are fetched.",
        data: data,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res
      })
    }

  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      req.body.addedBy = req.authData.user.id
      const data = await new VehicleService().create(req.body);
      return successResponseData({
        data,
        message: "A new vehicle is created successfully.",
        statusCode: HttpStatusEnum.CREATED,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res
      })
    }

  }

  static async lists(req: Request, res: Response): Promise<void> {
    try{
      console.log("authdata");
      console.log(req.authData.authMethod);
      let { search, offset, limit, order, sort } = req.query as any;
    let categoryId = Number(req.query.categoryId)
    console.log(categoryId);
    offset = Number(offset) && Number(offset) > 0 ? Number(offset) - 1 : 0;
    limit = limit ? limit : pgMinLimit;
    limit = Math.min(limit, pgMaxLimit);
    search = search ? search : undefined;
    order = order ? order : defaultOrder;
    sort = sort ? sort : defaultSort;
    const { count, rows: data } = await new VehicleService().findAndCountAll({
      offset,
      limit,
      search,
      sort,
      order,
      categoryId
    });

    return successResponseData({
      message: "All Vehicles are fetched.",
      data,
      count,
      res,
    });
    }
    catch(err){
      return errorResponseData({
        message:`${err}`,
        res
      })
    }
  }
}
