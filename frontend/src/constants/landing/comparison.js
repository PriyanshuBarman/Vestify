import {
  ActivityIcon,
  ArrowRightLeftIcon,
  CalendarDaysIcon,
  ChartNoAxesCombinedIcon,
  ListOrderedIcon,
  PieChartIcon,
  QrCodeIcon,
  TrendingUpIcon,
  UsersIcon,
  Wallet2Icon,
} from "lucide-react";

export const comparisonFeatures = [
  {
    icon: ActivityIcon,
    label: "Realtime market data",
    others: true,
  },
  {
    icon: ChartNoAxesCombinedIcon,
    label: "Virtually Invest in Stocks / Mutual Funds",
    others: true,
  },
  {
    icon: ListOrderedIcon,
    label: "Limit Order, Stop Loss Order, GTT Order",
    others: false,
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
