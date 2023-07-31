import { db } from "../db/dbConnection";
import { ORDER_ITEM_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import { OrderItem, OrderItemData, OrderItemTable } from "../types/Orders";

export default class OrderItemRepository {
  async getOrderItemsByOrderId(id: string) {
    // get records
    const orderItems = await db<OrderItemTable>(ORDER_ITEM_TABLE_NAME)
      .select("*")
      .where({ order_id: id });

    logger.info(
      { orderId: orderItems[0]?.order_id, id },
      "Orders Items retrieved"
    );

    return orderItems.map(this.mapDbOrderItems);
  }

  // Order Item

  async addOrderItems(orderData: OrderItemData[], orderId: string) {
    const data = orderData.map(({ flowerId, quantity }) => ({
      flower_id: flowerId,
      order_id: orderId,
      quantity,
    }));

    const orderItems = await db<OrderItemTable>(ORDER_ITEM_TABLE_NAME)
      .insert(data)
      .returning("*");

    logger.info(
      { flowerId: orderItems[0].flower_id, orderId: orderItems[0].order_id },
      "Order Items created"
    );

    return orderItems.map(this.mapDbOrderItems);
  }

  async deleteOrderItemsByOrderId(orderId: string) {
    const result = await db<OrderItemTable>(ORDER_ITEM_TABLE_NAME)
      .where({
        order_id: orderId,
      })
      .del();

    logger.info({ result }, "Order Items deleted");

    return result;
  }

  private mapDbOrderItems(dbOderItem: OrderItemTable): OrderItem {
    return {
      flowerId: dbOderItem.flower_id,
      orderId: dbOderItem.order_id,
      quantity: dbOderItem.quantity,
    };
  }
}
