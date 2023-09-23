import Joi from "joi";
import { UserService } from "services";
import {
  stringSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  otpSchema
} from "./schemas";

const createUser = Joi.object({
    fullName: stringSchema.required().label('fullName'),
    phoneNumber: phoneSchema.required().label("phoneNumber"),
    password: passwordSchema.required().label("password"),
    email: emailSchema.required().label("email")
});


const loginUser = Joi.object({
  email: emailSchema.required().label("email"),
  password: passwordSchema.required().label("password")

});

const emailVerify = Joi.object({
  optCode: otpSchema.required().label("otpCode")
});

export { createUser,loginUser,emailVerify };
