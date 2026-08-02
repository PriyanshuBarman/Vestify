import type { GainerLoserData } from "nse-bse-api/bse";
import type { INDEX_SYMBOLS } from "../constants/index.constant.js";

export type IndexSymbol = (typeof INDEX_SYMBOLS)[number];
export type NseSymbol = `${string}.NS`;
export type TickerSymbol = string; // Alias for readability
export type YfSymbol = NseSymbol | IndexSymbol;

export type BseMoverItem = GainerLoserData & {
  index_code?: string;
  scripname?: string;
  trd_vol?: number;
};

export type Bse52WeekItem = {
  Index_code?: string;
  ScripName?: string;
  Cur52wkHigh?: number;
  Cur52wkLow?: number;
};
