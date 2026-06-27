import type { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
}
