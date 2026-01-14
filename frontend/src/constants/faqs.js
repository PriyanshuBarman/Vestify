import {
  VITE_DAILY_REWARD_AMOUNT,
  VITE_REFERRER_REWARD_AMOUNT,
} from "@/config/env";
import { formatToINR } from "@/utils/formatters";

const dailyRewardAmount = formatToINR(VITE_DAILY_REWARD_AMOUNT);
const REFERRER_REWARD = formatToINR(VITE_REFERRER_REWARD_AMOUNT);

export const faqs = [
  {
    question: "What is Vestify?",
    answer:
      "Vestify is a virtual investment platform that simulates real world mutual fund investing using virtual money. It’s designed to help beginners learn how investing, SIPs works in a risk-free way.",
  },
  {
    question: "Is it a real investment platform?",
    answer:
      "No. Vestify does not involve real money or actual investments. All funds, portfolios, SIPs, and returns are completely virtual and meant only for learning and practice.",
  },
  {
    question: "Can I lose real money on Vestify?",
    answer:
      "No, you cannot lose real money on Vestify since all investments are virtual. However, your virtual portfolio value can go down based on real market movements, which helps you learn about investment risks without actual financial loss.",
  },
  {
    question: "Is Vestify free to use?",
    answer:
      "Yes, Vestify is completely free to use. There are no hidden charges, subscriptions, or premium plans.",
  },
  {
    question: "How do I will get virtual money?",
    answer: `You’ll receive ${dailyRewardAmount} as a daily credit when you visit the platform each day. You only get it once per day, so make sure to check in daily.`,
  },
  {
    question: "Is Vestify an open-source project?",
    answer:
      "Yes, Vestify is an open-source project. Anyone can explore the codebase and contribute to improving the platform.",
  },
  {
    question: "Can I contribute to Vestify?",
    answer:
      "Absolutely. Developers, designers, and contributors are welcome to contribute. You can check the GitHub repository to get started.",
  },
];

export const walletFAQs = [
  {
    question: "How do I get more virtual money?",
    answer: `You’ll receive ${dailyRewardAmount} as a daily credit when you visit the platform each day. You only get it once per day, so make sure to check in daily.`,
  },
  {
    question: "Can I transfer virtual money to others?",
    answer:
      "Yes, you can transfer virtual money to other Vestify users within the platform. However, it cannot be cashed out or withdrawn to your bank.",
  },
  {
    question: "Can I withdraw virtual money to my bank?",
    answer:
      "No, the virtual money cannot be withdrawn or transferred to your bank account. It’s purely for simulation and learning purposes, helping you explore investing without using real money.",
  },
  {
    question: "How can I earn more than the daily credit?",
    answer: `You can earn extra virtual money through our referral program. For every person you refer, you’ll get ${REFERRER_REWARD} (virtual money) added to your wallet. To know more about the referral program, go to the Referral page from your Profile section.`,
  },
  {
    question: "What happens if I don’t visit the platform daily?",
    answer: `If you skip a day, you’ll just miss that day’s ${dailyRewardAmount} daily credit. Your portfolio and investments will still stay updated automatically, so you can check your progress anytime.`,
  },
];
