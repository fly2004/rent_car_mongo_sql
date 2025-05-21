import { Router } from "express";
// import { body, param } from "express-validator";
import { CustomerController } from "../controllers/CustomerController";
import { customerService } from "../config/appConfig";
// import { validateRequest } from "../middlewares/validateRequest";
// import { asyncHandler } from "../middlewares/asyncHandler"; // ⬅️ обязательно импортируем
import { validateWithSchema } from "../middlewares/validateWithSchema";
import { customerSchema } from "../schemas/customerSchema";

export const router = Router();
const controller = new CustomerController(customerService);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.post(
    "/",
    validateWithSchema(customerSchema),
    controller.create
);

router.delete("/:id", controller.delete);

export const customerRoutes = router;