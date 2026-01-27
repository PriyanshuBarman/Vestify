export const formatData = (user) => {
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
    name: user.profile?.name ?? "Unknown User",
    username: user.profile?.username ?? "user",
    avatar: user.profile?.avatar ?? null,
    lastActiveAt: user.sessions[0]?.updatedAt ?? user.updatedAt,
    portfolio: {
      invested: totalInvested,
      current: currentValue,
      returnPercent: returnPercent,
      sipCount: user._count.mfSips,
      fundCount: user.mfPortfolio.length ?? 0,
    },
  };
};
