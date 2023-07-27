import knex, { Knex } from "knex";
import path from "path";
import logger from "../middleware/logger";
import config from "../config";

export const db: Knex = knex({
  client: "pg",
  connection: config.db.connectionString,
  migrations: {
    directory: path.resolve(__dirname, "./migrations"),
  },
  seeds: {
    directory: "./seeds",
  },
});

export async function initDb(): Promise<void> {
  logger.info("Initializing database");

  logger.info("Rolling back database");
  await db.migrate.rollback();

  logger.info("Running database migrations");
  await db.migrate.latest();
}
