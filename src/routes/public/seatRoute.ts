import { Validator, exceptionHandler } from "../../middlewares";
import { RouterClass } from "../../classes";
import { SeatController } from "../../controllers";

export class SeatRouter extends RouterClass {
  constructor() {
    super();
  }
  define(): void {
    this.router.route("/").get(exceptionHandler(SeatController.lists));
    this.router.route("/:seatId").get(exceptionHandler(SeatController.findByPk));
  }
}
