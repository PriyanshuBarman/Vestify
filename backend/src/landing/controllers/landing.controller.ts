import { cloudinary } from "@/config/cloudinary.config.js";
import { db } from "@/config/db.config.js";
import type { Request, Response } from "express";

export const getScreenshots = async (_req: Request, res: Response) => {
  const [lightResponse, darkResponse] = await Promise.all([
    cloudinary.api.resources_by_asset_folder("Vestify/screenshots/light", {
      type: "upload",
      max_results: 500,
    }),
    cloudinary.api.resources_by_asset_folder("Vestify/screenshots/dark", {
      type: "upload",
      max_results: 500,
    }),
  ]);

  // Sort by public_id in descending order (which holds screenshot timestamp)
  const sortedLight = lightResponse.resources.sort((a, b) =>
    b.public_id.localeCompare(a.public_id),
  );
  const sortedDark = darkResponse.resources.sort((a, b) =>
    b.public_id.localeCompare(a.public_id),
  );

  const light = sortedLight.map((img) => img.secure_url);
  const dark = sortedDark.map((img) => img.secure_url);

  res.json({ light, dark });
};

export const getUserCount = async (_req: Request, res: Response) => {
  const count = await db.user.count({
    where: {
      id: { not: "system" },
    },
  });

  res.status(200).json({ success: true, count });
};
