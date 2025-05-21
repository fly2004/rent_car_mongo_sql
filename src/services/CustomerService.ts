// 📁 services/CustomerService.ts — асинхронный сервис для управления клиентами

import { Customer } from "../models/Customer";
import { CustomerDto } from "../dtos/CustomerDto";
import { v4 as uuidv4 } from "uuid";
import { FileStorage } from "../storage/FileStorage";
import {ICustomerService} from "../interfaces/ICustomerService";
import {IPersistable} from "../interfaces/IPersistable";

export class CustomerService implements ICustomerService, IPersistable{
    private customers: Customer[] = [];

    constructor(private storage: FileStorage<Customer>) {}

    async addCustomer(dto: CustomerDto): Promise<Customer> {
        const newCustomer: Customer = {
            id: uuidv4(),
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            rentalIds: []
        };
        this.customers.push(newCustomer);
        await this.save();
        return newCustomer;
    }

    async getAllCustomers(): Promise<Customer[]> {
        return this.customers;
    }

    async getCustomerById(id: string): Promise<Customer | undefined> {
        return this.customers.find(c => c.id === id);
    }

    async deleteCustomer(id: string): Promise<boolean> {
        const index = this.customers.findIndex(c => c.id === id);
        if (index === -1) return false;
        this.customers.splice(index, 1);
        await this.save();
        return true;
    }

    async load(): Promise<void> {
        try {
            this.customers = await this.storage.load();
        } catch (err) {
            console.error("❌ Failed to load customers:", err);
        }
    }

    async save(): Promise<void> {
        try {
            await this.storage.save(this.customers);
        } catch (err) {
            console.error("❌ Failed to save customers:", err);
        }
    }
    // 👇 можно добавить метод для добавления rentalId, если понадобится:
    async addRentalToCustomer(customerId: string, rentalId: string): Promise<void> {
        const customer = await this.getCustomerById(customerId);
        if (customer && !customer.rentalIds.includes(rentalId)) {
            customer.rentalIds.push(rentalId);
            await this.save();
        }
    }
}
