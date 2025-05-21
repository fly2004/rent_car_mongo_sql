// 📁 routes/rentalRoutes.ts
import { Router } from "express";
import { param } from "express-validator";
import { RentalController } from "../controllers/RentalController";
import { rentalService } from "../config/appConfig";
import { validateRequest } from "../middlewares/validateRequest";
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateWithSchema } from "../middlewares/validateWithSchema";
import { rentalSchema } from "../schemas/rentalSchema";

export const router = Router();
const controller = new RentalController(rentalService);

// Создать аренду с Joi-схемой
router.post(
    "/",
    validateWithSchema(rentalSchema),
    asyncHandler(controller.createRental)
);

// Получить все аренды
router.get("/", asyncHandler(controller.getAllRentals));

// Отменить аренду
router.patch(
    "/:id/cancel",
    [param("id").isUUID().withMessage("Invalid rental ID")],
    validateRequest,
    asyncHandler(controller.cancelRental)
);

export const rentalRoutes = router;
