import { Validator, exceptionHandler } from "../../middlewares";
import { RouterClass } from "../../classes";
import { UserController } from "../../controllers";
import { createUser,loginUser, emailVerify } from "../../validators";
import { AuthorizationMiddleware } from "../../middlewares";
import passport from "passport";
require("dotenv").config();

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
      this.router.route("/logout")
      .delete(
      AuthorizationMiddleware,
      exceptionHandler(UserController.logOut)
      );


      //GoogleO Auth Routes
      this.router.route("/auth/google/callback")
      .get(passport.authenticate('google',{
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/auth/login/failed"
      }));

      this.router.route("/auth/login/failed")
      .get(
        exceptionHandler(UserController.oauthLoginFailed)
      );

        this.router.route("/auth/login/success")
        .get(
          exceptionHandler(UserController.oauthLoginSuccess)
        );
  }
}

