import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { BookingService, SeatService } from "../services";
import { errorResponseData, successResponseData } from "../utils";
import { pgMaxLimit, pgMinLimit, defaultOrder, defaultSort } from "../config";;

export class BookingController {
  constructor() { }
  static async list(req: Request, res: Response): Promise<void> {
    try {
      let { search, offset, limit, order, sort } = req.query as any;
      offset = Number(offset) && Number(offset) > 0 ? Number(offset) - 1 : 0;
      limit = limit ? limit : pgMinLimit;
      limit = Math.min(limit, pgMaxLimit);
      order = order ? order : defaultOrder;
      sort = sort ? sort : defaultSort;
      const passengerId = Number(req.authData.user.id);
      const data = await new BookingService().findAll({ passengerId });
      return successResponseData({
        message: "All Bookings are fetched.",
        data: data,
        res,
      });
    } catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      })
    }
  }


  static async create(req: Request, res: Response): Promise<void> {
    try {
      req.body.passengerId = req.authData.user.id
      req.body.seatId = parseInt(req.params.seatId);
      const isAlreadyExist = await new BookingService().isAlreadyExist({
        passengerId: Number(req.authData.user.id),
        seatId: Number(req.params.seatId)
      })

      if (isAlreadyExist) {
        return errorResponseData({
          message: "Booking already exists for this seat and passenger.",
          statusCode: HttpStatusEnum.CONFLICT,
          res,
        });
      }

      const seatData = await new SeatService().findByPk(parseInt(req.params.seatId));
      if (seatData.status === "Available") {
        const vehicleID = seatData.vehicleId;
        req.body.vehicleId = vehicleID;
        const data = await new BookingService().create(req.body);

        return successResponseData({
          data,
          message: "A new booking is created successfully.",
          statusCode: HttpStatusEnum.CREATED,
          res,
        });
      }

      return errorResponseData({
        message: "Seat is already booked.",
        statusCode: HttpStatusEnum.CONFLICT,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      })
    }

  }


  static async lists(req: Request, res: Response): Promise<void> {
    try {
      let { search, offset, limit, order, sort } = req.query as any;
      let passengerId = Number(req.authData.user.id);
      let seatId = Number(req.query.seatId);
      let bookingStatus = String(req.query.bookingStatus).charAt(0).toLocaleUpperCase() + String(req.query.bookingStatus).slice(1).toLocaleLowerCase();  
      let vehicleId = Number(req.query.vehicleId);
      
      offset = Number(offset) && Number(offset) > 0 ? Number(offset) - 1 : 0;
      limit = limit ? limit : pgMinLimit;
      limit = Math.min(limit, pgMaxLimit);
      search = search ? search : undefined;
      order = order ? order : defaultOrder;
      sort = sort ? sort : defaultSort;
      const { count, rows: data } = await new BookingService().findAndCountAll({
        offset,
        limit,
        search,
        sort,
        order,
        passengerId,
        seatId,
        vehicleId,
        bookingStatus
      });

      return successResponseData({
        message: "All Bookings are fetched.",
        data,
        count,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      })
    }

  }


  static async confirmBooking(req: Request, res: Response): Promise<void> {
    try {
      req.body.passengerId = req.authData.user.id
      req.body.id = req.params.bookingId
      const data = await new BookingService().confirm(req.body);
      return successResponseData({
        data,
        message: "Booking confirmed successfully.",
        statusCode: HttpStatusEnum.CREATED,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      })
    }
  }


  static async cancleBooking(req: Request, res: Response): Promise<void> {
    try {
      req.body.passengerId = req.authData.user.id
      req.body.id = req.params.bookingId
      const data = await new BookingService().cancel(req.body);
      return successResponseData({
        data,
        message: "Seat Unbooked successfully.",
        statusCode: HttpStatusEnum.CREATED,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      })
    }
  }


  static async findByPk(req: Request, res: Response): Promise<void> {
    try {
      const data = await new BookingService().findOne({ id: Number(req.params.id), passengerId: Number(req.authData.user.id) });
      if (!data) {
        return errorResponseData({
          message: "Booking not found",
          res,
          statusCode: HttpStatusEnum.NOT_FOUND
        });
      }
      return successResponseData({
        data,
        message: "Booking details fetched successfully",
        statusCode: HttpStatusEnum.OK,
        res,
      });
    }
    catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      })
    }
  }
}
