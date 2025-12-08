import { formatToINR } from "@/utils/formatters";

export function getColumnValueSm(fund, activeColumn, columnsConfig) {
  if (activeColumn === "popularity") {
    return fund.return_3y ? `${fund.return_3y}%` : "NA";
  }

  if (activeColumn === "aum") {
    return fund.aum ? `${formatToINR(fund.aum / 10, 0)} Cr` : "NA";
  }

  const config = columnsConfig[activeColumn] || {};
  const value = fund[activeColumn];

  if (!value) return "NA";

  return `${config.prefix || ""}${value} ${config.suffix || ""}`;
}

export function getColumnValueLg(fund, key, columnsConfig) {
  if (!fund[key]) return "-";

  if (key === "aum") {
    return `${formatToINR(fund[key] / 10, 1)}Cr`;
  }

  const conf = columnsConfig[key] ?? {};
  return `${conf.prefix || ""}${fund[key]}${conf.suffix || ""}`;
}
