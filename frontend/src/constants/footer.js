import { GithubLogoIcon, LinkedinLogoIcon, RedditLogoIcon, TwitterLogoIcon } from "@phosphor-icons/react";

export const footerLinks = [
  {
    title: "Home",
    href: "/#",
    isSection: true,
  },
  {
    title: "About",
    href: "/about",
    isSection: false,
  },
  {
    title: "Privacy",
    href: "/privacy-policy",
    isSection: false,
  },
  {
    title: "Terms",
    href: "/terms-and-conditions",
    isSection: false,
  },
  {
    title: "Contact us",
    href: "/contact-us",
    isSection: false,
  },
];

export const socialLinks = [
  {
    label: "Go to vestify reddit comunity",
    href: "https://www.reddit.com/r/Vestify",
    Icon: RedditLogoIcon,
  },
  {
    label: "Go to creators twitter profile",
    href: "https://twitter.com/priyanshuwb",
    Icon: TwitterLogoIcon,
  },
  {
    label: "Go to creators github profile",
    href: "https://github.com/priyanshubarman/vestify",
    Icon: GithubLogoIcon,
  },
  {
    label: "Go to creators linkedin profile",
    href: "https://www.linkedin.com/in/priyanshubarman",
    Icon: LinkedinLogoIcon,
  },
];
