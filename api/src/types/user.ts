import { BusinessEntity, BusinessEntityTable, CreateOmit } from "./common";

export type User = BusinessEntity & {
  businessId: string;
  firstName: string;
  lastName: string;
};

export type CreateUser = Omit<User, CreateOmit>;

export type UserTable =  BusinessEntityTable & {
  first_name: string;
  last_name: string;
};