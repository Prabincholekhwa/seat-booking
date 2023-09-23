import Joi from "joi";
import {
  stringSchema,
  numberSchema
} from "./schemas";

const createCategory = Joi.object({
    name: stringSchema.required().label('name'),
    description: stringSchema.required().label('description'),
    row: numberSchema.required().label('row'),
    column: numberSchema.required().label('column')
});

export { createCategory };
