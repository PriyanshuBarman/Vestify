// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/apiError.utils.js";
// import { JWT_SECRET } from "../../../config/env.config.js";
// import { db } from "../../../config/db.config.js";
// import { generateTokenHash, generateTokens } from "../utils/token.utils.js";
// import { asyncHandler } from "../utils/asyncHandler.utils.js";
// import {
//   ACCESS_COOKIE_OPTIONS,
//   REFRESH_COOKIE_OPTIONS,
// } from "../../auth/constants/auth.constants.js";

// export const authenticate = asyncHandler(async (req, res, next) => {
//   const { accessToken, refreshToken } = req.cookies;

//   try {
//     // Try to verify access token first
//     const decodedAT = jwt.verify(accessToken, JWT_SECRET);
//     req.user = { userId: decodedAT.userId };
//     return next();
//   } catch (error) {
//     console.log("Access token expired, trying refresh token...");
//   }

//   if (!refreshToken) {
//     return next(new ApiError(403, "Refresh token missing"));
//   }

//   try {
//     // Verify refresh token
//     const decoded = await new Promise((resolve, reject) => {
//       jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
//         if (err) reject(new ApiError(403, "Invalid or expired refresh token"));
//         resolve(decoded);
//       });
//     });

//     // Find session using token hash
//     const refreshTokenHash = generateTokenHash(refreshToken);
//     const session = await db.session.findUnique({
//       where: { refreshTokenHash },
//       include: { user: true },
//     });

//     if (!session) {
//       throw new ApiError(403, "Invalid or expired refresh token");
//     }

//     // Generate new tokens
//     const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
//       generateTokens(session.userId);
//     const newRefreshTokenHash = generateTokenHash(newRefreshToken);

//     // Update session with new token hash
//     await db.session.update({
//       where: { id: session.id },
//       data: {
//         userAgent: req.headers["user-agent"],
//         refreshTokenHash: newRefreshTokenHash,
//         updatedAt: new Date(),
//       },
//     });

//     // Set new tokens in cookies
//     res.cookie("accessToken", newAccessToken, ACCESS_COOKIE_OPTIONS);
//     res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS);

//     // Set user in request and continue
//     req.user = { userId: session.userId };
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env.config.js";
import { ApiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});
