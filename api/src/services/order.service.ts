import FlowerRepository from "../repositories/flower.repository";
import OrderRepository from "../repositories/order.repository";
import OrderItemRepository from "../repositories/orderItem.repository";
import { ConflictError } from "../types/ApplicationError";
import { OrderData, OrderItemData, OrderStatus } from "../types/orders";
import { Pagination } from "../types/pagination";

export default class OrderService {
  flowerRepository: FlowerRepository;
  orderRepository: OrderRepository;
  orderItemRepository: OrderItemRepository;
  constructor() {
    this.flowerRepository = new FlowerRepository();
    this.orderRepository = new OrderRepository();
    this.orderItemRepository = new OrderItemRepository();
  }

  async getOrders(pagination: Pagination, customerId: string) {
    const orders = await this.orderRepository.getOrders(pagination, customerId);

    for (const order of orders.items) {
      order.items = await this.orderItemRepository.getOrderItemsByOrderId(
        order.id
      );
    };

    return orders;
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.getOrder(id);
    order.items = await this.orderItemRepository.getOrderItemsByOrderId(
      order.id
    );
    return order;
  }

  async addOrder(orderData: Omit<OrderData, "total">) {
    const { items } = orderData;

    // calc total cost of order
    const total = await this.calculateOrderCost(items);

    // save order
    const order = await this.orderRepository.addOrder({
      ...orderData,
      total,
    });

    // save order items
    order.items = await this.orderItemRepository.addOrderItems(items, order.id);

    return order;
  }

  async updateOrder(id: string, orderData: Omit<OrderData, "total">) {
    const { items } = orderData;
    // refuse request if order has been fulfilled or canceled.
    const { status } = await this.getOrder(id);
    if (status === OrderStatus.DELIVERED || status === OrderStatus.CANCELED) {
      throw new ConflictError(
        `You are not allowed to update order once status has been: ${status}`
      );
    }

    // calc total cost of order
    const total = await this.calculateOrderCost(orderData.items);

    const order = await this.orderRepository.updateOrder(id, {
      ...orderData,
      total,
    });

    await this.orderItemRepository.deleteOrderItemsByOrderId(order.id);

    order.items = await this.orderItemRepository.addOrderItems(items, order.id);

    return order;
  }

  async deleteOrder(id: string) {
    return this.orderRepository.deleteOrder(id);
  }

  private async calculateOrderCost(items: OrderItemData[]) {
    const flowers = await this.flowerRepository.getFlowersByIds(
      items.map(({ flowerId }) => flowerId)
    );

    let total = 0;
    items.forEach(({ flowerId, quantity }) => {
      const { price } = flowers.find((val) => val.id === flowerId) || {
        price: 0,
      };
      const itemCost = Math.floor(price * quantity * 100) / 100;
      total = Math.floor((total + itemCost) * 100) / 100;
    });

    return total;
  }
}
