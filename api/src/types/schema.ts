import Joi from "joi";

export const authSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const customerSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().trim().min(12),
  location: Joi.string().trim().min(1).required(),
});

export const idSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const getSchema = Joi.object({
  pageNumber: Joi.number().min(1).required(),
  pageSize: Joi.number().min(1).required(),
  sort: Joi.string().allow("asc", "desc").only().required(),
});


// order 

export const orderSchema = Joi.object({
  customerId: Joi.string().uuid().required(),
  items: Joi.array().items(Joi.object({
    id: Joi.string().uuid().required(),
    quantity: Joi.number().min(1),
  }))
})
