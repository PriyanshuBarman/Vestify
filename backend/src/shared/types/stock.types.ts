import { type INDEX_SYMBOLS } from "../constants/index.constant.js";

export type IndexSymbol = (typeof INDEX_SYMBOLS)[number];
export type NseSymbol = `${string}.NS`;
export type TickerSymbol = string; // Alias for readability
export type YfSymbol = NseSymbol | IndexSymbol;
