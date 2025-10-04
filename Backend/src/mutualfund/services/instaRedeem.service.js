import { TZDate } from "@date-fns/tz";
import { parse } from "date-fns";
import { db } from "../../../config/db.config.js";
import { MF_API_BASE_URL } from "../../../config/env.config.js";
import { sendUserEvent } from "../../shared/events/eventManager.js";
import { calcPortfolioAfterRedemption } from "../utils/calculateUpdatedPortfolio.utils.js";
import { fifoRedemption } from "./fifo.service.js";

export const instantRedemption = async (fund, amount) => {
  const { schemeCode, userId } = fund;
  const { latestNav, latestNavDate, fundName } = fetchLatestNAVData(
    fund.schemeCode
  );

  const units = amount / latestNav; // Redemption units

  // prisma $transaction
  const user = await db.$transaction(async (tx) => {
    const costBasis = await fifoRedemption(userId, schemeCode, units, tx);

    const updatedValues = calcPortfolioAfterRedemption(
      fund,
      costBasis,
      amount,
      units
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
        status: "COMPLETE",
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

export const fetchLatestNAVData = async (schemeCode) => {
  try {
    const { data } = await axios.get(`${MF_API_BASE_URL}/${schemeCode}/latest`);

    const latestEntry = data.data[0];
    const latestNav = parseFloat(latestEntry?.nav);
    const latestNavDate = parse(latestEntry?.date, "yyyy-MM-dd", new Date());

    return { latestNav, latestNavDate };
  } catch (error) {
    throw new Error(`Error at fetchLatestNAVData: ${error.message}`);
  }
};
