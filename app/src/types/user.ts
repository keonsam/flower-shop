export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type User = {
  role: Role;
  credentialId: string;
};
