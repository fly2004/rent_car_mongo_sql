// 📁 interfaces/IRentalService.ts

import { Rental } from "../models/Rental";
import { RentalDto } from "../dtos/RentalDto";

export interface IRentalService {
    createRental(dto: RentalDto): Promise<Rental | null>;
    getAllRentals(): Promise<Rental[]>;
    getRentalById(id: string): Promise<Rental | undefined>;
    cancelRental(id: string): Promise<boolean>;

}
