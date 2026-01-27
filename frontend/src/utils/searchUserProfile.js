export const getNavigationConfig = (mode, profile) => {
  if (mode === "send-money") {
    return {
      pathname: "/wallet/send",
      state: {
        receiverId: profile.userId,
        receiverName: profile.name,
        receiverUsername: profile.username,
        receiverAvatar: profile.avatar,
      },
    };
  }
  return {
    pathname: `/community/${profile.username}`,
  };
};
