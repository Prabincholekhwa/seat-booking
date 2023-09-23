import Joi from "joi";
import {
  stringSchema,
  idSchema
} from "./schemas";

const createVehicle = Joi.object({
    categoryId: idSchema.required().label('categoryId'),
    regNo: stringSchema.required().label('regNo')
});

export { createVehicle };
