import type { TickerSymbol } from "@/shared/types/stock.types.js";

interface BseMoverItem {
  scripname: string;
  LONG_NAME: string;
  change_val: number;
  change_percent: number;
  ltradert: number;
}

interface FormattedMover {
  symbol: TickerSymbol;
  name: string;
  change: number;
  changePercent: number;
  close: number;
}

export const formatMoversResponse = (
  movers: BseMoverItem[],
): FormattedMover[] => {
  return movers.map((item) => {
    return {
      symbol: item.scripname,
      name: item.LONG_NAME,
      change: item.change_val,
      changePercent: item.change_percent,
      close: item.ltradert,
    };
  });
};
