import { Validator, exceptionHandler } from "../../middlewares";
import { RouterClass } from "../../classes";
import { UserController } from "../../controllers";
import { createUser,loginUser, emailVerify } from "../../validators";
import { AuthorizationMiddleware } from "../../middlewares";

export class UserRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/create")
      .post(
        Validator.check(createUser),
        exceptionHandler(UserController.create)
      );
      this.router
      .route("/verify")
      .post(
        AuthorizationMiddleware,
        exceptionHandler(UserController.verifyEmail)
      );
      this.router
      .route("/login")
      .post(
        Validator.check(loginUser),
        exceptionHandler(UserController.login)
      );
  }
}

