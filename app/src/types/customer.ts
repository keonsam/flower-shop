import { BusinessEntity, List } from "./common";

export type Customer = BusinessEntity & {
  name: string;
  email?: string;
  phoneNumber?: string;
  location: string;
};

export type Customers = List<Customer>;

export type CustomerData = Pick<
  Customer,
  "name" | "email" | "phoneNumber" | "location"
>;
