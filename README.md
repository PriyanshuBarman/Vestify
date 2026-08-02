<img width="2752" height="1536" alt="og" src="https://res.cloudinary.com/dmtp3bdzx/image/upload/v1767550860/og-image_hwywdw.png" />

# Vestify

Vestify is a virtual investment platform that simulates real-world stock and mutual fund investing using virtual money. It's designed to help beginners learn how stock and mutual fund investing, SIPs, step-up SIPs etc. work in a risk-free virtual environment with a Groww app inspired UI.

## Features

- **Virtual Investing** — Invest in stocks and mutual funds using virtual money and experience real investing without any financial risk. Place Market, Limit, Stop Loss (SL), and GTT (Good Till Triggered) orders.
- **Real-Time Live Price Updates** — Real-time live price streaming via WebSockets for Indian equity market symbols (indices, popular stocks, top movers, 52-week high/low).
- **Virtual SIPs & Step-Up SIPs** — Start virtual SIPs in Mutual Funds and periodically increase SIP amounts by a fixed value or percentage.
- **Portfolio Tracking** — Track how your mutual fund and stock portfolios grow over time in different market conditions.
- **Community Features** — View other users' profiles, portfolios, SIPs, holdings, and watchlists. Learn from other investors' strategies.
- **P2P Transfer (UPI simulation)** — Send, receive, and Scan & Pay your virtual money instantly—just like UPI.
- **Groww App Inspired UI** — Experience real investing just like on the Groww app.
- All with Zero Real Money Involved — Completely risk-free, safe, and fun.

## Tech Stack

### Frontend

- React
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Redux Toolkit
- Socket.io Client
- Zod

### Backend

- TypeScript
- Node.js
- Express.js
- Socket.io
- Zod
- MySQL with Prisma ORM
- Cloudinary (Image Upload)
- GitHub Actions (automation)

### Prerequisites

- Node.js (v24 or higher)
- MySQL database (local or cloud)
- Google OAuth credentials

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/priyanshubarman/vestify.git
cd vestify
```

### 2. Set Up Environment Variables (Backend)

Create a `.env` file in the root of backend directory

```env
DATABASE_URL="mysql://root:pasword@localhost:port/envest"


NODE_ENV = development
FRONTEND_URL = http://localhost:5173
REFRESH_TOKEN_SECRET = your-refresh-token-secret
ACCESS_TOKEN_SECRET = your-access-token-secret
REFRESH_TOKEN_EXPIRY = your-refresh-token-expiry
ACCESS_TOKEN_EXPIRY = your-access-token-expiry

CLIENT_ID = "your-google-client-id"
CLIENT_SECRET = "your-google-client-id"


CLOUDINARY_API_KEY = your-cloudinary-api-key
CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
CLOUDINARY_API_SECRET = your-cloudinary-api-secret

MF_HELPER_API_BASE_URL =
MF_API_BASE_URL =
EXTERNAL_API_BASE_URL =

DAILY_REWARD_AMOUNT = 2000
REFERRER_REWARD_AMOUNT= 15000
REFERRED_USER_REWARD_AMOUNT= 5000
OWNER_EMAIL = example@gmail.com

```

### 3. Set Up Environment Variables (Frontend)

Create a `.env` file in the root of frontend directory

```env
VITE_BACKEND_BASE_URL = "http://localhost:3000"
VITE_MF_CHART_API_BASE_URL = "https://api.mfapi.in/mf"
VITE_MF_API_BASE_URL =

VITE_DAILY_REWARD_AMOUNT = 10000
VITE_REFERRER_REWARD_AMOUNT = 50000
VITE_REFERRED_USER_REWARD_AMOUNT = 10000
```

### 4. Install Root Dependencies

```bash
# Install Husky, commitlint, and lint-staged
npm install
```

### 5. Backend Setup

```bash
cd backend

npm install

# Run Prisma migrations
npx prisma migrate dev

# Start the backend server
npm run dev
```

### 6. Frontend Setup

```bash
cd frontend
npm install

# Start the frontend development server
npm run dev
```

The application should now be running at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Project Structure

```
Vestify/
├── backend/                    # Backend application
│   ├── config/                # Configuration files
│   │   ├── cloudinary.config.ts   # Cloudinary setup for image uploads
│   │   ├── db.config.ts           # Database connection configuration
│   │   └── env.config.ts          # Environment variables configuration
│   ├── generated/             # Prisma generated client files
│   ├── prisma/                # Prisma ORM files
│   │   ├── schema.prisma      # Database schema definitions
│   │   └── migrations/        # Database migration files
│   ├── scripts/               # Utility scripts and cron jobs
│   │   ├── external/          # Scripts for external API calls
│   │   ├── processors/        # Data processing scripts
│   │   ├── tasks/             # Scheduled tasks and cron jobs
│   │   └── utils/             # Helper utilities
│   ├── src/                   # Source code
│   │   ├── announcement/      # Announcement features
│   │   ├── auth/              # Authentication logic and routes
│   │   ├── community/         # Community features (user profiles, social)
│   │   ├── mutual-fund/       # Mutual fund related features
│   │   ├── shared/            # Shared utilities, types, and middleware
│   │   ├── socket/            # Real-time WebSocket setup & price subscriptions (Socket.io)
│   │   ├── stock/             # Stock feature (orders, charts, market data)
│   │   ├── user/              # User management features
│   │   └── wallet/            # Wallet and P2P transfer features
│   ├── package.json           # Backend dependencies
│   └── server.ts              # Main server entry point
│
└── frontend/                  # Frontend application
    ├── public/                # Static assets
    │   ├── robots.txt         # SEO robots configuration
    │   ├── sitemap.xml        # Site structure for search engines
    │   └── sounds/            # Audio files
    ├── src/                   # Source code
    │   ├── api/               # API client and service layer
    │   ├── components/        # Reusable React components
    │   ├── config/            # Frontend configuration
    │   ├── constants/         # Application constants
    │   ├── features/          # Feature modules (each with its own structure)
    │   │   ├── announcement/  # Announcement feature
    │   │   ├── auth/          # Authentication feature
    │   │   ├── community/     # Community profiles & social feed
    │   │   ├── mutual-fund/   # Mutual fund feature
    │   │   ├── stock/         # Stock feature (charts, live price, orders, tables)
    │   │   ├── user/          # User management feature
    │   │   └── wallet/        # Wallet & P2P transfers
    │   │
    │   │   Note: The community feature reuses components and hooks
    │   │   from other feature folders (e.g., displaying portfolios,
    │   │   SIPs, and watchlists). This follows DRY principles and
    │   │   maintains consistency across the application.
    │   ├── hooks/             # Custom React hooks
    │   ├── lib/               # Utility libraries
    │   │   ├── axios.js       # Axios client configuration and interceptors
    │   │   ├── tanstack-query.js  # React Query configuration
    │   │   └── utils.js       # shadcn cn function and utilities
    │   ├── pages/             # Page components
    │   ├── store/             # State management (Redux)
    │   ├── utils/             # Helper functions
    │   ├── App.jsx            # Main App component
    │   ├── main.jsx           # Application entry point
    │   ├── routes.jsx         # Route definitions
    │   └── index.css          # Global styles
    ├── components.json        # shadcn/ui configuration
    ├── package.json           # Frontend dependencies
    └── vite.config.js         # Vite build configuration
```

## How Vestify Works

To learn how Vestify works, please visit the "How Vestify Works?" section on our [About Page](https://www.vestify.priyanshux.me/about).

## Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Website**: [https://vestify.priyanshux.me](https://vestify.priyanshux.me)
- **GitHub**: [Vestify](https://github.com/PriyanshuBarman/Vestify)
- **Reddit Community**: [r/Vestify](https://reddit.com/r/Vestify)
- **Telegram Group (No financial advice)**: [r/Vestify](https://t.me/vvestify)

## Credits

- [MfApi.in](https://www.mfapi.in/)
- [Kuvera](https://kuvera.in)
- [Groww](https://groww.in)
- [Yahoo Finance] (https://finance.yahoo.com)
- [Logo.dev](https://www.logo.dev)
- [Storyset](https://storyset.com)

---

Made by [Priyanshu Barman](https://www.linkedin.com/in/priyanshubarman)
