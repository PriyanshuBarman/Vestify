# Contributing to Vestify

First off, thank you for considering contributing to Vestify! It's people like you that make Vestify such a great tool for learning about investments.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this code. Please report unacceptable behavior to [priyanshubarman741@gmail.com].

### Our Standards

- Be respectful and inclusive
- Be patient and welcoming
- Be collaborative
- Be thoughtful in your communication
- Assume good intentions

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots, etc.)
- **Describe the behavior you observed** and what you expected to see
- **Include your environment details** (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most Vestify users
- **Include mockups or examples** if applicable

### Code Contributions

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Test your changes thoroughly
5. Submit a pull request

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL database (local or cloud)
- Google OAuth credentials
- npm or yarn
- Git

### Setting Up Your Development Environment

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/vestify.git
   cd vestify
   ```

2. **Set Up Environment Variables (Backend)**

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
   CLIENT_SECRET = "your-google-client-secret"

   CLOUDINARY_API_KEY = your-cloudinary-api-key
   CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
   CLOUDINARY_API_SECRET = your-cloudinary-api-secret

   MF_HELPER_API_BASE_URL =
   MF_API_BASE_URL =
   EXTERNAL_API_BASE_URL =

   DAILY_REWARD_AMOUNT = 2000
   REFERRER_REWARD_AMOUNT= 15000
   REFERRED_USER_REWARD_AMOUNT= 5000
   ```

3. **Set Up Environment Variables (Frontend)**

   Create a `.env` file in the root of frontend directory

   ```env
   VITE_BACKEND_BASE_URL = "http://localhost:3000/api/v1"
   VITE_MF_CHART_API_BASE_URL = "https://api.mfapi.in/mf"
   VITE_MF_API_BASE_URL =

   VITE_DAILY_REWARD_AMOUNT = 2000
   VITE_REFERRER_REWARD_AMOUNT = 15000
   VITE_REFERRED_USER_REWARD_AMOUNT = 5000
   ```

4. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Run Prisma migrations
   npx prisma migrate dev

   # Start the backend server
   npm run dev
   ```

5. **Frontend Setup**

   ```bash
   cd frontend
   npm install

   # Start the frontend development server
   npm run dev
   ```

The application should now be running at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Development Workflow

### Branch Naming Convention

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation changes
- `refactor/description` - for code refactoring
- `test/description` - for adding or updating tests

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

**Examples:**

```
feat(wallet): add P2P transfer functionality
fix(sip): correct step-up SIP calculation
docs(readme): update installation instructions
```

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow existing code style and patterns
- Comment complex logic and algorithms
- Keep functions small and focused
- Use meaningful variable and function names

### JavaScript/React Guidelines

- Use functional components with hooks
- Follow React best practices
- Use ESLint and Prettier for code formatting
- Prefer named exports over default exports (except for pages/components)
- Use PropTypes or TypeScript for type checking

### CSS/Tailwind Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Keep custom CSS minimal
- Use shadcn/ui components where possible

### Backend Guidelines

- Follow RESTful API conventions
- Use Prisma for database queries
- Implement proper error handling
- Write secure code (validate inputs, sanitize data)
- Use middleware for common functionality

## Pull Request Process

1. **Update documentation** if needed
2. **Add or update tests** for your changes
3. **Ensure all tests pass** and there are no linting errors
4. **Update the README.md** if you're adding new features
5. **Create a pull request** with a clear title and description
6. **Link related issues** in the PR description
7. **Request review** from maintainers
8. **Address review comments** promptly

### Pull Request Template

```markdown
## Description

[Describe what this PR does]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues

Closes #[issue_number]

## Screenshots (if applicable)

[Add screenshots or GIFs]

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
```

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

## Issue Guidelines

### Creating an Issue

When creating an issue, please include:

1. **Clear title** - Summarize the problem or suggestion
2. **Description** - Detailed explanation of the issue
3. **Steps to reproduce** (for bugs) - How to replicate the issue
4. **Expected behavior** - What should happen
5. **Actual behavior** - What actually happens
6. **Environment** - OS, browser, versions, etc.
7. **Screenshots** (if applicable) - Visual evidence of the issue

### Issue Labels

We use labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `wontfix` - This will not be worked on

## Testing

- Write tests for new features and bug fixes
- Run the test suite before submitting a PR
- Ensure all tests pass locally

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Questions?

Feel free to reach out if you have any questions:

- Open an issue with the `question` label
- Join our [Reddit community](https://www.reddit.com/r/Vestify)
- Contact the maintainer on [LinkedIn](https://www.linkedin.com/in/priyanshubarman)

---

Thank you for contributing to Vestify!
