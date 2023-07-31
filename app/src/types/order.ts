import { BusinessEntity, List } from "./common";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export type Order = BusinessEntity & {
  customerId: string;
  customerName: string;
  deliveryTime: string;
  total: number;
  status: OrderStatus;
  items?: OrderItem[];
};

export type Orders = List<Order>;

export type OrderItem = {
  orderId?: string;
  name?: string;
  price?: number;
  flowerId: string;
  quantity: number;
};

export type OrderItemData = OrderItem;

export type OrderData = Pick<
  Order,
  "customerId" | "deliveryTime" | "status" | "total"
> & {
  items: OrderItemData[];
};
