import { db } from "@/config/db.config.js";
import { envConfig } from "@/config/env.config.js";
import { sendUserEvent } from "@/shared/events/event-manager.js";
import { TZDate } from "@date-fns/tz";
import axios from "axios";
import { parse } from "date-fns";
import { calcPortfolioAfterRedemption } from "../utils/calculate-updated-portfolio.utils.js";
import { getDomain } from "../utils/get-domain.utils.js";
import { fifoRedemption } from "./fifo.service.js";
import type { MfPortfolio } from "@prisma/client";

export const instantRedemption = async (fund: MfPortfolio, amount: number) => {
  const {
    userId,
    schemeCode,
    fundName,
    fundShortName,
    fundHouseDomain,
    fundType,
  } = fund;
  const { latestNav, latestNavDate } = await fetchLatestNAVData(schemeCode);

  const units = amount / latestNav; // Redemption units

  const user = await db.$transaction(async (tx) => {
    const costBasis = await fifoRedemption(userId, schemeCode, units, tx);

    const updatedValues = calcPortfolioAfterRedemption(
      fund,
      costBasis,
      amount,
      units,
    );

    await tx.mfPortfolio.update({
      where: { userId_schemeCode: { userId, schemeCode } },
      data: updatedValues,
    });

    const order = await tx.mfOrder.create({
      data: {
        userId,
        schemeCode,
        fundName,
        amount,
        units,
        method: "REGULAR",
        orderType: "REDEEM",
        processDate: TZDate.tz("Asia/Kolkata"),
        navDate: latestNavDate,
        status: "COMPLETED",
        fundHouseDomain: getDomain(fundHouseDomain)!,
        fundShortName,
        fundType,
      },
    });

    const user = await tx.user.update({
      where: { id: userId },
      data: {
        balance: { increment: amount },
      },
    });

    await tx.transaction.create({
      data: {
        userId,
        amount,
        assetCategory: "MUTUAL_FUND",
        assetOrderId: order.id,
        type: "CREDIT",
        updatedBalance: user.balance,
      },
    });

    return user;
  });

  sendUserEvent(userId, { balance: user.balance });
};

export const fetchLatestNAVData = async (schemeCode: number) => {
  try {
    const { data } = await axios.get(
      `${envConfig.MF_API_BASE_URL}/${schemeCode}/latest`,
    );

    const latestEntry = data.data[0];
    const latestNav = parseFloat(latestEntry?.nav);
    const latestNavDate = parse(latestEntry?.date, "yyyy-MM-dd", new Date());

    return { latestNav, latestNavDate };
  } catch (error: any) {
    throw new Error(`Error at fetchLatestNAVData: ${error.message}`, {
      cause: error,
    });
  }
};
