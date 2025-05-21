// 📁 interfaces/ICustomerService.ts

import { Customer } from "../models/Customer";
import { CustomerDto } from "../dtos/CustomerDto";

export interface ICustomerService {
    addCustomer(dto: CustomerDto): Promise<Customer>;
    getAllCustomers(): Promise<Customer[]>;
    getCustomerById(id: string): Promise<Customer | undefined>;
    deleteCustomer(id: string): Promise<boolean>;

}
