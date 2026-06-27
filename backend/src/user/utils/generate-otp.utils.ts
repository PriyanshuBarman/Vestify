import crypto from "crypto";

export function generateOtp(length: number = 4) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return crypto.randomInt(min, max + 1).toString();
}
