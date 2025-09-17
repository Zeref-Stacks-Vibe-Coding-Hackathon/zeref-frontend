"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, Activity, Bell, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockDashboard } from "@/lib/mock-data";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { WalletStatus } from "@/components/wallet/wallet-status";
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

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="p-6 lg:p-8 space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-sora font-semibold">Dashboard</h1>
          <ConnectWalletButton />
        </motion.div>

        <WalletStatus />

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
            <div className="text-6xl font-sora font-light">
              {formatCurrency(1000)}<span className="text-4xl">.00</span>
            </div>
            <div className="text-slate-500 text-sm">
              — $1000 (0.00%) Today
            </div>
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
          className="h-48 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center relative"
        >
          <div className="absolute bottom-3 right-4 text-slate-500 text-sm">$0.00</div>
          <div className="w-full h-0.5 bg-blue-600 absolute bottom-8 left-0"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="space-y-2 py-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-600 text-sm">Balance ySTX</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-900 font-normal">0 ySTX</span>
                    <Image 
                      src="/Images/Logo/stacks-stx-logo.png" 
                      alt="STX" 
                      className="w-4 h-4"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
                <div className="text-slate-500 text-sm">Yield-bearing STX</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/Images/Logo/ethereal-logo.jpg" 
                      alt="Ethereal Vault" 
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <h3 className="text-slate-600 text-sm">Active Vault</h3>
                      <div className="text-slate-500 text-xs">Ethereal Staking</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-900 font-normal">2,500 STX</span>
                    <img 
                      src="/Images/Logo/stacks-stx-logo.png" 
                      alt="STX" 
                      className="w-4 h-4"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">APY</span>
                    <span className="text-slate-900">15.8%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Chain</span>
                    <span className="text-slate-900">Ethereum L2</span>
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
            <div className="p-8 text-center text-slate-500">
              No spot assets found
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}