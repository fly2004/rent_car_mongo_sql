// 📁 config/appConfig.ts

import { CarService } from "../services/CarService";
import { CustomerService } from "../services/CustomerService";
import { RentalService } from "../services/RentalService";
import { FileStorage } from "../storage/FileStorage";
import path from "path";
import { IPersistable } from "../interfaces/IPersistable";

// Пути к файлам
const carPath = path.resolve("data", "cars.json");
const customerPath = path.resolve("data", "customers.json");
const rentalPath = path.resolve("data", "rentals.json");

// Сервисы с хранилищем
export const carService = new CarService(new FileStorage(carPath));
export const customerService = new CustomerService(new FileStorage(customerPath));
export const rentalService = new RentalService(
    carService,
    customerService,
    new FileStorage(rentalPath)
);

// // Загрузка данных при запуске
// export const loadAllData = async () => {
//     await Promise.all([
//         carService.load(),
//         customerService.load(),
//         rentalService.load()
//     ]);
// };
//
// // Сохранение данных при завершении работы
// export const saveAllData = async () => {
//     await Promise.all([
//         carService.save(),
//         customerService.save(),
//         rentalService.save()
//     ]);
// };
// Массив всех сервисов, поддерживающих сохранение и загрузку
const persistables: IPersistable[] = [carService, customerService, rentalService];

export const loadAllData = async () => {
    await Promise.all(persistables.map(service => service.load()));
};

export const saveAllData = async () => {
    await Promise.all(persistables.map(service => service.save()));
};