// 📁 CarService.ts — асинхронный сервис для управления машинами

import { Car } from "../models/Car";
import { CarDto } from "../dtos/CarDto";
import { v4 as uuidv4 } from "uuid";

import { FileStorage } from "../storage/FileStorage";
import {ICarService} from "../interfaces/ICarService";
import {IPersistable} from "../interfaces/IPersistable";
import {CarModel} from "../models/enums/CarModel";
import {CarBrand} from "../models/enums/CarBrand";



export class CarService implements ICarService, IPersistable{
    private cars: Car[] = [];

    constructor(private storage: FileStorage<Car>) {}

    async addCar(dto: CarDto): Promise<Car> {
        const newCar: Car = {
            id: uuidv4(),
            model: dto.model as CarModel,
            brand: dto.brand as CarBrand,
            year: dto.year,
            dailyPrice: dto.dailyPrice,
            available: true,
            rentalIds: []
        };
        this.cars.push(newCar);
        await this.save();
        return newCar;
    }

    async getAllCars(): Promise<Car[]> {
        return this.cars;
    }

    async getAvailableCars(): Promise<Car[]> {
        return this.cars.filter(car => car.available);
    }

    async getCarById(id: string): Promise<Car | undefined> {
        return this.cars.find(car => car.id === id);
    }

    async updateAvailability(id: string, available: boolean): Promise<boolean> {
        const car = await this.getCarById(id);
        if (!car) return false;
        car.available = available;
        await this.save();
        return true;
    }

    async deleteCar(id: string): Promise<boolean> {
        const index = this.cars.findIndex(car => car.id === id);
        if (index === -1) return false;
        this.cars.splice(index, 1);
        await this.save();
        return true;
    }

    async save(): Promise<void> {
        await this.storage.save(this.cars);
    }

    async load(): Promise<void> {
        this.cars = await this.storage.load();
    }
    async addRentalToCar(carId: string, rentalId: string): Promise<boolean> {
        const car = await this.getCarById(carId);
        if (!car) return false;

        if (!car.rentalIds.includes(rentalId)) {
            car.rentalIds.push(rentalId);
            await this.save();
        }

        return true;
    }

}
