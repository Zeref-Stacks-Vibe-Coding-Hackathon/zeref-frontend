export const mockDashboard = {
  tvl: {
    total: 2400000,
    stx: 1800000,
    yStx: 600000
  },
  currentYield: {
    apy: 12.5,
    dailyEarnings: 890.43
  },
  activeChains: [
    { name: "Stacks", strategy: "Native Stacking", apy: 8.2, active: true },
    { name: "Base", strategy: "Aave Lending", apy: 15.8, active: true },
    { name: "Solana", strategy: "JitoSOL", apy: 7.1, active: false }
  ],
  lastLooping: {
    timestamp: "2025-01-16T10:30:00Z",
    from: "Stacks",
    to: "Base",
    reason: "Higher APY detected (15.8% vs 8.2%)"
  }
};

export const mockTransactions = [
  {
    id: "tx-001",
    type: "deposit",
    amount: 5000,
    token: "STX",
    status: "completed",
    timestamp: "2025-01-16T09:15:00Z",
    hash: "0xabc123...def456"
  },
  {
    id: "tx-002", 
    type: "withdraw",
    amount: 2500,
    token: "STX",
    status: "pending",
    timestamp: "2025-01-16T11:22:00Z",
    hash: "0x789ghi...jkl012"
  }
];

export const mockResolverData = {
  supportedChains: [
    {
      name: "Stacks",
      logo: "/Images/Logo/stacks-logo.png",
      protocols: [
        { name: "Native Stacking", apy: 8.2, tvl: 45000000 },
        { name: "StackSwap", apy: 6.5, tvl: 12000000 }
      ]
    },
    {
      name: "Base",
      logo: "/Images/Logo/base-logo.png", 
      protocols: [
        { name: "Aave", apy: 15.8, tvl: 890000000 },
        { name: "Compound", apy: 12.3, tvl: 450000000 }
      ]
    },
    {
      name: "Ethereum",
      logo: "/Images/Logo/ethereum-logo.png",
      protocols: [
        { name: "Lido", apy: 3.8, tvl: 32000000000 },
        { name: "Rocket Pool", apy: 4.1, tvl: 5800000000 }
      ]
    }
  ],
  decisionLog: [
    {
      timestamp: "2025-01-16T10:30:00Z",
      from: "Stacks Native",
      to: "Base Aave", 
      reason: "APY improved from 8.2% to 15.8%",
      amount: 10000,
      gasUsed: 0.05
    },
    {
      timestamp: "2025-01-15T14:22:00Z",
      from: "Ethereum Lido", 
      to: "Stacks Native",
      reason: "Lower gas fees and stable returns",
      amount: 15000,
      gasUsed: 0.12
    }
  ]
};

export const mockLoopingHistory = [
  {
    id: "loop-001",
    timestamp: "2025-01-16T10:30:00Z",
    fromChain: "Stacks",
    toChain: "Base", 
    amount: 10000,
    fromApy: 8.2,
    toApy: 15.8,
    txHash: "0xabc123...def456",
    status: "completed"
  },
  {
    id: "loop-002",
    timestamp: "2025-01-15T14:22:00Z", 
    fromChain: "Ethereum",
    toChain: "Stacks",
    amount: 15000,
    fromApy: 3.8,
    toApy: 8.2,
    txHash: "0x789ghi...jkl012", 
    status: "completed"
  },
  {
    id: "loop-003",
    timestamp: "2025-01-14T08:45:00Z",
    fromChain: "Solana", 
    toChain: "Ethereum",
    amount: 8000,
    fromApy: 7.1,
    toApy: 3.8,
    txHash: "0xmno345...pqr678",
    status: "completed"
  }
];