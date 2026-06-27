import { z } from "zod";

export const sessionIdParamSchema = z.object({
  params: z.object({
    sessionId: z.uuid(),
  }),
});
