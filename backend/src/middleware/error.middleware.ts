import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";

export const errorHandler: (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => any = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
