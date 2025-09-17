"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, Activity, Bell, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockDashboard } from "@/lib/mock-data";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { STXBalanceRow } from "@/components/dashboard/stx-balance-row";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { useWallet } from "@/components/wallet/wallet-context";
import { usePortfolio } from "@/hooks/use-portfolio";
import Image from "next/image";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export default function DashboardPage() {
  const { tvl, currentYield, activeChains, lastLooping } = mockDashboard;
  const { isConnected } = useWallet();
  const { totalValue, stxBalance, stxPrice, loading: portfolioLoading } = usePortfolio();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="p-6 lg:p-8 space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center pb-6 border-b border-slate-200"
        >
          <h1 className="text-3xl font-sora font-semibold text-slate-900">Dashboard</h1>
          <ConnectWalletButton />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-sora font-normal text-slate-600">Total Portofolio Value</h1>
            <Info className="h-4 w-4 text-slate-500" />
          </div>
          
          <div className="space-y-2">
            {portfolioLoading ? (
              <div className="animate-pulse">
                <div className="text-6xl font-sora font-light text-slate-300">
                  Loading...
                </div>
                <div className="text-slate-400 text-sm">
                  Fetching portfolio data
                </div>
              </div>
            ) : isConnected ? (
              <div>
                <div className="text-6xl font-sora font-light">
                  {formatCurrency(totalValue)}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <span>{stxBalance.toFixed(2)} STX</span>
                  <Image 
                    src="/Images/Logo/stacks-stx-logo.png" 
                    alt="STX" 
                    width={16} 
                    height={16}
                    className="ml-2"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="text-6xl font-sora font-light text-slate-400">
                  {formatCurrency(0)}
                </div>
                <div className="text-slate-500 text-sm">
                  Connect wallet to view portfolio
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200">
              1D
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              1W
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              1M
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              ALL
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-64"
        >
          <PortfolioChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="space-y-2 py-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-600 text-sm">Balance STX</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-900 font-normal">
                      {isConnected ? `${stxBalance.toFixed(2)} STX` : '0 STX'}
                    </span>
                    <Image 
                      src="/Images/Logo/stacks-stx-logo.png" 
                      alt="STX" 
                      className="w-4 h-4"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
                <div className="text-slate-500 text-sm">
                  {isConnected ? `≈ ${formatCurrency(totalValue)}` : 'Connect wallet to view balance'}
                </div>
              </div>
            </CardContent>
          </Card> */}

          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-slate-600 text-sm font-medium">Active Vault</h3>
                    <div className="text-slate-400 text-xs mt-1">Currently no active vaults</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-900 font-normal text-sm">0 STX</div>
                    <div className="text-slate-400 text-xs">≈ $0.00</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">APY</span>
                    <span className="text-slate-400">--</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-sora font-normal">Balances</h2>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <input type="checkbox" className="rounded bg-slate-100 border-slate-300" />
            <label className="text-slate-600 text-sm">Hide small balances</label>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-slate-200 text-slate-600 text-sm">
              <div>Asset</div>
              <div>Balance</div>
              <div>Today's Return</div>
              <div>Price</div>
              <div>24h Volume</div>
              <div>Actions</div>
            </div>
            
            {isConnected ? (
              <STXBalanceRow />
            ) : (
              <div className="p-8 text-center text-slate-500">
                Connect your wallet to view balances
              </div>
            )}
            
            {isConnected && (
              <div className="p-4 text-center text-slate-400 text-sm border-t border-slate-200">
                Additional assets will appear here when available
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}