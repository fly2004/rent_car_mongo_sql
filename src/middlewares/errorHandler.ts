import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || "Something went wrong";

    res.status(status).json({
        status: "error",
        message,
    });
};
