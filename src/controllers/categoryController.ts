import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import {  VehicleCategoryService } from "../services";
import { errorResponseData, successResponseData } from "../utils";
import { pgMaxLimit, pgMinLimit, defaultOrder, defaultSort } from "../config";

export class VehicleCategoryController {
  constructor() {}
  static async list(req: Request, res: Response): Promise<void> {
    try{
      const data = await new VehicleCategoryService().findAll();
    return successResponseData({
      message: "All Vehicle Categories are fetched.",
      data: data,
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

  static async create(req: Request, res: Response): Promise<void> {
    try{
      const data = await new VehicleCategoryService().create(req.body);
    return successResponseData({
      data,
      message: "A new Category is created successfully.",
      statusCode: HttpStatusEnum.CREATED,
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

  static async lists(req: Request, res: Response): Promise<void> {
    try{
      // console.log("session");
      // console.log(req.session);
      // console.log("session");
      let { search, offset, limit, order, sort } = req.query as any;
      offset = Number(offset) && Number(offset) > 0 ? Number(offset) - 1 : 0;
      limit = limit ? limit : pgMinLimit;
      limit = Math.min(limit, pgMaxLimit);
      search = search ? search : undefined;
      order = order ? order : defaultOrder;
      sort = sort ? sort : defaultSort;
      const { count, rows: data } = await new VehicleCategoryService().findAndCountAll({
        offset,
        limit,
        search,
        sort,
        order,
      });
  
      return successResponseData({
        message: "All Vehicle Categories are fetched.",
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
