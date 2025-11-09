import { db } from "../../config/db.config.js";
import { getPrevBusinessDate } from "../../src/shared/utils/holidays.utils.js";
import { fetchLatestNAVData } from "../external/fetch-latest-nav-data.js";
import { parseDDMMYYYY } from "../utils/parse-date.utils.js";

export const updateFundPortfolio = async (fund) => {
  // Fetch latest NAV from API
  const navInfo = await fetchLatestNAVData(fund.schemeCode);

  const apiNavDate = parseDDMMYYYY(navInfo.latestNavDate);

  // If NavDate not changed(i.e. no new NAV), skip update
  if (apiNavDate <= getPrevBusinessDate()) {
    return console.log("No New NAV found for fund:", fund.schemeCode);
  }

  // Proceed with update logic...
  const units = fund.units.toNumber();
  const invested = fund.invested.toNumber();

  const current = units * navInfo.latestNav;
  const pnl = current - invested;
  const returnPercent = (pnl / invested) * 100;
  const dayChangeValue = current - fund.current.toNumber();
  const dayChangePercent = (dayChangeValue / fund.current.toNumber()) * 100;

  await db.mfPortfolio.update({
    where: { folio: fund.folio },
    data: {
      current,
      pnl,
      returnPercent,
      dayChangeValue,
      dayChangePercent,
    },
  });
};
