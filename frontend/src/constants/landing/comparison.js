import {
  ArrowRightLeftIcon,
  CalendarDaysIcon,
  ChartNoAxesCombinedIcon,
  ChartPieIcon,
  PieChartIcon,
  QrCodeIcon,
  TrendingUpIcon,
  UsersIcon,
  Wallet2Icon,
} from "lucide-react";

export const comparisonFeatures = [
  {
    icon: ChartNoAxesCombinedIcon,
    label: "Invest in stocks (virtually)",
    others: true,
  },
  {
    icon: ChartPieIcon,
    label: "Invest in Mutual Funds (virtually)",
    others: true,
  },
  {
    icon: CalendarDaysIcon,
    label: "Virtual SIP (Auto-Invest)",
    others: false,
  },
  {
    icon: TrendingUpIcon,
    label: "Step-Up SIP",
    others: false,
  },
  {
    icon: PieChartIcon,
    label: "Virtual Portfolio",
    others: true,
  },
  {
    icon: Wallet2Icon,
    label: "Virtual Wallet",
    others: false,
  },
  {
    icon: ArrowRightLeftIcon,
    label: "Send & Receive Virtual Money",
    others: false,
  },
  {
    icon: QrCodeIcon,
    label: "Scan & Pay Your Virtual Money",
    others: false,
  },
  {
    icon: UsersIcon,
    label: "See Other's Portfolio",
    others: false,
  },
];
