export const aboutData = [
  {
    title: "1. What is Vestify?",
    paragraphs: [
      "Vestify is a virtual investment platform that simulates real mutual fund investing using virtual money. It’s designed to help beginners learn how mutual fund investing, SIPs, step-up SIPs etc. works, in a risk-free virtual environment with a Groww-inspired app UI.",
    ],
  },

  {
    title: "2. What Can You Do in Vestify?",
    paragraphs: [
      "Virtual Investing — invest in mutual funds using virtual money and experience real investing without any financial risk.",
      "Start SIPs — start virtual SIPs in Mutual Funds and understand how real SIPs work through an automated process.",
      "Step-up SIPs — periodically increase SIP amounts by a fixed value or percentage, similar to real-world step-up SIPs.",
      "Track Portfolio — track how your portfolio grows over time and experience how real investments perform in different market conditions.",
      "Virtual Wallet — get virtual money to invest and manage your balance.",
      "Shareable Virtual Money(P2P): Send, receive, and Scan & Pay your virtual money instantly—just like UPI.",
      "All with Zero Real Money Involved — completely risk-free, safe, and fun.",
    ],
  },

  {
    title: "3. How Vestify Works",
    paragraphs: [
      "Vestify maintains its own backend database containing both fund metadata and daily change data (NAV and return percentages) for 1,550+ mutual funds.",
      "The frontend generally does not call any third party external API. Instead, it retrieves all data from Vestify’s own API, which fetches the required information from the database and serves it to the frontend. This ensures fast, consistent, and reliable access to mutual fund data, without overloading or harming external APIs.",
      "The only exception is historical chart data, which is fetched directly by the frontend from MfApi(an open source mutual fund api). This data is cached on the client side, so the API is only called once per fund per day, minimizing repeated requests.",
      "To keep our database updated responsibly:",
      "• MfApi (Open Source API): used once per day via a cron job to update NAV and return percentages for all funds.",
      "• Kuvera’s Unofficial API (metadata only): used only once per week to update static metadata like fund manager, expense ratio, exit load, fund size, etc.",
      "NOTE: Vestify has no partnership, affiliation, permission, or collaboration with Kuvera. If any concerns arise from Kuvera regarding the use of their unofficial API, Vestify will immediately comply and take the required action, including discontinuing its usage without hesitation.",
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
