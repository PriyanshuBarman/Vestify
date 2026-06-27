import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = error.statusCode || 500;
  return res
    .status(statusCode)
    .json({ success: false, message: error.message });
}
