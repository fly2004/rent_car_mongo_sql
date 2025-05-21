// 📁 services/RentalService.ts — асинхронный сервис для управления арендой автомобилей

import { Rental } from "../models/Rental";
import { RentalDto } from "../dtos/RentalDto";
import { v4 as uuidv4 } from "uuid";
import { CarService } from "./CarService";
import { CustomerService } from "./CustomerService";
import { FileStorage } from "../storage/FileStorage";
import {IRentalService} from "../interfaces/IRentalService";
import {IPersistable} from "../interfaces/IPersistable";

export class RentalService implements IRentalService, IPersistable{
    private rentals: Rental[] = [];

    constructor(
        private carService: CarService,
        private customerService: CustomerService,
        private storage: FileStorage<Rental>
    ) {}

    async createRental(dto: RentalDto): Promise<Rental | null> {
        const car = await this.carService.getCarById(dto.carId);
        const customer = await this.customerService.getCustomerById(dto.customerId);
        // 🔎 Вставь это для отладки
        console.log("🔧 Проверка данных для аренды:");
        console.log("🚗 Найденная машина:", car);
        console.log("👤 Найденный клиент:", customer);
        console.log("✅ Машина доступна:", car?.available);
        if (!car || !car.available || !customer) return null;

        const days =
            (new Date(dto.endDate).getTime() - new Date(dto.startDate).getTime()) /
            (1000 * 60 * 60 * 24);

        const rental: Rental = {
            id: uuidv4(),
            carId: dto.carId,
            customerId: dto.customerId,
            startDate: dto.startDate,
            endDate: dto.endDate,
            totalCost: Math.round(days * car.dailyPrice),
            status: "active",
        };

        this.rentals.push(rental);
        await this.carService.updateAvailability(dto.carId, false);

        // ⬇️ Добавляем аренду в списки у машины и клиента
        await this.carService.addRentalToCar(dto.carId, rental.id);
        await this.customerService.addRentalToCustomer(dto.customerId, rental.id);

        await this.save();
        return rental;
    }

    async getAllRentals(): Promise<Rental[]> {
        return this.rentals;
    }

    async getRentalById(id: string): Promise<Rental | undefined> {
        return this.rentals.find(r => r.id === id);
    }

    async cancelRental(id: string): Promise<boolean> {
        const rental = await this.getRentalById(id);
        if (!rental || rental.status === "cancelled") return false;

        rental.status = "cancelled";
        await this.carService.updateAvailability(rental.carId, true);
        await this.save();
        return true;
    }

    async load(): Promise<void> {
        try {
            this.rentals = await this.storage.load();
        } catch (err) {
            console.error("❌ Failed to load rentals:", err);
        }
    }

    async save(): Promise<void> {
        try {
            await this.storage.save(this.rentals);
        } catch (err) {
            console.error("❌ Failed to save rentals:", err);
        }
    }
}
