import type { Decimal } from "@prisma/client/runtime/library";

type FormatUserParams = {
  id: string;
  balance?: Decimal;
  createdAt?: Date;
  updatedAt?: Date;
  profile: {
    name: string;
    username: string;
    avatar: string | null;
  } | null;
  sessions: {
    updatedAt: Date;
  }[];
  mfPortfolio?: {
    invested: Decimal;
  }[];
  stockPortfolios?: {
    invested: Decimal;
  }[];
  _count?: {
    mfSips?: number;
  };
};

export const formatData = (user: FormatUserParams) => {
  const mfPortfolioList = user.mfPortfolio || [];
  const stockPortfolioList = user.stockPortfolios || [];

  const totalMfInvested = mfPortfolioList.reduce(
    (sum, item) => sum + Number(item.invested),
    0,
  );

  const totalStockInvested = stockPortfolioList.reduce(
    (sum, item) => sum + Number(item.invested),
    0,
  );

  return {
    userId: user.id,
    name: user.profile?.name ?? "Unknown User",
    username: user.profile?.username ?? "user",
    avatar: user.profile?.avatar ?? null,
    balance: Number(user.balance ?? 0),
    lastActiveAt: user.sessions[0]?.updatedAt ?? user.updatedAt,
    createdAt: user.createdAt,
    mfPortfolio: {
      invested: totalMfInvested,
      fundCount: mfPortfolioList.length,
      sipCount: user._count?.mfSips ?? 0,
    },
    stockPortfolio: {
      invested: totalStockInvested,
      stockCount: stockPortfolioList.length,
    },
  };
};
