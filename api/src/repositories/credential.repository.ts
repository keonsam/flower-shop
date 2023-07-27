import { db } from "../db/dbConnection";
import { CREDENTIAL_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import {
  CredentialTable,
  CreateCredential,
  Credential,
} from "../types/credential";

export default class CredentialRepository {
  async getCredentialByUsername(username: string) {
    const [credential] = await db<CredentialTable>(CREDENTIAL_TABLE_NAME)
      .select("*")
      .where({
        username,
      });

    if (!credential) {
      logger.warn(`No username found for: ${username}`);
      return undefined;
    }

    logger.info(
      {
        id: credential.id,
        username: credential.username,
        queryUsername: username,
      },
      "Credential repository getCredentialByUsername"
    );

    return this.mapDbCredential(credential);
  }

  async createCredential({
    username,
    password,
  }: CreateCredential) {
    const [credential] = await db<CredentialTable>(CREDENTIAL_TABLE_NAME)
      .insert({
        username,
        password,
      })
      .returning("*");

    logger.info({ id: credential.id }, "Credential successfully created");

    return this.mapDbCredential(credential);
  }

  private mapDbCredential = (dbCredential: CredentialTable): Credential => {
    return {
      id: dbCredential.id,
      username: dbCredential.username,
      password: dbCredential.password,
      role: dbCredential.role,
      createdAt: dbCredential.created_at,
      updatedAt: dbCredential.updated_at,
    };
  };
}
