import CustomerRepository from "../repositories/customer.repository";
import { CustomerData } from "../types/Customer";
import { Pagination } from "../types/pagination";

export default class CustomerService {
  private customerRepository: CustomerRepository;
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async getCustomers(pagination: Pagination) {
    return this.customerRepository.getCustomers(pagination);
  }

  async getCustomer(id: string) {
    return this.customerRepository.getCustomer(id);
  }

  async addCustomer(customerData: CustomerData) {
    return this.customerRepository.addCustomer(customerData);
  }

  async updateCustomer(id: string, customerData: CustomerData) {
    return this.customerRepository.updateCustomer(id, customerData);
  }

  async deleteCustomer(id: string) {
    return this.customerRepository.deleteCustomer(id);
  }
}
