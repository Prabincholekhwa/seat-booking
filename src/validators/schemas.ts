import joiDate from '@joi/date';
import joi from 'joi';

const Joi = joi as typeof joi;
const JoiDate = Joi.extend(joiDate);

const stringSchema = Joi.string();

const numberSchema = Joi.number();


const booleanSchema = Joi.boolean();

const positiveIntegerSchema = Joi.number().integer().min(1);

const emailSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .lowercase();

const phoneSchema = Joi.string()
  .min(7)
  .max(15)
  .pattern(/^([+]|[00]{2})([0-9]|[ -])*/);

  const idSchema = Joi.number().max(10).min(1);

const urlSchema = Joi.string().uri();

const dateSchema = JoiDate.date().format(['YYYY/MM/DD', 'YYYY-MM-DD']);

const timeSchema = JoiDate.date().format(['HH:mm:ss']);

const dateAndTimeSchema = JoiDate.date();

const arraySchema = Joi.array();

const forbiddenSchema = Joi.forbidden();

const passwordSchema = Joi.string()
  .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{6,}$/)
  .min(6)
  .messages({
    'string.pattern.base': 'Password must include at least one letter, one number, and one special character',
    'string.min': 'Password must have a minimum length of 6 characters',
  });

  const otpSchema = Joi.string().length(6);


export {
  stringSchema,
  numberSchema,
  positiveIntegerSchema,
  emailSchema,
  phoneSchema,
  urlSchema,
  dateSchema,
  timeSchema,
  dateAndTimeSchema,
  arraySchema,
  booleanSchema,
  forbiddenSchema,
  passwordSchema,
  idSchema,
  otpSchema
};
