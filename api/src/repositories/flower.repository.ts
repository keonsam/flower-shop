import { db } from "../db/dbConnection";
import { FLOWER_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import { NotFoundError } from "../types/ApplicationError";
import { Flower, FlowerTable } from "../types/Flower";

export default class FlowerRepository {
  async getFlowers() {
    const flowers = await db<FlowerTable>(FLOWER_TABLE_NAME).select("*");

    logger.info({ resultId: flowers[0]?.id }, "Flowers retrieved");

    return flowers.map(this.mapDbEvent);
  }

  async getFlowersByIds(ids: string[]) {
    const flowers = await db<FlowerTable>(FLOWER_TABLE_NAME)
      .select("*")
      .whereIn("id", ids);

    if (!flowers || flowers.length == 0) {
      throw new NotFoundError(`No flowers for ids: ${ids}`);
    }

    logger.info({ resultId: flowers[0].id }, "Flowers retrieved");

    return flowers.map(this.mapDbEvent);
  }

  private mapDbEvent(dbFlower: FlowerTable): Flower {
    return {
      id: dbFlower.id,
      name: dbFlower.name,
      price: dbFlower.price,
      description: dbFlower.description,
      createdAt: dbFlower.created_at,
      updatedAt: dbFlower.updated_at,
    };
  }
}
