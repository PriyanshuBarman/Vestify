import { db } from "@/config/db.config.js";
import { ApiError } from "@/shared/utils/api-error.utils.js";
import { getOrderExpiryDate } from "../utils/date.utils.js";
import {
  openOrdersQueue,
  startOrderExecutionIfNeeded,
} from "@/socket/services/stock-order-execution.service.js";
import type {
  BuyOrderSchema,
  ModifyOrderSchema,
  SellOrderSchema,
} from "../schemas/order.schema.js";

export const placeBuyOrder = async (userId: string, body: BuyOrderSchema) => {
  const {
    name,
    shortName,
    symbol,
    quantity,
    type,
    gttType,
    triggerPrice,
    limitPrice,
  } = body;

  const validity = type === "GTT" ? "YEAR" : "DAY_END";
  const expiresAt = getOrderExpiryDate(type);

  const order = await db.stockOrder.create({
    data: {
      userId,
      name,
      shortName,
      symbol,
      quantity,
      type,
      gttType,
      triggerPrice,
      limitPrice,
      action: "BUY",
      validity,
      expiresAt,
      status: "OPEN",
    },
  });

  openOrdersQueue.set(order.id, order);
  startOrderExecutionIfNeeded();

  return order;
};

export const placeSellOrder = async (userId: string, body: SellOrderSchema) => {
  const { symbol, quantity, type, gttType, triggerPrice, limitPrice } = body;

  const stock = await db.stockPortfolio.findUnique({
    where: { userId_symbol: { userId, symbol } },
  });

  if (!stock) {
    throw new ApiError(404, "Stock not found in your portfolio");
  }

  const validity = type === "GTT" ? "YEAR" : "DAY_END";
  const expiresAt = getOrderExpiryDate(type);

  const order = await db.stockOrder.create({
    data: {
      userId,
      name: stock.name,
      shortName: stock.shortName,
      symbol,
      quantity,
      type,
      gttType,
      triggerPrice,
      limitPrice,
      action: "SELL",
      validity,
      expiresAt,
      status: "OPEN",
    },
  });

  openOrdersQueue.set(order.id, order);
  startOrderExecutionIfNeeded();

  return order;
};

export const cancelOrder = async (userId: string, orderId: string) => {
  const order = await db.stockOrder.findUnique({
    where: { id: orderId },
  });

  if (!order || order.userId !== userId) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status !== "OPEN") {
    throw new ApiError(400, "Only open orders can be cancelled");
  }

  await db.stockOrder.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });

  openOrdersQueue.delete(orderId);
};

export const getAllOrders = async (userId: string) => {
  return await db.stockOrder.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getPendingOrders = async (userId: string) => {
  return await db.stockOrder.findMany({
    where: { userId, status: "OPEN" },
    orderBy: { createdAt: "desc" },
  });
};

export const getTodayOrders = async (userId: string) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return await db.stockOrder.findMany({
    where: {
      userId,
      status: { not: "OPEN" },
      updatedAt: { gte: startOfToday },
    },
    orderBy: { updatedAt: "desc" },
  });
};

export const getOrderDetail = async (orderId: string) => {
  const order = await db.stockOrder.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};

export const modifyOrder = async (
  userId: string,
  orderId: string,
  body: ModifyOrderSchema,
) => {
  const { quantity, triggerPrice, limitPrice, type, action, gttType } = body;

  const order = await db.stockOrder.findUnique({
    where: { id: orderId },
  });

  if (!order || order.userId !== userId) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status !== "OPEN") {
    throw new ApiError(400, "Only open orders can be modified");
  }

  const updatedOrder = await db.stockOrder.update({
    where: { id: orderId },
    data: {
      quantity,
      type: type,
      action: action,
      triggerPrice: triggerPrice ?? order.triggerPrice,
      limitPrice: limitPrice ?? order.limitPrice,
      gttType: gttType ?? order.gttType,
    },
  });

  // Refresh the order in the execution queue
  openOrdersQueue.set(orderId, updatedOrder);
  startOrderExecutionIfNeeded();

  return updatedOrder;
};
