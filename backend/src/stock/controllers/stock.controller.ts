import type { IndexSymbol } from "@/shared/types/stock.types.js";
import { type ApiRequest } from "@/shared/types/types.js";
import {
  cleanSymbol,
  ensureNseSymbol,
  ensureNseSymbols,
} from "@/shared/utils/normalize-stock-symbol.js";
import { formatDate } from "date-fns";
import type { Response } from "express";
import { BSE } from "nse-bse-api";
import type { GainerLoserData } from "nse-bse-api/bse";
import { NseIndia } from "stock-nse-india";
import YahooFinance from "yahoo-finance2";
import { type QuoteResponseObject } from "yahoo-finance2/modules/quote";

type BseMoverItem = GainerLoserData & {
  index_code?: string;
  scripname?: string;
  trd_vol?: number;
};

type Bse52WeekItem = {
  Index_code?: string;
  ScripName?: string;
  Cur52wkHigh?: number;
  Cur52wkLow?: number;
};

const nseIndia = new NseIndia();
const yahooFinance = new YahooFinance();
const bse = new BSE();

export const searchStock = async (
  req: ApiRequest<{}, { query: string }>,
  res: Response,
) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const result = await yahooFinance.search(query);

  const filteredData = result.quotes
    .filter((item) => {
      return item.exchange === "NSI" && item.quoteType === "EQUITY";
    })
    .map((item) => {
      return {
        ...item,
        symbol: cleanSymbol(item.symbol as string),
      };
    });

  res.status(200).json({ data: filteredData });
};

export const getStockData = async (
  req: ApiRequest<{}, { symbol: string }>,
  res: Response,
) => {
  const symbol = ensureNseSymbol(req.params.symbol); // .NS

  const data = await yahooFinance.quote(symbol);
  const responseData = {
    ...data,
    symbol: cleanSymbol(data.symbol as string),
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

  res.status(200).json({ data: data.quotes });
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

export const getPopularStocks = async (_req: ApiRequest, res: Response) => {
  const index = "|BSE SENSEX|";

  const [gainers, losers] = await Promise.all([bse.gainers(), bse.losers()]);
  const movers = [...gainers, ...losers] as BseMoverItem[];

  const symbols = movers
    .filter((item) => item.index_code?.includes(index))
    .map((item) => item.scripname)
    .filter(Boolean) as string[];

  if (symbols.length === 0) {
    return res.status(200).json({ data: [] });
  }

  const data = await yahooFinance.quote(ensureNseSymbols(symbols));
  const responseData = data
    .sort((a, b) => b.marketCap - a.marketCap)
    .map((item) => ({
      ...item,
      symbol: cleanSymbol(item.symbol as string),
    }));

  res.status(200).json({ data: responseData });
};

export const getGainers = async (
  req: ApiRequest<{}, {}, { index?: string }>,
  res: Response,
) => {
  const index = req.query.index ?? "|BSE SENSEX|";
  const data = (await bse.gainers()) as BseMoverItem[];

  const symbols = data
    .filter((item) => item.index_code?.includes(index))
    .map((item) => item.scripname)
    .filter(Boolean) as string[];

  if (symbols.length === 0) {
    return res.status(200).json({ data: [] });
  }

  const quotesData = await yahooFinance.quote(ensureNseSymbols(symbols));
  const responseData = quotesData.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol as string),
  }));

  res.status(200).json({ data: responseData });
};

export const getLosers = async (
  req: ApiRequest<{}, {}, { index?: string }>,
  res: Response,
) => {
  const index = req.query.index ?? "|BSE SENSEX|";
  const data = (await bse.losers()) as BseMoverItem[];

  const symbols = data
    .filter((item) => item.index_code?.includes(index))
    .map((item) => item.scripname)
    .filter(Boolean) as string[];

  if (symbols.length === 0) {
    return res.status(200).json({ data: [] });
  }

  const quotesData = await yahooFinance.quote(ensureNseSymbols(symbols));
  const responseData = quotesData.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol as string),
  }));

  res.status(200).json({ data: responseData });
};

export const getTopByVolume = async (
  req: ApiRequest<{}, {}, { index?: string }>,
  res: Response,
) => {
  const index = req.query.index ?? "|BSE SENSEX|";

  const [gainers, losers] = await Promise.all([bse.gainers(), bse.losers()]);
  const movers = [...gainers, ...losers] as BseMoverItem[];

  const symbols = movers
    .filter((item) => item.index_code?.includes(index))
    .sort((a, b) => (b.trd_vol || 0) - (a.trd_vol || 0))
    .map((item) => item.scripname)
    .filter(Boolean) as string[];

  if (symbols.length === 0) {
    return res.status(200).json({ data: [] });
  }

  const data = await yahooFinance.quote(ensureNseSymbols(symbols));
  const responseData = data.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol as string),
  }));

  res.status(200).json({ data: responseData });
};

export const get52WeekHighLowStocks = async (
  req: ApiRequest<{}, {}, { index?: string }>,
  res: Response,
) => {
  const index = (req.query.index as string) || "|BSE 100|";

  const data = await bse.near52WeekHighLow();

  const highSymbols = (data?.highs as Bse52WeekItem[])
    .filter((item) => item.Index_code?.includes(index))
    .sort((a, b) => (b.Cur52wkHigh || 0) - (a.Cur52wkHigh || 0))
    .map((item) => item.ScripName)
    .filter(Boolean) as string[];

  const lowSymbols = (data?.lows as Bse52WeekItem[])
    .filter((item) => item.Index_code?.includes(index))
    .sort((a, b) => (a.Cur52wkLow || 0) - (b.Cur52wkLow || 0))
    .map((item) => item.ScripName)
    .filter(Boolean) as string[];

  const highQuotesData = highSymbols.length
    ? await yahooFinance.quote(ensureNseSymbols(highSymbols))
    : [];

  const lowQuotesData = lowSymbols.length
    ? await yahooFinance.quote(ensureNseSymbols(lowSymbols))
    : [];

  const highs = highQuotesData.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol as string),
  }));

  const lows = lowQuotesData.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol as string),
  }));

  res.status(200).json({ data: { highs, lows } });
};

export const getSimilarStocks = async (
  req: ApiRequest<{}, { symbol: string }>,
  res: Response,
) => {
  const { symbol } = req.params;
  const nseSymbol = ensureNseSymbol(symbol);

  const result = await yahooFinance.recommendationsBySymbol(nseSymbol);
  const recommendedSymbols = result.recommendedSymbols
    ?.map((item) => item.symbol)
    .filter(Boolean) as string[];

  if (!recommendedSymbols || recommendedSymbols.length === 0) {
    return res.status(200).json({ data: [] });
  }

  const quotesData = await yahooFinance.quote(
    ensureNseSymbols(recommendedSymbols),
  );

  const responseData = quotesData.map((item) => ({
    ...item,
    symbol: cleanSymbol(item.symbol as string),
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
