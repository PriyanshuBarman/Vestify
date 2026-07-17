import {
  type IndexSymbol,
  type NseSymbol,
  type TickerSymbol,
  type YfSymbol,
} from "@/shared/types/stock.types.js";
import { INDEX_SYMBOLS } from "../constants/index.constant.js";

export const INDEX_SYMBOLS_SET = new Set<string>(INDEX_SYMBOLS);

/**
 * Ensures symbol has .NS suffix for API usage
 * - Index symbols: returned as-is
 * - Stock symbols: appends .NS if not already present
 */
export function ensureNseSymbol(symbol: string): YfSymbol {
  const trimmedSymbol = symbol?.trim()?.toUpperCase();

  if (INDEX_SYMBOLS_SET.has(trimmedSymbol)) {
    return trimmedSymbol as IndexSymbol;
  }
  if (trimmedSymbol?.endsWith(".NS")) {
    return trimmedSymbol as NseSymbol;
  }
  return `${trimmedSymbol}.NS` as NseSymbol;
}

/**
 * Cleans symbol by removing .NS suffix for display
 * - Removes .NS suffix if present
 * - Returns as-is otherwise
 */
export function cleanSymbol(symbol: string): TickerSymbol {
  const trimmedSymbol = symbol?.trim()?.toUpperCase();

  if (trimmedSymbol?.endsWith(".NS")) {
    return trimmedSymbol.replace(".NS", "");
  }
  return trimmedSymbol;
}

/**
 * Ensures array of symbols have .NS suffix
 */
export function ensureNseSymbols(symbols: string[]): YfSymbol[] {
  return symbols.map((symbol) => ensureNseSymbol(symbol));
}

/**
 * Cleans array of symbols by removing .NS suffix
 */
export function cleanSymbols(symbols: string[]): TickerSymbol[] {
  return symbols?.map((symbol) => cleanSymbol(symbol));
}
