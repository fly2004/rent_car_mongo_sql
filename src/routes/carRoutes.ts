// 📁 routes/carRoutes.ts
import { Router } from "express";
import { param } from "express-validator";
import { CarController } from "../controllers/CarController";
import { carService } from "../config/appConfig";
import { validateRequest } from "../middlewares/validateRequest";
import { asyncHandler } from "../middlewares/asyncHandler";
import { carSchema } from "../schemas/carSchema";
import { validateWithSchema } from "../middlewares/validateWithSchema";

export const router = Router();
const controller = new CarController(carService);

// Получить все машины
router.get("/", asyncHandler(controller.getAllCars));

// Получить машину по ID
router.get(
    "/:id",
    [param("id").isUUID().withMessage("Invalid car ID")],
    validateRequest,
    asyncHandler(controller.getCarById)
);

// Добавить новую машину
router.post(
    "/",
    validateWithSchema(carSchema),
    asyncHandler(controller.addCar)
);

// Удалить машину по ID
router.delete(
    "/:id",
    [param("id").isUUID().withMessage("Invalid car ID")],
    validateRequest,
    asyncHandler(controller.deleteCar)
);

// Обновить доступность машины
router.patch(
    "/:id/availability",
    [
        param("id").isUUID().withMessage("Invalid car ID"),
        // Можно оставить `express-validator` только для одного поля или заменить на Joi-схему
    ],
    validateRequest,
    asyncHandler(controller.updateAvailability)
);

export const carRoutes = router;
