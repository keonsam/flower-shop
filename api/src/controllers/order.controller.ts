import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
// import { Pagination, Sort } from "../types/pagination";
import { validate } from "../middleware/validation";
import {
  customerSchema,
  getSchema,
  idSchema,
  orderSchema,
} from "../types/schema";
import { authorization } from "../middleware/authorization";
import { Role } from "../types/credential";
import OrderService from "../services/order.service";
import { AddOrderRequest } from "../types/Orders";

const router = Router();

// const customerService = new CustomerService();
const orderService = new OrderService();

// router.get(
//   "/orders",
//   validate(getSchema, "query"),
//   authenticate,
//   authorization([Role.ADMIN]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     req.log.info("Get Customers");
//     try {
//       const { query } = req;

//       const pagination: Pagination = {
//         pageNumber: Number(query.pageNumber),
//         pageSize: Number(query.pageSize),
//         sort: query.sort as Sort,
//       };

//       //   const customers = await customerService.getCustomers(pagination);
//       res.status(200).json(customers);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   "/orders/:id",
//   validate(idSchema, "params"),
//   authenticate,
//   authorization([Role.ADMIN]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     req.log.info("Get Order");

//     try {
//       const { params } = req;

//       const order = await orderService.getOrder(params.id);

//       res.status(200).json(order);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.post(
  "/orders",
  validate(orderSchema, "body"),
  authenticate,
  authorization([Role.ADMIN]),
  async (
    req: Request<{}, {}, AddOrderRequest>,
    res: Response,
    next: NextFunction
  ) => {
    req.log.info("Add Order");

    try {
      const { user, body } = req;

      const orderData = {
        customerId: body.customerId,
        createdBy: user.credentialId,
      };

      const order = await orderService.addOrder(orderData, body.items);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

// router.put(
//   "/orders/:id",
//   validate(idSchema, "params"),
//   validate(customerSchema, "body"),
//   authenticate,
//   authorization([Role.ADMIN]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     req.log.info("Update Event Request");

//     try {
//       const { params, body } = req;

//       const customerData: CustomerData = {
//         ...body,
//       };

//       const event = await customerService.updateCustomer(
//         params.id,
//         customerData
//       );

//       res.status(200).json(event);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default router;
