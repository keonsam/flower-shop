import { Base, BaseTable, CreateOmit } from "./common";

export type Business = Base & {
  name: string;
  location: string;
};


export type CreateBusiness = Omit<Business, CreateOmit>;


// table

export type BusinessTable = BaseTable & {
  name: string;
  location: string;
};
