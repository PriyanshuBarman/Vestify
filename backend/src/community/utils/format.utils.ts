import type { Decimal } from "@prisma/client/runtime/library";

type FormatUserParams = {
  createdAt: Date;
  updatedAt: Date;
  balance: Decimal;
  id: string;
  profile: {
    name: string;
    username: string;
    avatar: string | null;
  } | null;
  sessions: {
    updatedAt: Date;
  }[];
  mfPortfolios: {
    invested: Decimal;
  }[];
  stockPortfolios: {
    invested: Decimal;
  }[];
  _count: {
    mfPortfolios: number;
    mfSips: number;
    stockPortfolios: number;
  };
};

export const formatData = (user: FormatUserParams) => {
  const mfPortfolioList = user.mfPortfolios || [];
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
      fundCount: user._count?.mfPortfolios ?? 0,
      sipCount: user._count?.mfSips ?? 0,
    },
    stockPortfolio: {
      invested: totalStockInvested,
      stockCount: user._count?.stockPortfolios ?? 0,
    },
  };
};
