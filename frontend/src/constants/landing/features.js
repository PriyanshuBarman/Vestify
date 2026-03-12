import {
  ArrowLeftRightIcon,
  CalendarDays,
  PieChart,
  Rotate3DIcon,
  TrendingUp,
  Users,
} from "lucide-react";

export const features = [
  {
    title: "Virtually Invest in Mutual Funds",
    description:
      "Browse hundreds of real mutual funds and invest your virtual balance.",
    icon: TrendingUp,
    span: "col-span-12 md:col-span-8",
    isFill: true,
  },
  {
    title: "Start Virtual SIPs",
    description:
      "Start virtual SIPs in Mutual Funds and understand how real SIPs work through an automated process.",

    icon: CalendarDays,
    span: "col-span-12 md:col-span-4",
    isFill: false,
  },
  {
    title: "Step-Up SIPs",
    description:
      "Periodically increase SIP amounts by a fixed value or percentage, similar to real-world step-up SIPs.",
    icon: Rotate3DIcon,
    span: "col-span-12 md:col-span-4",
    isFill: false,
  },
  {
    title: "Track Your Portfolio",
    description:
      "Track how your portfolio grows over time and experience how real investments perform in different market conditions.",
    icon: PieChart,
    span: "col-span-12 md:col-span-4",
    isFill: false,
  },
  {
    title: "Community Portfolios",
    description: "See how other virtual investors are allocating their funds.",
    icon: Users,
    span: "col-span-12 md:col-span-4",
    isFill: false,
  },
  {
    title: "Send & Receive Virtual Money",
    description:
      "Send, receive, Scan & Pay your virtual money with others instantly—just like UPI.",
    icon: ArrowLeftRightIcon,
    span: "col-span-12",
    isFill: true,
  },
];
