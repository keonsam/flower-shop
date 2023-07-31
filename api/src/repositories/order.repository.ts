import { db } from "../db/dbConnection";
import {
  CUSTOMER_TABLE_NAME,
  ORDER_ITEM_TABLE_NAME,
  ORDER_TABLE_NAME,
} from "../db/table_names";
import logger from "../middleware/logger";
import { NotFoundError } from "../types/ApplicationError";
import { Order, OrderData, OrderTable } from "../types/Orders";
import { Pagination } from "../types/pagination";
import CredentialRepository from "./credential.repository";
import CustomerRepository from "./customer.repository";

export default class OrderRepository {
  async getOrders(pagination: Pagination, customerId: string) {
    const { pageNumber, pageSize, sort } = pagination;

    // count number of rows
    const [countObj] = await db<OrderTable>(ORDER_TABLE_NAME).count("id");

    const total = Number(countObj.count || 0);

    // get records
    const orders = await db<OrderTable>(ORDER_TABLE_NAME)
      .select("*")
      .where((qb) => {
        if (customerId) {
          qb.where("customer_id", customerId)
        }
      })
      .limit(pagination.pageSize || total)
      .offset((pageNumber - 1) * pageSize || 0)
      .orderBy("created_at", sort);

    logger.info(
      { id: orders[0]?.id, pageNumber, pageSize, sort },
      "Orders retrieved"
    );

    return {
      items: orders.map(this.mapDbOrder),
      total,
    };
  }

  async getOrder(id: string) {
    const [order] = await db<OrderTable>(ORDER_TABLE_NAME)
      .select("*")
      .where({
        id,
      })
      .limit(1);

    if (!order) {
      throw new NotFoundError(`No customer found for id: ${id}`);
    }

    logger.info({ resultId: order.id }, "Customer retrieved");

    return this.mapDbOrder(order);
  }

  async addOrder(orderData: OrderData) {
    const [order] = await db<OrderTable>(ORDER_TABLE_NAME)
      .insert({
        customer_id: orderData.customerId,
        delivery_time: orderData.deliveryTime,
        total: orderData.total,
        status: orderData.status,
        created_by: orderData.createdBy,
      })
      .returning("*");

    logger.info({ id: order.id }, "Order created");

    return this.mapDbOrder(order);
  }

  async updateOrder(id: string, orderData: OrderData) {
    const [order] = await db<OrderTable>(ORDER_TABLE_NAME)
      .where({ id })
      .update({
        customer_id: orderData.customerId,
        delivery_time: orderData.deliveryTime,
        total: orderData.total,
        status: orderData.status,
      })
      .returning("*");

    if (!order) {
      throw new NotFoundError(`No order found for Id: ${id}`);
    }

    logger.info({ id: order.id }, "Order updated");

    return this.mapDbOrder(order);
  }
  

  private mapDbOrder(dbOrder: OrderTable): Order {
    return {
      id: dbOrder.id,
      customerName: dbOrder.customerName,
      items: [],
      customerId: dbOrder.customer_id,
      deliveryTime: dbOrder.delivery_time,
      status: dbOrder.status,
      total: dbOrder.total,
      createdAt: dbOrder.created_at,
      createdBy: dbOrder.created_by,
      updatedAt: dbOrder.updated_at,
    };
  }
}
