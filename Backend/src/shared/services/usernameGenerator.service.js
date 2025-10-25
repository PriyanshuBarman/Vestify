import crypto from "crypto";
import { db } from "../../../config/db.config.js";

export const generateUniqueUsername = async (name) => {
  const base = name.toLowerCase().replace(/\s+/g, "");
  let username = base;

  // First check if base username is available
  const exists = await db.profile.findUnique({
    where: { username },
  });

  if (!exists) return username;

  // Keep generating until we find an available username
  while (true) {
    // Generate 5 random candidates/usernames in a batch
    const candidates = Array.from(
      { length: 5 },
      () => base + crypto.randomInt(1, 1000) // 4-digit random
    );

    // Fetch all usernames that already exist from this batch
    const taken = await db.profile.findMany({
      where: { username: { in: candidates } },
      select: {
        username: true,
      },
    });

    // Find the first candidate not taken
    const available = candidates.find(
      (u) => !taken.some((t) => t.username === u)
    );

    if (available) {
      return available;
    }

    // If all taken, loop again and try another batch
  }
};
