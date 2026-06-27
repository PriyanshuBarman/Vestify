import axios from "axios";
import { format } from "date-fns";
import { envConfig } from "@/config/env.config.js";

export const navCache = new Map();

/**
 * Fetches the NavInfo(nav,date) for the given schemeCode and date.
 * Caches the result for future use.
 */

export const fetchNavInfoByDate = async (schemeCode: number, date: Date) => {
  try {
    if (navCache.has(schemeCode)) {
      return navCache.get(schemeCode);
    }

    const { data } = await axios.get(
      `${envConfig.MF_API_BASE_URL}/${schemeCode}`,
    );
    const chartData = data.data;

    const matchedNavInfo = chartData
      .slice(0, 10)
      .find((i: { date: string }) => i.date === format(date, "dd-MM-yyyy"));

    if (!matchedNavInfo) {
      throw new Error(`Nav not found for schemeCode: ${schemeCode} ${date}`);
    }

    navCache.set(schemeCode, matchedNavInfo);
    return matchedNavInfo;
  } catch (error: any) {
    throw new Error(`Error At fetchNavInfoByDate: ${error?.message}`, {
      cause: error,
    });
  }
};
