import { Validator, exceptionHandler } from "../../middlewares";
import { RouterClass } from "../../classes";
import { VehicleController } from "../../controllers";
import { AuthorizationMiddleware } from "../../middlewares";
import { createVehicle } from "../../validators";


export class VehicleRouter extends RouterClass {
  constructor() {
    super();
  }
  define(): void {
    this.router.route("/").get(
      AuthorizationMiddleware,
      exceptionHandler(VehicleController.lists)
    );
    
    this.router
      .route("/create")
      .post(
        AuthorizationMiddleware,
        Validator.check(createVehicle),
        exceptionHandler(VehicleController.create)
      );
  }
}
