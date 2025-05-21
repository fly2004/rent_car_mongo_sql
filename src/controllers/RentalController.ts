// 📁 controllers/RentalController.ts
import { Request, Response } from "express";
import { RentalService } from "../services/RentalService";
import { RentalDto } from "../dtos/RentalDto";
import { AppError } from "../errors/AppError";

export class RentalController {
    constructor(private rentalService: RentalService) {}

    createRental = async (req: Request, res: Response): Promise<void> => {
        const dto: RentalDto = req.body;
        const rental = await this.rentalService.createRental(dto);
        if (!rental) {
            throw new AppError("Invalid rental request", 400);
        }
        res.status(201).json(rental);
    };

    getAllRentals = async (_: Request, res: Response): Promise<void> => {
        const rentals = await this.rentalService.getAllRentals();
        res.json(rentals);
    };

    cancelRental = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const success = await this.rentalService.cancelRental(id);
        if (!success) {
            throw new AppError("Rental not found or already cancelled", 404);
        }
        res.json({ message: "Rental cancelled successfully" });
    };
}
