# Zeref Frontend

A Next.js DeFi application built for automated yield optimization across multiple blockchain protocols. Zeref provides seamless cross-chain asset management with intelligent looping strategies to maximize returns.

## Overview

Zeref is a decentralized finance platform that automates yield optimization through:
- **Cross-Chain Integration**: Support for Stacks, Base, Ethereum L2, Arbitrum, and Hyperliquid
- **Auto-Looping**: Intelligent asset movement based on highest APY opportunities
- **Vault System**: Secure STX deposits that mint ySTX tokens representing your position
- **Real-time Monitoring**: Live APY tracking and resolver decision making

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Frontend**: React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui, Framer Motion
- **Blockchain**: Stacks.js SDK for wallet integration and smart contracts
- **Charts**: Recharts for portfolio visualization
- **Notifications**: Sonner for transaction status updates

## Features

### Landing Page
- Hero section with value proposition
- Feature showcase with cross-chain, DeFi native, and auto-looping highlights
- Interactive timeline showing the optimization process
- Trusted partner logos and social proof

### Dashboard Application
Four main dashboard pages providing comprehensive DeFi management:

#### 1. **Dashboard** (`/dashboard`)
- Total portfolio value with real-time STX balance
- Portfolio performance chart with time period filters
- Active vault status and yield summary
- Last looping activity notifications

#### 2. **Earn** (`/dashboard/earn`)
- Deposit STX to mint ySTX tokens
- Withdraw STX plus accumulated yield
- Vault selection across multiple protocols (Aave, Moonwell, Pendle, HyperFi)
- Real-time APY comparison and preview amounts
- Transaction status tracking

#### 3. **Resolver View** (`/dashboard/resolver`)
- Supported blockchain monitoring (Base, Arbitrum, Ethereum, Hyperliquid)
- Live APY tracking per protocol
- Resolver decision log explaining asset movements
- Optimization status and timing

#### 4. **Looping History** (`/dashboard/history`)
- Complete transaction timeline
- APY improvement metrics
- Gas cost tracking
- Transaction type categorization
- Explorer links for transaction verification

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Stacks wallet (Hiro Wallet, Xverse, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zeref-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Build for production with Turbopack
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard application
│   │   ├── earn/          # Deposit/withdraw functionality
│   │   ├── resolver/      # Protocol monitoring
│   │   ├── history/       # Transaction history
│   │   └── page.tsx       # Main dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── wallet/            # Wallet integration
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities and services
│   ├── vault-service.ts   # Smart contract interactions
│   ├── stacks-config.ts   # Blockchain configuration
│   ├── mock-data.ts       # Development data
│   └── utils.ts           # Helper functions
└── hooks/                 # Custom React hooks
    └── use-portfolio.ts   # Portfolio data management
```

### Key Components

#### Wallet Integration
- **WalletContext**: Global wallet state management
- **ConnectWalletButton**: Stacks wallet connection
- **WalletStatus**: Connection status display

#### Smart Contract Integration
- **VaultService**: Handles STX/ySTX operations
- **Balance Queries**: Real-time portfolio data
- **Transaction Preview**: Pre-execution estimates

#### Dashboard Components
- **Sidebar**: Navigation between dashboard pages
- **PortfolioChart**: Recharts visualization
- **StatsCard**: Metric display cards
- **STXBalanceRow**: Balance and pricing information

## Blockchain Integration

### Stacks Network
- **Testnet Configuration**: Development and testing
- **Smart Contracts**: Vault operations and token management
- **Wallet Connection**: Multiple wallet provider support
- **Transaction Handling**: Deposit, withdraw, and balance queries

### Supported Protocols
- **Aave**: Lending and borrowing
- **Moonwell**: Cross-chain lending
- **Pendle**: Yield tokenization
- **HyperFi**: High-yield strategies
- **Ethereal**: Ethereum-based yields

## Development

### Environment Setup
The application uses environment variables for configuration:
- Stacks network settings
- Contract addresses
- API endpoints

### Mock Data
Development uses mock data for:
- Portfolio values and history
- Transaction timelines
- APY rates across protocols
- Resolver decision logs

### Type Safety
Full TypeScript implementation with:
- Strict type checking
- Interface definitions for all data structures
- Type-safe smart contract interactions

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Vercel Deployment
The application is optimized for Vercel deployment with automatic optimization for Next.js applications.

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Maintain responsive design principles
4. Test wallet integration on Stacks testnet
5. Update documentation for new features

## License

[Add your license information here]
