import { db } from "../db/dbConnection";
import { CUSTOMER_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import { NotFoundError } from "../types/ApplicationError";
import { Customer, CustomerData, CustomerTable } from "../types/Customer";
import { Pagination } from "../types/pagination";

export default class CustomerRepository {
  static mapDbCustomer(dbCustomer: CustomerTable): Customer {
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

  async getCustomers(pagination: Pagination) {
    const { pageNumber, pageSize, sort, search } = pagination;

    // count number of rows
    const [countObj] = await db<CustomerTable>(CUSTOMER_TABLE_NAME).count("id");

    const total = Number(countObj.count || 0);

    // get records
    const customers = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .select("*")
      .where((qb) => {
        if (search) {
          const searchTerm = `%${search}%}`;
          qb.whereILike("name", searchTerm)
            .orWhereILike("email", searchTerm)
            .orWhereILike("phone_number", searchTerm)
            .orWhereILike("location", searchTerm);
        }
      })
      .limit(pagination.pageSize || total)
      .offset(pageNumber ?(pageNumber - 1) * pageSize: 0)
      .orderBy("created_at", sort);

    logger.info(
      { id: customers[0]?.id, pageNumber, pageSize, sort },
      "Customers retrieved"
    );

    return {
      items: customers.map(CustomerRepository.mapDbCustomer),
      total,
    };
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

    logger.info({ resultId: customer.id }, "Customer retrieved");

    return CustomerRepository.mapDbCustomer(customer);
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

    return CustomerRepository.mapDbCustomer(customer);
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

    return CustomerRepository.mapDbCustomer(customer);
  }

  async deleteCustomer(id: string) {
    const result = await db<CustomerTable>(CUSTOMER_TABLE_NAME)
      .where({
        id,
      })
      .del();

    logger.info({ result }, "Customer deleted");

    return result;
  }
}
