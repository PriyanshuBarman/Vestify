import type { ApiRequest } from "@/shared/types/types.js";
import type { Response } from "express";
import * as communityService from "../services/community.service.js";

export const getUsers = async (
  req: ApiRequest<
    {},
    {},
    {
      offset: string;
      limit: string;
      sortBy: "createdAt" | "updatedAt" | "name";
    }
  >,
  res: Response,
) => {
  const { offset = 0, limit = 20, sortBy = "updatedAt" } = req.query;
  const { users, totalCount } = await communityService.getUsers({
    skip: Number(offset),
    take: Number(limit),
    sortBy,
  });
  res.status(200).json({ success: true, users, totalCount });
};

export const searchUsers = async (
  req: ApiRequest<{}, {}, { query: string; limit: string }>,
  res: Response,
) => {
  const { query, limit = 10 } = req.query;
  const users = await communityService.searchUsers({
    query,
    limit: Number(limit),
  });
  res.status(200).json({ success: true, users });
};

export const getUserProfile = async (
  req: ApiRequest<{}, { username: string }>,
  res: Response,
) => {
  const { username } = req.params;
  const profile = await communityService.getUserProfile(username);
  res.status(200).json({ success: true, profile });
};
