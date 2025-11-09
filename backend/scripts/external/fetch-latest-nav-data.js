import axios from "axios";
import { MF_API_BASE_URL } from "../../config/env.config.js";

export const navCache = new Map();

export const fetchLatestNAVData = async (schemeCode) => {
  if (navCache.has(schemeCode)) return navCache.get(schemeCode);

  try {
    const { data } = await axios.get(`${MF_API_BASE_URL}/${schemeCode}/latest`);

    const latestEntry = data.data[0];
    const latestNav = parseFloat(latestEntry.nav);
    const latestNavDate = latestEntry.date;

    const navInfo = { latestNav, latestNavDate };
    navCache.set(schemeCode, navInfo);

    return navInfo;
  } catch (error) {
    throw new Error(`Error at fetchLatestNAVData: ${error.message}`);
  }
};
