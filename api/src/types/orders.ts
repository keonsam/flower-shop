import { BusinessEntity, BusinessEntityTable, CreateOmit } from "./common";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export type Order = BusinessEntity & {
  customerId: string;
  estimateDelivery?: string;
  deliveredAt?: string;
  total: number;
  status: OrderStatus;
  items?: OrderItem[];
};

export type OrderTable = BusinessEntityTable & {
  customer_id: string;
  estimate_delivery: string;
  delivered_at: string;
  total: number;
  status: OrderStatus;
};

export type OrderItem = {
  orderId: string;
  flowerId: string;
  quantity: number;
};

export type OrderItemData = {
  flowerId: string;
  quantity: number;
};

export type OrderData = Omit<Order, CreateOmit>;

export type AddOrderRequest = {
  customerId: string;
  items: OrderItemData[];
};

export type OrderItemTable = {
  flower_id: string;
  order_id: string;
  quantity: number;
};
