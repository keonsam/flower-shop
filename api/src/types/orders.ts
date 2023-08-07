import { BusinessEntity, BusinessEntityTable, CreateOmit } from "./common";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export type Order = BusinessEntity & {
  customerId: string;
  deliveryTime?: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
};

export type OrderTable = BusinessEntityTable & {
  customer_id: string;
  delivery_time: string;
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

export type AddOrderRequest = Omit<OrderData, "createdBy" | "total">;

export type OrderItemTable = {
  flower_id: string;
  order_id: string;
  quantity: number;
};
