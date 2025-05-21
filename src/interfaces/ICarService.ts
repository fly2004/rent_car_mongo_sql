// 📁 interfaces/ICarService.ts
import { Car } from "../models/Car";
import { CarDto } from "../dtos/CarDto";

export interface ICarService {
    addCar(dto: CarDto): Promise<Car>;
    getAllCars(): Promise<Car[]>;
    getAvailableCars(): Promise<Car[]>;
    getCarById(id: string): Promise<Car | undefined>;
    updateAvailability(id: string, available: boolean): Promise<boolean>;
    deleteCar(id: string): Promise<boolean>;

}
