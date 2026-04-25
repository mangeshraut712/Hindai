# 📁 Hind AI Project Structure

## 🏗️ Overview

Hind AI follows a modern Next.js App Router structure with organized directories for scalability and maintainability.

## 📂 Directory Structure

```
Hind AI/
├── 📁 .github/                    # GitHub workflows and CI/CD
│   └── workflows/
│       └── ci.yml                 # Quality checks, tests, and build pipeline
├── 📁 .vscode/                    # VS Code configuration
│   └── settings.json              # Editor settings and preferences
├── 📁 app/                        # Next.js App Router (pages and API)
│   ├── api/                       # Backend API routes
│   │   ├── ai/                    # AI-powered endpoints
│   │   ├── health/                # System health checks
│   │   └── test-*/                # Testing endpoints
│   ├── [slug]/                    # Dynamic scripture pages
│   ├── ai-guide/                  # AI chatbot interface
│   ├── contents/                  # Scripture library
│   ├── daily/                     # Daily wisdom
│   ├── preface/                   # Project preface
│   ├── quiz/                      # Quiz system
│   ├── sanskrit-nova/             # Sanskrit learning tools
│   ├── structure/                 # Project structure info
│   └── study-paths/               # Learning pathways
├── 📁 config/                     # Configuration files
│   ├── playwright.config.ts       # E2E testing configuration
│   └── vitest.config.ts           # Unit testing configuration
├── 📁 docker/                     # Docker configuration
│   ├── Dockerfile                 # Main application container
│   ├── Dockerfile.ollama          # AI model container
│   └── docker-compose.yml        # Multi-container setup
├── 📁 e2e/                        # End-to-end tests
│   └── smoke.spec.ts             # Basic functionality tests
├── 📁 public/                     # Static assets
│   ├── logo.png                   # Application logo
│   ├── manifest.json              # PWA configuration
│   └── sw.js                      # Service worker
├── 📁 src/                        # Source code
│   ├── components/                # React components
│   │   ├── ai/                    # AI-powered components
│   │   ├── quiz/                  # Quiz system components
│   │   ├── scripture/             # Scripture-related components
│   │   ├── ui/                    # Reusable UI components
│   │   └── *.tsx                  # Core application components
│   ├── __tests__/                 # Unit tests
│   ├── integrations/              # Third-party integrations
│   │   └── supabase/              # Database integration
│   ├── lib/                       # Utilities and libraries
│   │   ├── ai/                    # AI model integrations
│   │   ├── data/                  # Static data and content
│   │   └── *.ts                   # Utility functions
│   └── types/                     # TypeScript type definitions
├── 📁 tools/                      # Development tools and scripts
│   ├── *.js                       # Data processing scripts
│   └── .eslintrc.json             # ESLint configuration for tools
├── 📄 .env.example                # Environment variable template
├── 📄 .env.local                  # Local environment variables (git-ignored)
├── 📄 .eslintrc.js                # ESLint configuration
├── 📄 .gitignore                  # Git ignore patterns
├── 📄 .prettierignore             # Prettier ignore patterns
├── 📄 .prettierrc                 # Prettier configuration
├── 📄 .vercelignore               # Vercel ignore patterns
├── 📄 LICENSE                     # Project license
├── 📄 README.md                   # Project documentation
├── 📄 components.json             # shadcn/ui configuration
├── 📄 next-env.d.ts               # Next.js type definitions
├── 📄 next.config.js               # Next.js configuration
├── 📄 package.json                # Dependencies and scripts
├── 📄 package-lock.json           # Dependency lock file
├── 📄 postcss.config.mjs           # PostCSS configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 tsconfig.json               # TypeScript configuration
└── 📄 vercel.json                 # Vercel deployment configuration
```

## 🎯 Key Directories

### `/app` - Next.js App Router
- **API Routes**: Backend endpoints for AI functionality
- **Pages**: Static and dynamic pages for scriptures and features
- **Layouts**: Shared layouts and navigation components

### `/src` - Source Code
- **Components**: Reusable React components organized by feature
- **Lib**: Utilities, data processing, and AI integrations
- **Types**: TypeScript definitions for type safety

### `/config` - Configuration
- **Testing**: Centralized test configuration files
- **Build**: Build and deployment settings

### `/tools` - Development Tools
- **Scripts**: Data processing and maintenance scripts
- **Utilities**: Development and build tools

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js framework configuration |
| `tsconfig.json` | TypeScript compiler settings |
| `tailwind.config.ts` | Tailwind CSS customization |
| `package.json` | Dependencies and npm scripts |
| `.eslintrc.js` | Code linting rules |
| `.prettierrc` | Code formatting rules |
| `vercel.json` | Deployment configuration |

## 🚀 Getting Started

1. **Clone Repository**
   ```bash
   git clone https://github.com/mangeshraut712/Hindai.git
   cd HindAI
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start

# Deploy to Vercel
vercel --prod
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 🧹 Development Tools

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run type-check

# Clean build artifacts
npm run cleanup
```

## 📊 Project Statistics

- **Total Directories**: 15 main directories
- **API Endpoints**: 20+ routes
- **Components**: 30+ React components
- **Pages**: 175+ static pages
- **Tests**: Unit + E2E test coverage
- **Dependencies**: 801 packages (optimized)

## 🔒 Security & Performance

- **Environment Variables**: Properly configured and git-ignored
- **Dependencies**: Regular security audits (0 vulnerabilities)
- **Build Optimization**: Bundle size optimization and caching
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode

---

This structure ensures scalability, maintainability, and developer productivity while following Next.js best practices.
