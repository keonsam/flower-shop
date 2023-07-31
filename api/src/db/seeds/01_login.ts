import { Knex } from "knex";
import { CREDENTIAL_TABLE_NAME, CUSTOMER_TABLE_NAME } from "../table_names";
import { Role } from "../../types/credential";
import CredentialService from "../../services/credential.service";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CUSTOMER_TABLE_NAME).del();
  await knex(CREDENTIAL_TABLE_NAME).del();

  const hashedPassword = await CredentialService.hashPassword("testing@123_");

  // Inserts initial user accounts
  await knex(CREDENTIAL_TABLE_NAME).insert([
    {
      username: "testadmin@gmail.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
    {
      username: "testuser@gmail.com",
      password: hashedPassword,
      role: Role.USER,
    },
  ]);
}
