import type { Request, Response } from "express";
import { formatDate } from "date-fns";
import { NseIndia } from "stock-nse-india";
import YahooFinance from "yahoo-finance2";
import {
  cleanSymbol,
  ensureNseSymbol,
} from "@/shared/utils/normalize-stock-symbol.js";
import type { IndexSymbol, YfSymbol } from "@/shared/types/stock.types.js";
import { BSE } from "nse-bse-api";
import { formatMoversResponse } from "../utils/format.utils.js";
import { type ApiRequest } from "@/shared/types/types.js";
import { type QuoteResponseObject } from "yahoo-finance2/modules/quote";

const nseIndia = new NseIndia();
const yahooFinance = new YahooFinance();
const bse = new BSE();

export const getStockData = async (
  req: ApiRequest<{}, { symbol: string }>,
  res: Response,
) => {
  const symbol = ensureNseSymbol(req.params.symbol); // .NS

  const data = await yahooFinance.quote(symbol);
  const responseData = {
    ...(data as Record<string, unknown>),
    symbol: cleanSymbol((data as Record<string, unknown>).symbol as string),
  };

  res.status(200).json({ data: responseData });
};

export const getHistoricalChartData = async (
  req: ApiRequest<{}, { symbol: string }>,
  res: Response,
) => {
  const symbol = ensureNseSymbol(req.params.symbol); // .NS

  const quote = await yahooFinance.quote(symbol);

  const data = await yahooFinance.chart(symbol, {
    period1: formatDate(
      quote.firstTradeDateMilliseconds as number,
      "yyyy-MM-dd",
    ),
  });

  res
    .status(200)
    .json({ data: (data as unknown as Record<string, unknown>).quotes });
};

export const getIntradayChartData = async (
  req: ApiRequest<{}, { symbol: string }>,
  res: Response,
) => {
  const { symbol } = req.params;
  const rawSymbol = cleanSymbol(symbol);

  const data = await nseIndia.getEquityIntradayData(rawSymbol);

  const formatted = data.grapthData
    .filter((item) => item[2] !== "PO")
    .map((item) => {
      return {
        date: new Date(item[0]),
        close: item[1],
      };
    });

  res.status(200).json({ data: formatted });
};

export const getGainers = async (_req: Request, res: Response) => {
  const data = await bse.gainers();

  const filteredData = (data as unknown as Record<string, unknown>[]).filter(
    (item) => (item.index_code as string)?.includes("|BSE 100|"),
  );

  res.status(200).json({ data: formatMoversResponse(filteredData as never[]) });
};

export const getLosers = async (_req: Request, res: Response) => {
  const data = await bse.losers();

  const filteredData = (data as unknown as Record<string, unknown>[]).filter(
    (item) => (item.index_code as string)?.includes("|BSE 100|"),
  );

  res.status(200).json({ data: formatMoversResponse(filteredData as never[]) });
};

export const getPopularStocks = async (_req: Request, res: Response) => {
  const symbols: YfSymbol[] = [
    "RELIANCE.NS",
    "TCS.NS",
    "HDFCBANK.NS",
    "SBIN.NS",
  ];

  const data = await yahooFinance.quote(symbols, {
    fields: [
      "symbol",
      "longName",
      "shortName",
      "regularMarketPrice",
      "regularMarketChange",
      "regularMarketChangePercent",
    ],
  });

  // Clean symbols in response
  const responseData = data.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol),
  }));

  res.status(200).json({ data: responseData });
};

export const getIndices = async (
  req: ApiRequest<{}, { symbols: string }>,
  res: Response,
) => {
  const { symbols } = req.params;
  const symbolsArray = symbols.split(",");

  const data = await yahooFinance.quote(symbolsArray, {
    fields: [
      "symbol",
      "longName",
      "shortName",
      "regularMarketPrice",
      "regularMarketChange",
      "regularMarketChangePercent",
    ],
  });

  // Convert array to key value object
  const result = data.reduce<Record<IndexSymbol, QuoteResponseObject>>(
    (acc, val) => {
      acc[val.symbol as IndexSymbol] = val;
      return acc;
    },
    {} as Record<IndexSymbol, QuoteResponseObject>,
  );

  res.status(200).json({ data: result });
};
