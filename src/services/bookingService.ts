import Boom from "boom";
import { WhereOptions, Op, IncludeOptions } from "sequelize";
import {
  ArgsBookingInterface,
  BookingInterface,
  InputBookingInterface,
} from "../interfaces";
import { BookingRepository, SeatRepository } from "../repositories";
import Seat from "../models/seat";
import Vehicle from "../models/vehicle";
import Category from "../models/category";

export class BookingService {
  private repository: BookingRepository;
  private seatRepository: SeatRepository;

  constructor() {
    this.repository = new BookingRepository();
    this.seatRepository = new SeatRepository();
  }

  async isAlreadyExist(where?: WhereOptions<any>): Promise<boolean> {
    const data = await this.repository.findOne({ where });
    if (!data) {
      return false;
    }
    return true;
  }

  findAndCountAll({
    passengerId,
    seatId,
    vehicleId,
    bookingStatus,
    offset,
    limit,
    search,
    sort,
    order,
  }: ArgsBookingInterface): Promise<{
    count: number;
    rows: BookingInterface[];
  }> {
    let where: WhereOptions<any> = {};
    if(passengerId){
      where.passengerId = passengerId;
    }
    if (seatId) {
      where.seatId = seatId;
    }
    if (vehicleId) {
      where.vehicleId = vehicleId;
      
    }
    if (bookingStatus == undefined!) {
      where.bookingStatus = bookingStatus;
      console.log("kjadsad");
      console.log(bookingStatus);
      console.log("kjadsad");
    }
    const include: IncludeOptions[] =[
      {
        model: Seat,
        as: "seats",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "vehicleId"],
        },
      },
      {
        model: Vehicle,
        as: "vehicle",
        attributes: ["id", "regNo"],
        include:[{
          model: Category,
          as:"category",
          attributes:{
            exclude:["createdAt","updatedAt","deletedAt", "row", "column"]
          }
        }]
      }
    ];
    return this.repository.findAndCountAll({
      where,
      include,
      offset,
      limit,
      order: [[order, sort]],
    });
  }

  async findByPk(id: number): Promise<BookingInterface> {
    const bookingExists = await this.repository.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!bookingExists) {
      throw Boom.notFound("Booking does not exist!", [
        {
          message: "Booking does not exist!",
          path: ["id"],
        },
      ]);
    }
    return bookingExists;
  }

  async findAll(where?: WhereOptions<any>): Promise<BookingInterface[]> {
    return this.repository.findAll({ where });
  }

  async findOne(where?: WhereOptions<any>): Promise<BookingInterface> {
    const include: IncludeOptions[] = [
      {
        model: Seat,
        as: "seats",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "vehicleId"],
        },
      },
      {
        model: Vehicle,
        as: "vehicle",
        attributes: ["id", "regNo"],
        include: [
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt", "row", "column"],
            },
          },
        ],
      },
    ];
    return this.repository.findOne({ where,include });
  }

  async create(input: InputBookingInterface): Promise<BookingInterface> {
    const bookingSaved = await this.repository.create(input);
    if (bookingSaved) {
      await this.seatRepository.updateOne({
        id: input.seatId,
        input: {
          status: "Booked"
        }
      })
    }
    return bookingSaved;
  }

  async confirm(input: BookingInterface): Promise<[number]> {
    const data = await this.repository.findOne({
      where: {
        passengerId: input.passengerId,
        id: input.id,
      }
    })

    if (!data) {
      throw Boom.notFound('Booking not found', {
        code: 'BOOKING_NOT_FOUND',
        message: 'The booking you are looking for does not exist.',
      });
    }
    if (data.bookingStatus === 'Cancelled') {
      throw Boom.badRequest('Booking already canceled! Can not confirm cancelled bookings', {
        code: 'BOOKING_ALREADY_CANCELLED',
        message: 'This booking has already been canceled.',
      });
    }
    if (data.bookingStatus === 'Confirmed') {
      throw Boom.badRequest('Booking is already confirmed', {
        code: 'ALREADY_CONFIRMED_BOOKING',
        message: 'This booking has already been confirmed.',
      });

    }
    else {
      await this.seatRepository.updateOne({
        id: data.seatId,
        input: {
          status: "Reserved"
        }
      })
      return await this.repository.updateOne({
        id: input.id,
        input: {
          bookingStatus: "Confirmed"
        }
      })
    }
  }

  async cancel(input: BookingInterface): Promise<[number]> {
    const data = await this.repository.findOne({
      where: {
        passengerId: input.passengerId,
        id: input.id,
      }
    })

    if (!data) {
      throw Boom.notFound('Booking not found', {
        code: 'BOOKING_NOT_FOUND',
        message: 'The booking you are looking for does not exist.',
      });
    }
    if (data.bookingStatus === 'Confirmed') {
      throw Boom.badRequest('Cannot cancel a confirmed booking', {
        code: 'CANCEL_CONFIRMED_BOOKING',
        message: 'You cannot cancel a booking that has already been confirmed.',
      });
    }
    if (data.bookingStatus === 'Cancelled') {
      throw Boom.badRequest('Booking is already canceled', {
        code: 'ALREADY_CANCELED_BOOKING',
        message: 'This booking has already been canceled.',
      });
    }
    else {
      await this.seatRepository.updateOne({
        id: data.seatId,
        input: {
          status: "Available"
        }
      })
      return await this.repository.updateOne({
        id: input.id,
        input: {
          bookingStatus: "Cancelled"
        }
      })
    }
  }
}

