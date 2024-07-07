import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/response-error";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else if (error.code == "P2003") {
    if (error.meta.field_name.includes("products")) {
      res.status(404).json({ message: "Product not found" });
    } else if (error.meta.field_name.includes("status")) {
      res.status(404).json({ message: "Status order not found" });
    } else {
      res.status(500).json({
        errors: "Internal Error",
      });
    }
  } else {
    console.log(error);
    res.status(500).json({
      errors: "Internal Error",
    });
  }
};
