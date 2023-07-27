import { Knex } from "knex";
import { CREDENTIAL_TABLE_NAME, CUSTOMER_TABLE_NAME } from "../table_names";

export async function up(knex: Knex): Promise<void> {
  // Customers Table
  await knex.schema.createTable(CUSTOMER_TABLE_NAME, (table) => {
    table
      .uuid("id")
      .notNullable()
      .defaultTo(knex.raw("public.gen_random_uuid()"))
      .primary();
    table.string("name").notNullable();
    table.string("email");
    table.string("phone_number");
    table.string("location").notNullable();
    table
      .uuid("created_by")
      .notNullable()
      .references("id")
      .inTable(CREDENTIAL_TABLE_NAME);
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("(now() at time zone 'utc')"));
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop table: credential
  await knex.schema.dropTableIfExists(CUSTOMER_TABLE_NAME);
}
