import { db } from "@/config/db.config.js";
import type { MfPortfolio } from "@prisma/client";
import { fetchLatestNAVData } from "../external/fetch-latest-nav-data.js";

export const updateFundPortfolio = async (fund: MfPortfolio) => {
  // Fetch latest NAV from API
  const navInfo = await fetchLatestNAVData(fund.schemeCode);

  // If NavDate not changed(i.e. no new NAV), skip update
  if (navInfo.date === (fund?.nav as any)?.date) {
    return console.log("No New NAV found for fund:", fund.schemeCode);
  }

  // Proceed with update logic...
  const units = fund.units.toNumber();
  const invested = fund.invested.toNumber();

  const current = units * navInfo.nav;
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
      nav: navInfo,
    },
  });
};
