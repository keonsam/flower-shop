export type Sort = "asc" | "desc";

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
};
