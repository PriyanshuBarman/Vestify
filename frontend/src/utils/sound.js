export const playPaymentSuccessSound = () => {
  const audio = new Audio("/sounds/payment-success.mp3");
  audio.play().catch((err) => {
    console.error("Audio playback failed:", err);
  });
};

export const playMarketOpenBellSound = () => {
  const audio = new Audio("/sounds/opening-bell.mp3");
  audio.play().catch((err) => {
    console.error("Audio playback failed:", err);
  });
};
