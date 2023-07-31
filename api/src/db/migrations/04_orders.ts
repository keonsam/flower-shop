import { Knex } from "knex";
import {
  CREDENTIAL_TABLE_NAME,
  CUSTOMER_TABLE_NAME,
  FLOWER_TABLE_NAME,
  ORDER_ITEM_TABLE_NAME,
  ORDER_TABLE_NAME,
} from "../table_names";

export async function up(knex: Knex): Promise<void> {
  // Order Table
  await knex.schema.createTable(ORDER_TABLE_NAME, (table) => {
    table
      .uuid("id")
      .notNullable()
      .defaultTo(knex.raw("public.gen_random_uuid()"))
      .primary();
    table
      .uuid("customer_id")
      .notNullable()
      .references("id")
      .inTable(CUSTOMER_TABLE_NAME);
    table.decimal("total").notNullable();
    table
      .enum("status", ["pending", "shipped", "delivered", "canceled"])
      .notNullable();
    table.timestamp("delivery_time", { useTz: true }).notNullable();
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

  // Order Item Table
  await knex.schema.createTable(ORDER_ITEM_TABLE_NAME, (table) => {
    table
      .uuid("flower_id")
      .notNullable()
      .references("id")
      .inTable(FLOWER_TABLE_NAME);
    table
      .uuid("order_id")
      .notNullable()
      .references("id")
      .inTable(ORDER_TABLE_NAME);
    table.integer("quantity").notNullable();
    table.primary(["order_id", "flower_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop table: order item
  await knex.schema.dropTableIfExists(ORDER_ITEM_TABLE_NAME);

  // Drop table: order
  await knex.schema.dropTableIfExists(ORDER_TABLE_NAME);
}
