import axios from "axios";
import { format } from "date-fns";
import { MF_API_BASE_URL } from "../../config/env.config.js";

export const navCache = new Map();

export const fetchNavByDate = async (schemeCode, date) => {
  try {
    if (navCache.has(schemeCode)) {
      return navCache.get(schemeCode);
    }

    const { data } = await axios.get(`${MF_API_BASE_URL}/${schemeCode}`);
    const chartData = data.data;

    const matchedNavData = chartData
      .slice(0, 10)
      .find((i) => i.date === format(date, "dd-MM-yyyy"));

    if (!matchedNavData) {
      throw new Error(`Nav not found for schemeCode: ${schemeCode} ${date}`);
    }

    navCache.set(schemeCode, matchedNavData.nav);
    return matchedNavData.nav;
  } catch (error) {
    throw new Error(`Error At fetchNavByDate: ${error}`);
  }
};
