export type Base = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type BusinessEntity = Base & {
  createdBy: string;
};

export type List<T> = {
  items: T[];
  total: number;
};
