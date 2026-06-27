import type { Request } from "express";

export type ApiRequest<
  Body = unknown,
  Params = Record<string, never>,
  Query = Record<string, never>,
> = Request<Params, unknown, Body, Query>;
