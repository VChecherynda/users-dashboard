import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  location: Joi.string().required(),
});

export interface CreateUserDto {
  name: string;
  age: number;
  location: string;
}
