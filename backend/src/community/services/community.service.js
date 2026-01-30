import db from "#config/db.config.js";
import { ApiError } from "#shared/utils/api-error.utils.js";
import * as portfolioService from "../../mutual-fund/services/portfolio.service.js";
import { formatData } from "../utils/format.utils.js";

export const getUserCount = async () => {
  const count = await db.user.count({
    where: {
      id: { not: "system" },
    },
  });
  return count;
};

export const getUsers = async ({ skip = 0, take = 20 }) => {
  const totalCount = await getUserCount();

  // 1. Fetch paginated users with only required fields
  const users = await db.user.findMany({
    where: {
      id: { not: "system" },
    },
    skip,
    take,
    select: {
      id: true,
      profile: {
        select: {
          name: true,
          username: true,
          avatar: true,
        },
      },
      sessions: {
        select: {
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
      mfPortfolio: {
        select: {
          invested: true,
          current: true,
        },
      },
      _count: {
        select: {
          mfSips: true,
        },
      },
    },
    orderBy: [{ mfPortfolio: { _count: "desc" } }, { id: "asc" }],
  });

  if (!users.length) {
    return { users: [], totalCount };
  }

  // 3. Merge user and portfolio data
  const mergedUsers = users.map(formatData);

  // 4. Sort users by total invested amount
  mergedUsers.sort((a, b) => b.portfolio.invested - a.portfolio.invested);

  return {
    users: mergedUsers,
    totalCount,
  };
};

export const searchUsers = async ({ query, limit = 10 }) => {
  const users = await db.user.findMany({
    where: {
      id: { not: "system" },
      profile: {
        OR: [{ name: { contains: query } }, { username: { contains: query } }],
      },
    },
    take: limit,
    select: {
      id: true,
      profile: {
        select: {
          name: true,
          username: true,
          avatar: true,
        },
      },
      sessions: {
        select: {
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
      mfPortfolio: {
        select: {
          invested: true,
          current: true,
        },
      },
      _count: {
        select: {
          mfSips: true,
          mfPortfolio: true,
        },
      },
    },
  });

  const result = users.map(formatData);

  return result;
};

export const getUserProfile = async (username) => {
  const user = await db.user.findFirst({
    where: { profile: { username }, id: { not: "system" } },
    select: {
      id: true,
      profile: {
        select: {
          name: true,
          username: true,
          avatar: true,
        },
      },
      sessions: {
        select: {
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (!user) throw new ApiError(404, "User not found");

  return {
    userId: user.id,
    name: user.profile?.name,
    username: user.profile?.username,
    avatar: user.profile?.avatar,
    lastActiveAt: user.sessions[0]?.updatedAt || user.updatedAt,
    createdAt: user.createdAt,
  };
};

export const getUserIdByUsername = async (username) => {
  const profile = await db.profile.findUnique({
    where: { username },
    select: { userId: true },
  });
  if (!profile || profile.userId === "system")
    throw new ApiError(404, "User not found");
  return profile.userId;
};
