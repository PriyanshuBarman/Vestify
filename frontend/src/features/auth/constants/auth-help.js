import {
  ArrowRight,
  Copy,
  ExternalLink,
  HelpCircle,
  InfoIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

export {
  ArrowRight,
  Copy,
  ExternalLink,
  HelpCircle,
  InfoIcon,
  SearchIcon,
  SettingsIcon,
};

export const MOBILE_STEPS = [
  {
    id: 1,
    title: "Open Browser Menu",
    description:
      "Tap the three-dot (⋮) icon in the top-right corner of your Chrome browser.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768757997/vestify-guide-1.png",
  },
  {
    id: 2,
    title: "Settings",
    description: "Scroll down and tap on the 'Settings' option.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768808229/vestify-guide-2.png",
  },
  {
    id: 3,
    title: "Privacy and Security",
    description: "In settings, find and tap on 'Privacy and security'.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768758447/vestify-guide-3.png",
  },
  {
    id: 4,
    title: "Third-Party Cookies",
    description:
      "Click on the 'Third-party cookies' option to open the cookie settings page.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768758469/vestify-guide-4.png",
  },
  {
    id: 5,
    title: "The Fix: Allow Cookies",
    description:
      "You'll see <b>'Block third-party cookies'</b> is likely selected. Simply change this to <b>'Allow third-party cookies'</b>.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768758561/vestify-guide-5.png",
  },
];

export const ALTERNATIVE_MOBILE_STEPS = [
  {
    id: 1,
    title: "Add Site Exception",
    description: "Tap the <b>'Add site exception'</b>.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768757997/vestify-guide-5-optional-1.png", // Assuming this shows the add button
  },
  {
    id: 2,
    title: "Paste URL",
    description:
      "Paste the Vestify link in the box and tap <b>'Add'</b> to save the exception.",
    image:
      "https://res.cloudinary.com/dmtp3bdzx/image/upload/v1768757997/vestify-guide-5-optional-2.png", // Replace with appropriate image if available
    showUrl: true,
  },
];

export const DESKTOP_STEPS = [
  {
    id: 1,
    title: "Method 1: The Fast Search",
    icon: SearchIcon,
    bgColor: "bg-accent/30",
    borderColor: "border-accent/20",
    titleColor: "text-foreground",
    textColor: "text-muted-foreground",
    codeBg: "bg-accent text-accent-foreground",
    instructions: [
      "Open browser <b>Settings.</b>",
      `In the top <b>Search bar</b>, type <code class="bg-accent px-1 rounded text-accent-foreground font-mono">cookies</code>.`,
      "Select <b>Third-party cookies</b> from the results.",
      'Switch from "Block" to <b>"Allow third-party cookies"</b>.',
    ],
  },
  {
    id: 2,
    title: "Method 2: Manual Navigation",
    icon: SettingsIcon,
    bgColor: "bg-accent/20",
    borderColor: "border-accent/10",
    titleColor: "text-foreground",
    textColor: "text-muted-foreground",
    instructions: [
      "Go to <b>Settings</b> → <b>Privacy and Security</b>.",
      "Click on the <b>Third-party cookies</b> option.",
      'Select <b>"Allow third-party cookies"</b> (Simplest approach).',
      '<b>Alternative:</b> Add Vestify to the <b>"Allowed to use..."</b> list to keep others blocked.',
    ],
  },
];
