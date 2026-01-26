<img width="2752" height="1536" alt="og" src="https://res.cloudinary.com/dmtp3bdzx/image/upload/v1767550860/og-image_hwywdw.png" />

# Vestify

Vestify is a virtual investment platform that simulates real mutual fund investing using virtual money. It's designed to help beginners learn how mutual fund investing, SIPs, step-up SIPs, and more, in a risk-free virtual environment with a Groww-inspired app UI.

## Features

- **Virtual Investing** — Invest in mutual funds using virtual money and experience real investing without any financial risk.
- **Virtual SIPs** — Start virtual SIPs in Mutual Funds and learn how real SIPs work through an automated process.
- **Step-Up SIPs** — Periodically increase SIP amounts by a fixed value or percentage, similar to real-world step-up SIPs.
- **Portfolio Tracking** — Track how your portfolio grows over time and experience how real investments perform in different market conditions.
- **Community Features** — View other users' profiles, portfolios, SIPs, and watchlists. Learn from other investors' strategies.
- **P2P Transfer(UPI simulation)** — Send, receive, and Scan & Pay your virtual money instantly—just like UPI.
- **Groww app Inspired UI** — Experience real investing just like on the Groww app.
- All with Zero Real Money Involved — Completely risk-free, safe, and fun.

## Tech Stack

### Frontend

- React
- Tailwind CSS
- shadcn/ui
- Tanstack Query
- Redux toolkit

### Backend

- Node.js
- Express.js
- MySQL with Prisma ORM
- Cloudinary (Image Upload)
- GitHub Actions (sautomation)

### Prerequisites

- Node.js (v18 or higher)
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

VITE_BACKEND_BASE_URL = "http://localhost:3000/api/v1"
VITE_MF_CHART_API_BASE_URL = "https://api.mfapi.in/mf"
VITE_MF_API_BASE_URL =

VITE_DAILY_REWARD_AMOUNT = 2000
VITE_REFERRER_REWARD_AMOUNT = 15000
VITE_REFERRED_USER_REWARD_AMOUNT = 5000



```

### 4. Backend Setup

```bash
cd backend

npm install

# Run Prisma migrations
npx prisma migrate dev

# Start the backend server
npm run dev
```

### 5. Frontend Setup

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
│   │   ├── cloudinary.config.js    # Cloudinary setup for image uploads
│   │   ├── db.config.js            # Database connection configuration
│   │   └── env.config.js           # Environment variables configuration
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
│   │   ├── auth/              # Authentication logic and routes
│   │   ├── community/         # Community features (user profiles, social)
│   │   ├── mutual-fund/       # Mutual fund related features
│   │   ├── shared/            # Shared utilities and middleware
│   │   ├── user/              # User management features
│   │   └── wallet/            # Wallet and P2P transfer features
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server entry point
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
    │   │   └── [feature-name]/
    │   │       ├── api/           # Feature-specific API calls
    │   │       ├── components/    # Feature-specific components
    │   │       ├── constants/     # Feature-specific constants
    │   │       ├── hooks/         # Feature-specific hooks
    │   │       ├── pages/         # Feature-specific pages
    │   │       ├── utils/         # Feature-specific utilities
    │   │       └── routes.jsx     # Feature-specific route definitions
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

To learn how Vestify works, please visit the "How Vestify Works?" section on our [About Page](https://www.vestiffy.vercel.app/about).

## Roadmap

- [ ] Add stock feature to Vestify
- [ ] Implement real-time notifications
- [ ] Add more investment strategies

## Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Website**: [https://www.vestiffy.vercel.app](https://www.vestiffy.vercel.app)
- **Reddit Comunity**: [r/Vestify](https://www.reddit.com/r/Vestify)
- **GitHub**: [Vestify](https://github.com/PriyanshuBarman/Vestify)

## Credits

- [Groww](https://groww.in)
- [Kuvera](https://kuvera.in)
- [MfApi.in](https://www.mfapi.in/)
- [Logo.dev](https://www.logo.dev/)

---

Made by [Priyanshu Barman](https://www.linkedin.com/in/priyanshubarman)
