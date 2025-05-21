import {CarModel} from "./enums/CarModel";
import {CarBrand} from "./enums/CarBrand";

export interface Car {
    id: string;
    model: CarModel;
    brand: CarBrand;
    year: number;
    dailyPrice: number;
    available: boolean;
    rentalIds: string[];
}
