import { tz } from "@date-fns/tz";
import { format, setDate } from "date-fns";

export function formatFundCategory(category) {
  const arr = [
    "Fund of Funds",
    "Childrens Fund",
    "Retirement Fund",
    "Value Fund",
  ];
  return arr.includes(category) ? category : category?.replace(/\bFund\b/, "");
}

export function addSuffix(date) {
  if (!date) return "";
  return format(setDate(new Date(), date), "do", {
    in: tz("Asia/Kolkata"),
  });
}
