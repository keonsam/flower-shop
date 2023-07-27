import { db } from "../db/dbConnection";
import { ORDER_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import {
  Order,
  OrderData,
  OrderItem,
  OrderItemData,
  OrderItemTable,
  OrderTable,
} from "../types/Orders";
import { Pagination } from "../types/pagination";

export default class OrderRepository {
  // async getOrder() {
  //   const [customer] = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
  //     .select("*")
  //     .where({
  //       id,
  //     })
  //     .limit(1);

  //   if (!customer) {
  //     throw new NotFoundError(`No customer found for id: ${id}`);
  //   }

  //   logger.info({ resultId: customer.id }, "Customer retrieved");

  //   return this.mapDbEvent(customer);
  // }

  async addOrder(orderData: OrderData) {
    const [order] = await db<OrderTable>(ORDER_TABLE_NAME)
      .insert({
        customer_id: orderData.customerId,
        total: orderData.total,
        status: orderData.status,
        created_by: orderData.createdBy,
      })
      .returning("*");

    logger.info({ id: order.id }, "Order created");

    return this.mapDbOrder(order);
  }

  private mapDbOrder(dbOder: OrderTable): Order {
    return {
      id: dbOder.id,
      customerId: dbOder.customer_id,
      deliveredAt: dbOder.delivered_at,
      estimateDelivery: dbOder.estimate_delivery,
      status: dbOder.status,
      total: dbOder.total,
      createdAt: dbOder.created_at,
      createdBy: dbOder.created_by,
      updatedAt: dbOder.updated_at,
    };
  }

  // Order Item

  async addOrderItems(orderData: OrderItemData[], orderId: string) {
    const data = orderData.map(({ flowerId, quantity }) => ({
      flower_id: flowerId,
      order_id: orderId,
      quantity,
    }));

    const orderItems = await db<OrderItemTable>(ORDER_TABLE_NAME)
      .insert(data)
      .returning("*");

    logger.info(
      { flowerId: orderItems[0].flower_id, orderId: orderItems[0].order_id },
      "Order Items created"
    );

    return orderItems.map(this.mapDbOrderItems);
  }

  private mapDbOrderItems(dbOderItem: OrderItemTable): OrderItem {
    return {
      flowerId: dbOderItem.flower_id,
      orderId: dbOderItem.order_id,
      quantity: dbOderItem.quantity,
    };
  }
}
