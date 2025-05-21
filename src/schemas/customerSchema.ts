import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be valid",
    }),
    phone: Joi.string().trim().min(5).required().messages({
        "any.required": "Phone is required",
        "string.empty": "Phone cannot be empty",
    }),
});
