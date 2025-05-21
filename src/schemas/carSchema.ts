// 📁 schemas/carSchema.ts
import Joi from "joi";
import { CarBrand } from "../models/enums/CarBrand";
import { CarModel } from "../models/enums/CarModel";

export const carSchema = Joi.object({
    model: Joi.string()
        .valid(...Object.values(CarModel))
        .required()
        .messages({
            "any.required": "Model is required",
            "any.only": "Model must be one of predefined car models",
        }),

    brand: Joi.string()
        .valid(...Object.values(CarBrand))
        .required()
        .messages({
            "any.required": "Brand is required",
            "any.only": "Brand must be one of predefined car brands",
        }),

    year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .required()
        .messages({
            "any.required": "Year is required",
            "number.min": "Year must be valid",
            "number.max": "Year must not be in the future",
        }),

    dailyPrice: Joi.number()
        .positive()
        .required()
        .messages({
            "any.required": "Price is required",
            "number.positive": "Price must be positive",
        }),
});
