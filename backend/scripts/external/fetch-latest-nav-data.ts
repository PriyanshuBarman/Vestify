import axios from "axios";
import { envConfig } from "@/config/env.config.js";

export const navCache = new Map();

/**
 * Fetches the NavInfo(nav,date) for the given schemeCode.
 * Caches the result for future use.
 */

export const fetchLatestNAVData = async (schemeCode: number) => {
  if (navCache.has(schemeCode)) {
    return navCache.get(schemeCode);
  }

  try {
    const { data } = await axios.get(
      `${envConfig.MF_API_BASE_URL}/${schemeCode}/latest`,
    );

    const latestEntry = data.data[0];
    const nav = parseFloat(latestEntry.nav);
    const date = latestEntry.date;

    const navInfo = { nav, date };
    navCache.set(schemeCode, navInfo);

    return navInfo;
  } catch (error: any) {
    throw new Error(`Error at fetchLatestNAVData: ${error?.message}`, {
      cause: error,
    });
  }
};
