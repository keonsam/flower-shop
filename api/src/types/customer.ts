import { BusinessEntity, BusinessEntityTable, CreateOmit } from "./common";

export type Customer = BusinessEntity & {
  name: string;
  location: string;
  email?: string;
  phoneNumber?: string;
};

export type CustomerData = Omit<Customer, CreateOmit>

// table

export type CustomerTable = BusinessEntityTable & {
  name: string;
  location: string;
  email?: string;
  phone_number?: string;
  created_by: string;
};


