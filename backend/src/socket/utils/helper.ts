import { formatDate } from "date-fns";
import { fields } from "./constants.js";
import { cleanSymbol } from "@/shared/utils/normalize-stock-symbol.js";

export function pickQuoteFields(
  quote: Record<string, unknown>,
): Record<string, unknown> {
  return fields.reduce<Record<string, unknown>>((acc, key) => {
    const value = quote[key];
    if (value !== undefined) {
      acc[key] = key === "symbol" ? cleanSymbol(value as string) : value;
    }
    return acc;
  }, {});
}

export function formatIntradayChart(
  data: [number, number, string][],
): { date: string; close: number }[] {
  return data
    .filter((item) => item[2] !== "PO")
    .map((item, index) => {
      const originalDate = new Date(item[0]);
      const newDate = new Date(originalDate);
      newDate.setHours(9, 15 + index, 0, 0);

      return {
        date: formatDate(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        close: item[1],
      };
    });
}
