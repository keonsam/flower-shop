import CustomerRepository from "../repositories/customer.repository";
import FlowerRepository from "../repositories/flower.repository";
import OrderRepository from "../repositories/order.repository";
import { CustomerData } from "../types/Customer";
import { Flower } from "../types/Flower";
import { OrderData, OrderItemData, OrderStatus } from "../types/orders";
import { Pagination } from "../types/pagination";

export default class OrderService {
  currencyFormatter: Intl.NumberFormat;
  flowerRepository: FlowerRepository;
  orderRepository: OrderRepository;
  constructor() {
    this.currencyFormatter = new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 2,
    });
    this.flowerRepository = new FlowerRepository();
    this.orderRepository = new OrderRepository();
  }

  // async getCustomers(pagination: Pagination) {
  //   return this.customerRepository.getCustomers(pagination);
  // }

  // async getOrder(id: string) {
  //   return this.orderRepository.getOrder(id);
  // }

  async addOrder(
    orderData: Pick<OrderData, "customerId" | "createdBy">,
    items: OrderItemData[]
  ) {
    // get flowers and calculate price
    const flowerIds = items.map(({ flowerId }) => flowerId);
    const flowers = await this.flowerRepository.getFlowersByIds(flowerIds);
    const total = this.calculateOrderCost(items, flowers);

    const newOrder: OrderData = {
      ...orderData,
      total,
      status: OrderStatus.PENDING,
    };

    // save order
    const order = await this.orderRepository.addOrder(newOrder);

    // save order items
    const orderItem = await this.orderRepository.addOrderItems(items, order.id);

    order.items = orderItem;

    return order;
  }

  // async updateCustomer(id: string, customerData: CustomerData) {
  //   return this.customerRepository.updateCustomer(id, customerData);
  // }

  private calculateOrderCost(items: OrderItemData[], flowers: Flower[]) {
    let total = 0;
    items.forEach(({ flowerId, quantity }) => {
      const { price } = flowers.find((val) => val.id === flowerId) || {
        price: 0,
      };
      const itemCost = Number(this.currencyFormatter.format(price * quantity));
      total = Number(this.currencyFormatter.format(total + itemCost));
    });

    return total;
  }
}
