import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import * as profileService from "../services/profile.service.js";

export const getProfile = async (
  req: ApiRequest<{}, { userId: string }>,
  res: Response,
) => {
  const { userId } = req.params;

  const profile = await profileService.getProfile(userId);

  res.status(200).json({ success: true, profile });
};

export const searchProfile = async (
  req: ApiRequest<{}, { userId: string }, { query: string; limit: string }>,
  res: Response,
) => {
  const { limit } = req.query;
  const { query } = req.query;

  const limitNum = limit ? Number(limit) : undefined;

  const profiles = await profileService.searchProfile(
    query,
    isNaN(limitNum as any) ? undefined : limitNum,
  );

  res.status(200).json({ success: true, profiles });
};
