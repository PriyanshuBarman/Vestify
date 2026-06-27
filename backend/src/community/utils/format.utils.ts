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
  mfPortfolio: {
    invested: Decimal;
    current: Decimal;
  }[];
  _count: {
    mfSips: number;
  };
};

export const formatData = (user: FormatUserParams) => {
  const totalInvested = user.mfPortfolio.reduce(
    (sum, item) => sum + Number(item.invested),
    0,
  );
  const currentValue = user.mfPortfolio.reduce(
    (sum, item) => sum + Number(item.current),
    0,
  );
  const returnPercent =
    totalInvested > 0
      ? ((currentValue - totalInvested) / totalInvested) * 100
      : 0;

  return {
    userId: user.id,
    name: user.profile?.name ?? "Unknown User",
    username: user.profile?.username ?? "user",
    avatar: user.profile?.avatar ?? null,
    balance: Number(user.balance ?? 0),
    lastActiveAt: user.sessions[0]?.updatedAt ?? user.updatedAt,
    createdAt: user.createdAt,
    portfolio: {
      invested: totalInvested,
      current: currentValue,
      returnPercent: returnPercent,
      sipCount: user._count.mfSips,
      fundCount: user.mfPortfolio.length ?? 0,
    },
  };
};
