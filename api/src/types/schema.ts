import Joi from "joi";
import { OrderStatus } from "./Orders";

export const authSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const customerSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().allow("").email(),
  phoneNumber: Joi.string().allow("").trim().min(10),
  location: Joi.string().trim().min(1).required(),
});

export const idSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const getSchema = Joi.object({
  pageNumber: Joi.number().min(1),
  pageSize: Joi.number().min(1),
  sort: Joi.string().allow("asc", "desc").only(),
  search: Joi.string().trim(),
});


export const getCustomersSchema = Joi.object({
  pageNumber: Joi.number().min(1),
  pageSize: Joi.number().min(1),
  sort: Joi.string().allow("asc", "desc").only(),
  search: Joi.string().trim(),
  customerId: Joi.string().trim().uuid()
});

// order
export const orderSchema = Joi.object({
  customerId: Joi.string().uuid().required(),
  deliveryTime: Joi.string().isoDate().required(),
  status: Joi.string().allow(...Object.values(OrderStatus)).only(),
  items: Joi.array()
    .items(
      Joi.object({
        flowerId: Joi.string().uuid().required(),
        quantity: Joi.number().min(1),
      })
    )
    .min(1),
});
