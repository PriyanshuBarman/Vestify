import { z } from "zod";

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(["production", "development", "cron"]),
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.url(),
  DAILY_REWARD_AMOUNT: z.coerce.number(),
  REFERRER_REWARD_AMOUNT: z.coerce.number(),
  REFERRED_USER_REWARD_AMOUNT: z.coerce.number(),

  // Auth
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),

  // Google Auth
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),

  // External APIs
  EXTERNAL_API_BASE_URL: z.string(),
  MF_HELPER_API_BASE_URL: z.string(),
  MF_API_BASE_URL: z.string(),

  // Email
  RESEND_API_KEY: z.string(),
  OWNER_EMAIL: z.email(),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

//  Production/Development: Require ALL environment variables
//  Cron: Allow partial environment variables (missing ones are optional)
const isCronEnvironment = process.env.NODE_ENV === "cron";
const schema = isCronEnvironment ? envSchema.partial() : envSchema;

const { data: envConfig, error, success } = schema.safeParse(process.env);

if (!success && !isCronEnvironment) {
  console.error("Missing/invalid environment variables:\n");
  console.error(z.flattenError(error).fieldErrors);
  process.exit(1);
}

export default envConfig;
