import { Base, BaseTable } from "./common";

export type Flower = Base & {
  name: string;
  price: number;
  description: string;
};

export type FlowerTable = BaseTable & Flower;
