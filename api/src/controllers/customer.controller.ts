import { NextFunction, Request, Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
import { Pagination, Sort } from "../types/pagination";
import { validate } from "../middleware/validation";
import { customerSchema, getSchema, idSchema } from "../types/schema";
import CustomerService from "../services/customer.service";
import { CustomerData } from "../types/Customer";
import { authorization } from "../middleware/authorization";
import { Role } from "../types/credential";

const router = Router();

const customerService = new CustomerService();

router.get(
  "/customers",
  validate(getSchema, "query"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Customers Request");
    try {
      const { query } = req;

      const pagination: Pagination = {
        pageNumber: Number(query.pageNumber || 0),
        pageSize: Number(query.pageSize || 0),
        sort: query.sort as Sort || 'asc',
        search: String(query.search || ""),
      };

      const customers = await customerService.getCustomers(pagination);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/customers/:id",
  validate(idSchema, "params"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Get Customer Request");

    try {
      const { params } = req;

      const event = await customerService.getCustomer(params.id);

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/customers",
  validate(customerSchema, "body"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Add Customer Request");

    try {
      const { user, body } = req;

      console.log({ user });

      const customerData: CustomerData = {
        ...body,
        createdBy: user.credentialId,
      };

      const customer = await customerService.addCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/customers/:id",
  validate(idSchema, "params"),
  validate(customerSchema, "body"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Update Event Request");

    try {
      const { params, body } = req;

      const customerData: CustomerData = {
        ...body,
      };

      const event = await customerService.updateCustomer(
        params.id,
        customerData
      );

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/customers/:id",
  validate(idSchema, "params"),
  authenticate,
  authorization([Role.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Delete Customer");

    try {
      const { params } = req;

      const event = await customerService.deleteCustomer(params.id);

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
