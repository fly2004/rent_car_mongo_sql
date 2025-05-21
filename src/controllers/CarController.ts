// 📁 controllers/CarController.ts
import { Request, Response } from "express";
import { CarService } from "../services/CarService";
import { CarDto } from "../dtos/CarDto";
import { AppError } from "../errors/AppError";
export class CarController {
    constructor(private carService: CarService) {}

    getAllCars = async (req: Request, res: Response) => {
        const cars = await this.carService.getAllCars();
        res.json(cars);
    };

    getCarById = async (req: Request, res: Response): Promise<void> => {
        const car = await this.carService.getCarById(req.params.id);

        if (!car) {
            throw new AppError("Car not found", 404);
        }
        res.json(car);
    };

    addCar = async (req: Request, res: Response) => {
        const dto: CarDto = req.body;
        const newCar = await this.carService.addCar(dto);
        res.status(201).json(newCar);
    };

    deleteCar = async (req: Request, res: Response): Promise<void> => {
        const deleted = await this.carService.deleteCar(req.params.id);
        if (!deleted) {
            throw new AppError("Car not found", 404);
        }
        res.sendStatus(204);
    };

    updateAvailability = async (req: Request, res: Response): Promise<void> => {
        const updated = await this.carService.updateAvailability(req.params.id, req.body.available);
        if (!updated) {
            throw new AppError("Car not found or invalid update", 404);

        }
        res.sendStatus(200);
    };
}
