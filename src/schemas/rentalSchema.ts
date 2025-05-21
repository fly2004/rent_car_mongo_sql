// 📁 schemas/rentalSchema.ts
import Joi from "joi";

export const rentalSchema = Joi.object({
    carId: Joi.string().uuid().required().messages({
        "any.required": "carId is required",
        "string.uuid": "carId must be a valid UUID",
    }),
    customerId: Joi.string().uuid().required().messages({
        "any.required": "customerId is required",
        "string.uuid": "customerId must be a valid UUID",
    }),
    startDate: Joi.string().isoDate().required().messages({
        "any.required": "startDate is required",
        "string.isoDate": "startDate must be a valid ISO date",
    }),
    endDate: Joi.string().isoDate().required().messages({
        "any.required": "endDate is required",
        "string.isoDate": "endDate must be a valid ISO date",
    }),
});
