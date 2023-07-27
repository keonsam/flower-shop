import { Knex } from "knex";
import { CREDENTIAL_TABLE_NAME, CUSTOMER_TABLE_NAME } from "../table_names";
import { Role } from "../../types/credential";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CUSTOMER_TABLE_NAME).del();
  await knex(CREDENTIAL_TABLE_NAME).del();

  // Inserts initial user accounts
  await knex(CREDENTIAL_TABLE_NAME).insert([
    {
      username: "testadmin@gmail.com",
      password: "testing@123_",
      role: Role.ADMIN,
    },
    {
      username: "testuser@gmail.com",
      password: "testing@123_",
      role: Role.USER,
    },
  ]);
}
