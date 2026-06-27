import { db } from "@/config/db.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import type {
  GetUsersSchema,
  SearchUsersSchema,
} from "../schemas/user.schema.js";
import { formatData } from "../utils/format.utils.js";

type GetUsersParams = {
  skip: number;
  take: number;
  sortBy: GetUsersSchema["sortBy"];
};

export const getUsers = async ({ skip, take, sortBy }: GetUsersParams) => {
  const totalCount = await db.user.count({
    where: { id: { not: "system" } },
  });

  const allowedSortFields = new Set(["createdAt", "updatedAt", "name"]);
  const sortField = allowedSortFields.has(sortBy) ? sortBy : "createdAt";
  const orderBy =
    sortField === "name"
      ? [{ profile: { name: "asc" as const } }, { id: "asc" as const }]
      : [{ [sortField]: "desc" as const }, { id: "asc" as const }];

  const users = await db.user.findMany({
    where: {
      id: { not: "system" },
    },
    skip,
    take,
    select: {
      id: true,
      balance: true,
      createdAt: true,
      updatedAt: true,
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
    orderBy,
  });

  if (!users.length) {
    return { users: [], totalCount };
  }

  const mergedUsers = users.map(formatData);

  return {
    users: mergedUsers,
    totalCount,
  };
};

export const searchUsers = async ({ query, limit }: SearchUsersSchema) => {
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

export const getUserProfile = async (username: string) => {
  const user = await db.user.findFirst({
    where: { profile: { username }, id: { not: "system" } },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
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

export const getUserIdByUsername = async (username: string) => {
  const profile = await db.profile.findUnique({
    where: { username },
    select: { userId: true },
  });

  if (!profile || profile.userId === "system") {
    throw new ApiError(404, "User not found");
  }

  return profile.userId;
};
