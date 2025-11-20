import axios from "axios";
import config from "#config/env.config.js";

export const navCache = new Map();

/**
 * Fetches the NavInfo(nav,date) for the given schemeCode.
 * Caches the result for future use.
 *
 * @param {number} schemeCode
 * @returns {Promise<{nav: number, date: string}>}
 */

export const fetchLatestNAVData = async (schemeCode) => {
  if (navCache.has(schemeCode)) return navCache.get(schemeCode);

  try {
    const { data } = await axios.get(
      `${config.MF_API_BASE_URL}/${schemeCode}/latest`
    );

    const latestEntry = data.data[0];
    const nav = parseFloat(latestEntry.nav);
    const date = latestEntry.date;

    const navInfo = { nav, date };
    navCache.set(schemeCode, navInfo);

    return navInfo;
  } catch (error) {
    throw new Error(`Error at fetchLatestNAVData: ${error.message}`);
  }
};
