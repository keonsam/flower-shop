export interface ApplicationError extends Error {
  name: string;
  status: number;
}
