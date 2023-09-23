import { Validator, exceptionHandler } from "../../middlewares";
import { RouterClass } from "../../classes";
import { BookingController } from "../../controllers";
import { AuthorizationMiddleware } from "../../middlewares";

export class BookingRouter extends RouterClass {
  constructor() {
    super();
  }
  define(): void {
    this.router.route("/").get(
      AuthorizationMiddleware,
       exceptionHandler(BookingController.lists));

    this.router
      .route("/:id").get(
        AuthorizationMiddleware,
        exceptionHandler(BookingController.findByPk))

    this.router
      .route("/create/:seatId")
      .post(
        AuthorizationMiddleware,
        exceptionHandler(BookingController.create)
      );

    this.router
      .route("/cancel/:bookingId")
      .post(
        AuthorizationMiddleware,
        exceptionHandler(BookingController.cancleBooking)
      );

    this.router
      .route("/confirm/:bookingId")
      .post(
        AuthorizationMiddleware,
        exceptionHandler(BookingController.confirmBooking)
      );
  }
}
