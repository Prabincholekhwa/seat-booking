import { Validator, exceptionHandler } from "../../middlewares";
import { RouterClass } from "../../classes";
import { VehicleCategoryController } from "../../controllers";
import { createCategory } from "../../validators";
import { AuthorizationMiddleware } from "../../middlewares";

export class CategoryRouter extends RouterClass {
  constructor() {
    super();
  }
  define(): void {
    this.router.route("/").get(exceptionHandler(VehicleCategoryController.lists));
    this.router
      .route("/create")
      .post(
        AuthorizationMiddleware,
        Validator.check(createCategory),
        exceptionHandler(VehicleCategoryController.create)
      );
  }
}
