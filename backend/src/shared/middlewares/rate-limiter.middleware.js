import rateLimit from "express-rate-limit";

const createLimiter = ({
  max = 5,
  windowMs = 15 * 60 * 1000, // 15 min
  skipSuccessfulRequests = false,
  skipFailedRequests = false,
  message,
} = {}) => {
  return rateLimit({
    max,
    windowMs,
    skipSuccessfulRequests,
    skipFailedRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: message || "Too many requests. Please try again later.",
    },
  });
};

export const globalLimiter = createLimiter({ max: 200 });
export const refreshTokenLimiter = createLimiter({ max: 10 });
export const forgotPasswordLimiter = createLimiter();

export const loginLimiter = createLimiter({
  skipSuccessfulRequests: true,
});
export const passwordChangeLimiter = createLimiter({
  skipSuccessfulRequests: true,
});
export const pinChangeLimiter = createLimiter({
  skipSuccessfulRequests: true,
});
export const emailChangeLimiter = createLimiter({
  skipSuccessfulRequests: true,
});
export const validatePinLimiter = createLimiter({
  skipSuccessfulRequests: true,
});

export const avatarUploadLimiter = createLimiter({
  windowMs: 24 * 60 * 60 * 1000,
  skipFailedRequests: true,
  message: "Avatar upload limit reached: max 5 uploads per day.",
});
export const signUpLimiter = createLimiter({
  windowMs: 24 * 60 * 60 * 1000,
  skipFailedRequests: true,
  message: "Account creation limit reached. Please wait 24 hours.",
});
