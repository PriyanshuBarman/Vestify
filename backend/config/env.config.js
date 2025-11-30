const config = {
  // Authentication
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  // Google Auth
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,

  // App
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DAILY_REWARD_AMOUNT: process.env.DAILY_REWARD_AMOUNT,
  REFERRER_REWARD_AMOUNT: process.env.REFERRER_REWARD_AMOUNT,
  REFERRED_USER_REWARD_AMOUNT: process.env.REFERRED_USER_REWARD_AMOUNT,

  // External APIs
  EXTERNAL_API_BASE_URL: process.env.EXTERNAL_API_BASE_URL,
  MF_HELPER_API_BASE_URL: process.env.MF_HELPER_API_BASE_URL,
  MF_API_BASE_URL: process.env.MF_API_BASE_URL,

  // Email
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  OWNER_EMAIL: process.env.OWNER_EMAIL,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

Object.entries(config).forEach(([key, value]) => {
  if (!value && config.NODE_ENV !== "cron") {
    throw new Error(`${key} is not defined in environment variables!`);
  }
});

export default config;
