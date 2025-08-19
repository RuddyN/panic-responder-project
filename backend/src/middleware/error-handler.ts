import { NextFunction, Request, Response } from "express";
import CustomError from "./custom-error";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "Error occurred";
};

export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(error) || "An error occurred. Please review the logs",
    },
  });
}
