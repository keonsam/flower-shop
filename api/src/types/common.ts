export type Base = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type BusinessEntity = Base & {
    createdBy: string;

};

export type CreateOmit = "id" | "createdAt" | "updatedAt";

// Tables

export type BaseTable = {
  id: string;
  created_at: string;
  updated_at: string;
};


export type BusinessEntityTable =  BaseTable & {
  created_by: string;
};
