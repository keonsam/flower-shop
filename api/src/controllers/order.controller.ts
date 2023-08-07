import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
import { validate } from "../middleware/validation";
import {
  getCustomersSchema,
  idSchema,
  orderSchema,
} from "../types/schema";
import { authorization } from "../middleware/authorization";
import { Role } from "../types/credential";
import OrderService from "../services/order.service";
import { AddOrderRequest, OrderData } from "../types/Orders";
import { Pagination, Sort } from "../types/pagination";

const router = Router();

const orderService = new OrderService();

router.get(
  "/orders",
  validate(getCustomersSchema, "query"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Orders Request");
    try {
      const { query } = req;

      const pagination: Pagination = {
        pageNumber: Number(query.pageNumber),
        pageSize: Number(query.pageSize),
        sort: query.sort as Sort,
        search: String(query.search || ""),
      };

      const customerId = String(query.customerId || "")

      const customers = await orderService.getOrders(pagination, customerId);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/orders/:id",
  validate(idSchema, "params"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Order Request");

    try {
      const { params } = req;

      const order = await orderService.getOrder(params.id);

      console.log(order);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

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
    req.log.info("Add Order Request");

    try {
      const { user, body } = req;

      const orderData = {
        ...body,
        createdBy: user.credentialId,
      };

      const order = await orderService.addOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/orders/:id",
  validate(idSchema, "params"),
  validate(orderSchema, "body"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Update Order Request");

    try {
      const { params, body } = req;

      const orderData: OrderData = {
        ...body,
      };

      const order = await orderService.updateOrder(params.id, orderData);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/orders/:id",
  validate(idSchema, "params"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Delete Order");

    try {
      const { params } = req;

      const result = await orderService.deleteOrder(params.id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
