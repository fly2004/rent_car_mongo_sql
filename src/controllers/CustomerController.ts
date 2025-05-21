// 📁 controllers/CustomerController.ts
import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";
import { CustomerDto } from "../dtos/CustomerDto";
import { AppError } from "../errors/AppError";

export class CustomerController {
    constructor(private customerService: CustomerService) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        const customers = await this.customerService.getAllCustomers();
        res.json(customers);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const customer = await this.customerService.getCustomerById(req.params.id);
        if (!customer) {
            throw new AppError("Customer not found", 404);
        }
        res.json(customer);
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const dto: CustomerDto = req.body;
        const customer = await this.customerService.addCustomer(dto);
        res.status(201).json(customer);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const success = await this.customerService.deleteCustomer(req.params.id);
        if (!success) {
            throw new AppError("Customer not found", 404);
        }
        res.sendStatus(204);
    };
}
