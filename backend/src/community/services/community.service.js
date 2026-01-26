import db from "#config/db.config.js";
import { ApiError } from "#shared/utils/api-error.utils.js";
import * as portfolioService from "../../mutual-fund/services/portfolio.service.js";

/**
 * Get list of all users sorted by total invested amount
 */
/**
 * Get list of all users sorted by total invested amount
 */
export const getUsers = async ({ skip = 0, take = 20 } = {}) => {
  // 1. Fetch all users with profiles and counts
  const users = await db.user.findMany({
    where: {
      id: { not: "system" },
    },
    include: {
      profile: true,
      sessions: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
      _count: {
        select: {
          mfSips: true,
          mfPortfolio: true,
        },
      },
    },
  });

  if (!users.length) return { users: [], totalCount: 0 };

  // 2. Fetch portfolio sums for these users
  const portfolioAggregates = await db.mfPortfolio.groupBy({
    by: ["userId"],
    _sum: {
      invested: true,
      current: true,
    },
    where: {
      userId: { in: users.map((u) => u.id) },
    },
  });

  // 3. Map and merge
  const result = users.map((user) => {
    const aggregate = portfolioAggregates.find((agg) => agg.userId === user.id);
    const totalInvested = aggregate?._sum?.invested || 0;
    const currentValue = aggregate?._sum?.current || 0;

    return {
      name: user.profile?.name || "Unknown User",
      username: user.profile?.username || "user",
      avatar: user.profile?.avatar,
      totalInvested,
      currentValue,
      activeSipCount: user._count.mfSips,
      portfolioCount: user._count.mfPortfolio,
      lastActiveAt: user.sessions[0]?.updatedAt || user.updatedAt,
      createdAt: user.createdAt,
    };
  });

  // 4. Sort by total invested descending
  result.sort((a, b) => Number(b.totalInvested) - Number(a.totalInvested));

  const totalCount = result.length;
  const paginatedUsers = result.slice(skip, skip + take);

  return { users: paginatedUsers, totalCount };
};

export const searchUsers = async ({ query, limit = 10 }) => {
  if (!query) return [];

  const users = await db.user.findMany({
    where: {
      id: { not: "system" },
      profile: {
        OR: [{ name: { contains: query } }, { username: { contains: query } }],
      },
    },
    include: {
      profile: true,
      sessions: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
      mfPortfolio: true,
      _count: {
        select: {
          mfSips: true,
        },
      },
    },
  });

  // For searched users, we calculate total invested manually since we didn't use aggregate first
  const result = users
    .map((user) => {
      const totalInvested = user.mfPortfolio.reduce(
        (sum, item) => sum + Number(item.invested),
        0,
      );
      const currentValue = user.mfPortfolio.reduce(
        (sum, item) => sum + Number(item.current),
        0,
      );

      return {
        name: user.profile?.name || "Unknown",
        username: user.profile?.username,
        avatar: user.profile?.avatar,
        totalInvested,
        currentValue,
        activeSipCount: user._count.mfSips,
        portfolioCount: user.mfPortfolio.length,
        lastActiveAt: user.sessions[0]?.updatedAt || user.updatedAt,
        createdAt: user.createdAt,
      };
    })
    .sort((a, b) => b.totalInvested - a.totalInvested);

  return result.slice(0, limit);
};

export const getUserProfile = async (username) => {
  const user = await db.user.findFirst({
    where: { profile: { username }, id: { not: "system" } },
    include: {
      profile: true,
      sessions: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!user) throw new ApiError(404, "User not found");

  // Get portfolio summary
  let portfolioSummary = { current: 0, invested: 0 };
  portfolioSummary = await portfolioService.getPortfolioSummary(user.id);

  return {
    name: user.profile?.name,
    username: user.profile?.username,
    avatar: user.profile?.avatar,
    lastActiveAt: user.sessions[0]?.updatedAt || user.updatedAt,
    createdAt: user.createdAt,
    portfolioSummary,
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
