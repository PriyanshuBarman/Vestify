import {
  ArrowDownCircleIcon,
  ArrowRightLeftIcon,
  ArrowUpCircleIcon,
  BarChart3Icon,
  CalendarDaysIcon,
  QrCodeIcon,
  RefreshCwIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";

export const comparisonFeatures = [
  {
    icon: TrendingUpIcon,
    label: "Invest in Mutual Funds Virtually",
    others: true,
  },

  {
    icon: CalendarDaysIcon,

    label: "Virtual SIP (Auto-Invest)",
    others: false,
  },
  {
    icon: ArrowUpCircleIcon,
    label: "Step-Up SIP",
    others: false,
  },
  {
    icon: BarChart3Icon,
    label: "Virtual Portfolio",
    others: true,
  },
  {
    icon: WalletIcon,
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
