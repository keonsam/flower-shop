import { db } from "../db/dbConnection";
import { CUSTOMER_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import { NotFoundError } from "../types/ApplicationError";
import { Customer, CustomerData, CustomerTable } from "../types/Customer";
import { Pagination } from "../types/pagination";

export default class CustomerRepository {
  async getCustomers(pagination: Pagination) {
    const { pageNumber, pageSize, sort } = pagination;
    const customers = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .select("*")
      .where({
      })
      .limit(pagination.pageSize)
      .offset((pageNumber - 1) * pageSize)
      .orderBy("created_at", sort);

    logger.info(
      { id: customers[0]?.id, pageNumber, pageSize, sort },
      "Customers retrieved"
    );

    return customers.map(this.mapDbEvent);
  }

  async getCustomer(id: string) {
    const [customer] = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .select("*")
      .where({
        id,
      })
      .limit(1);

    if (!customer) {
      throw new NotFoundError(`No customer found for id: ${id}`);
    }

    logger.info(
      { resultId: customer.id },
      "Customer retrieved"
    );

    return this.mapDbEvent(customer);
  }

  async addCustomer(customerData: CustomerData) {
    const [customer] = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .insert({
        name: customerData.name,
        location: customerData.location,
        email: customerData.email,
        phone_number: customerData.phoneNumber,
        created_by: customerData.createdBy,
      })
      .returning("*");

    logger.info({ id: customer.id }, "Customer created");

    return this.mapDbEvent(customer);
  }

  async updateCustomer(id: string, customerData: CustomerData) {
    const [customer] = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .where({ id })
      .update({
        name: customerData.name,
        location: customerData.location,
        email: customerData.email,
        phone_number: customerData.phoneNumber,
      })
      .returning("*");

    if (!customer) {
      throw new NotFoundError(`No customer found for Id: ${id}`);
    }

    logger.info({ id: customer.id }, "Customer updated");

    return this.mapDbEvent(customer);
  }

  async deleteCustomer(id: string) {
    const result = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .where({
        id,
      })
      .del();

    logger.info({ result, }, "Customer deleted");

    return result;
  }

  private mapDbEvent(dbCustomer: CustomerTable): Customer {
    return {
      id: dbCustomer.id,
      email: dbCustomer.email,
      name: dbCustomer.name,
      location: dbCustomer.location,
      phoneNumber: dbCustomer.phone_number,
      createdBy: dbCustomer.created_by,
      createdAt: dbCustomer.created_at,
      updatedAt: dbCustomer.updated_at,
    };
  }
}
