import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { SeatService } from "../services";
import { successResponseData, errorResponseData } from "../utils";
import { pgMaxLimit, pgMinLimit, defaultOrder, defaultSort } from "../config";
import { STRING } from "sequelize";

export class SeatController {
  constructor() { }
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const data = await new SeatService().findAll();
      return successResponseData({
        message: "All seats are fetched.",
        data,
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
      const data = await new SeatService().create(req.body);

      return successResponseData({
        data,
        message: "A new seat is created successfully.",
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
    try {
      let { search, offset, limit, order, sort } = req.query as any;
      let vehicleId = Number(req.query.vehicleId);
      let categoryId = Number(req.query.categoryId);
      offset = Number(offset) && Number(offset) > 0 ? Number(offset) - 1 : 0;
      limit = limit ? limit : pgMinLimit;
      limit = Math.min(limit, pgMaxLimit);
      search = search ? search : undefined;
      order = order ? order : defaultOrder;
      sort = sort ? sort : defaultSort;
      const { count, rows: data } = await new SeatService().findAndCountAll({
        offset,
        limit,
        search,
        sort,
        order,
        vehicleId
      });
      return successResponseData({
        message: "All seats are fetched.",
        data,
        count,
        res,
      });
    }
    catch (err) {
      return errorResponseData(
        {
          message: `${err}`,
          res
        }
      )
    }
  }

  static async findByPk(req: Request, res: Response):Promise<void>{
    try{
      const data = await new SeatService().findByPk(Number(req.params.seatId))
      return successResponseData({
        data,
        message:"Get Seat Detail Successful",
        res,
        statusCode: HttpStatusEnum.OK
      })
    }
    catch(err){
      return errorResponseData({
        message:`${err}`,
        res
      })
    }
  }
}
