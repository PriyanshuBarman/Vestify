export const aboutData = [
  {
    title: "1. What is Vestify?",
    paragraphs: [
      "Vestify is a virtual investment platform that simulates real-world stock and mutual fund investing using virtual money. It’s designed to help beginners learn how stock and mutual fund investing, SIPs, step-up SIPs etc. work in a risk-free virtual environment with a Groww-inspired app UI.",
    ],
  },

  {
    title: "2. What Can You Do in Vestify?",
    paragraphs: [
      "Virtual Investing — Invest in stocks and mutual funds using virtual money and experience real investing without any financial risk. Place Market, Limit, Stop Loss (SL), and GTT (Good Till Triggered) orders.",
      "Real-Time Live Price Updates — Real-time live price streaming via WebSockets for Indian equity market symbols (indices, popular stocks, top movers, 52-week high/low).",
      "Virtual SIPs & Step-Up SIPs — Start virtual SIPs in Mutual Funds and periodically increase SIP amounts by a fixed value or percentage.",
      "Portfolio Tracking — Track how your mutual fund and stock portfolios grow over time in different market conditions.",
      "Community Features — View other users' profiles, portfolios, SIPs, holdings, and watchlists. Learn from other investors' strategies.",
      "P2P Transfer (UPI simulation) — Send, receive, and Scan & Pay your virtual money instantly—just like UPI.",
      "Groww App Inspired UI — Experience real investing just like on the Groww app.",
      "All with Zero Real Money Involved — Completely risk-free, safe, and fun.",
    ],
  },

  {
    title: "3. How Vestify Works",
    paragraphs: [
      "For Mutual Funds:",
      "Vestify maintains its own backend database containing both fund metadata and daily change data (NAV and return percentages) for 1,550+ mutual funds.",
      "The frontend generally does not call any third party external API. Instead, it retrieves all data from Vestify’s own API, which fetches the required information from the database and serves it to the frontend. This ensures fast, consistent, and reliable access to mutual fund data, without overloading or harming external APIs.",
      "The only exception is historical chart data, which is fetched directly by the frontend from MfApi(an open source mutual fund api). This data is cached on the client side, so the API is only called once per fund per day, minimizing repeated requests.",
      "To keep our database updated responsibly:",
      "• MfApi (Open Source API): used once per day via a cron job to update NAV and return percentages for all funds.",
      "• Kuvera’s Unofficial API (metadata only): used only once per week to update static metadata like fund manager, expense ratio, exit load, fund size, etc.",
      "NOTE: Vestify has no partnership, affiliation, permission, or collaboration with Kuvera. If any concerns arise from Kuvera regarding the use of their unofficial API, Vestify will immediately comply and take the required action, including discontinuing its usage without hesitation.",

      "For Stocks & Real-Time Market Data:",
      "To fetch stock market data, Vestify uses the unofficial yahoo-finance2 npm package along with other open-source packages and tools on the backend.",
      "To provide real-time price updates responsibly without overloading or rate-limiting external sources, we implement an efficient room-based WebSocket architecture (via Socket.IO):",
      "• When users open a stock page, view holdings, or track their watchlist, their client subscribes to those specific stock symbols and joins a designated Socket room for each symbol.",
      "• The backend periodically fetches price data for each unique active stock symbol only once per update interval—regardless of whether 1 user or 1,000 users are currently viewing that stock.",
      "• The updated market data is then broadcast live via WebSockets to all users joined in that stock symbol's Socket room.",
      "This room-based batching approach eliminates duplicate API requests, keeping backend performance high while serving smooth, instant real-time market updates to all users.",

      "This setup ensures that Vestify operates responsibly, without any intention to harm or overload third-party services, by serving all data through our own backend API, providing a safe, reliable, and smooth user experience.",
    ],
  },
];
