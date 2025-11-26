export const aboutData = [
  {
    title: "1. What is Vestify?",
    paragraphs: [
      "Vestify is a virtual investment platform that simulates real mutual fund investing, providing a real, professional-grade experience with a Groww-inspired UI.",
    ],
  },

  {
    title: "2. What Can You Do in Vestify?",
    paragraphs: [
      "Virtual Investing — invest in real mutual funds using virtual money.",
      "Start & Manage Virtual SIPs — create, edit, or cancel SIPs.",
      "Track a Realistic Virtual Portfolio — see market value, returns, gains, allocations, and more.",
      "Virtual Wallet — get virtual money to invest and manage your balance.",
      "Send Virtual Money to Other Vestify Users — shareable virtual money.",
      "Scan & Pay (Virtual UPI-Style) — transfer virtual money using a QR code.",
      "All with Zero Real Money Involved — completely risk-free, safe, and fun.",
    ],
  },

  {
    title: "3. How Vestify Works",
    paragraphs: [
      "Vestify maintains its own backend database containing both fund metadata and daily change data (NAV and return percentages) for 1,500+ mutual funds.",
      "The frontend generally does not call any external API. Instead, it retrieves all data from Vestify’s own API, which fetches the required information from the database and serves it to the frontend. This ensures fast, consistent, and reliable access to mutual fund data, without overloading or harming external APIs.",
      "The only exception is historical chart data, which is fetched directly by the frontend from MfApi. This data is cached on the client side, so the API is only called once per fund per day, minimizing repeated requests.",
      "To keep the database updated responsibly:",
      "• MfApi (Open Source): used once per day via a cron job to update NAV and return percentages for all funds.",
      "• Kuvera’s Unofficial API (metadata only): used only once per week to update static metadata like fund manager, expense ratio, exit load, fund size, etc.",
      "This setup ensures that Vestify operates responsibly, without any intention to harm or overload third-party services, by serving all data through our own backend API, providing a safe, reliable, and smooth user experience.",
    ],
  },

  {
    title: "4. Next Goal / Future Features",
    paragraphs: [
      "Our next main feature is to add stocks to Vestify. Currently, we are unable to implement it because reliable and free real-time stock APIs are limited or paid.",
    ],
  },
];
