import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type ParsedRequest = {
  body?: unknown;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
};

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((err) => ({
          field: err.path[1],
          message: err.message,
          code: err.code,
        })),
      });
      return;
    }

    const parsed = result.data as ParsedRequest;
    req.body = parsed.body;
    req.params = parsed.params as typeof req.params;

    next();
  };
}
