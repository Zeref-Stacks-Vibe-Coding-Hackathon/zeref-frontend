"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const availableVaults = [
  {
    name: "Aave",
    logo: "/Images/Logo/aave-logo.png",
    apy: 15.8,
    chain: "Base",
    tvl: "$2.1B",
    risk: "Low",
    featured: true
  },
  {
    name: "Ethereal",
    logo: "/Images/Logo/ethereal-logo.jpg",
    apy: 16.1,
    chain: "Ethereum",
    tvl: "$320M",
    risk: "Medium",
    featured: true
  },
  {
    name: "Moonwell",
    logo: "/Images/Logo/moonwell-logo.png",
    apy: 14.2,
    chain: "Base",
    tvl: "$185M",
    risk: "Low",
    featured: false
  },
  {
    name: "Pendle",
    logo: "/Images/Logo/pendle-logo.jpg",
    apy: 13.7,
    chain: "Arbitrum",
    tvl: "$1.8B",
    risk: "Medium",
    featured: false
  },
  {
    name: "HyperFi",
    logo: "/Images/Logo/hypurfi-logo.png",
    apy: 12.4,
    chain: "Hyperliquid",
    tvl: "$95M",
    risk: "High",
    featured: false
  }
];

export default function EarnPage() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [selectedVault, setSelectedVault] = useState(availableVaults[0]);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center pb-6 border-b border-slate-200"
      >
        <div>
          <h1 className="text-3xl font-sora font-semibold text-slate-900">Earn</h1>
          <p className="text-slate-600 font-normal mt-2">
            Deposit STX to mint ySTX and start earning optimized yields
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-slate-200 py-6">
              <CardHeader>
                <div className="flex space-x-1 mb-4">
                  <button
                    onClick={() => setActiveTab("deposit")}
                    className={`px-4 py-2 text-sm font-normal rounded-md transition-colors ${
                      activeTab === "deposit"
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Deposit
                  </button>
                  <button
                    onClick={() => setActiveTab("withdraw")}
                    className={`px-4 py-2 text-sm font-normal rounded-md transition-colors ${
                      activeTab === "withdraw"
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Withdraw
                  </button>
                </div>
                
                <CardTitle className="text-lg font-sora font-normal">
                  {activeTab === "deposit" ? "Deposit STX" : "Withdraw STX + Yield"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "deposit"
                    ? "Deposit STX tokens to mint ySTX and start earning yields"
                    : "Withdraw your STX along with accumulated yields"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-normal text-slate-700">
                    Amount ({activeTab === "deposit" ? "STX" : "ySTX"})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none font-normal"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                    >
                      Max
                    </Button>
                  </div>
                </div>

                {activeTab === "deposit" && (
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">You will receive</span>
                      <span className="font-normal text-slate-900">{amount || "0"} ySTX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Exchange rate</span>
                      <span className="font-normal text-slate-900">1 STX = 1 ySTX</span>
                    </div>
                  </div>
                )}

                {activeTab === "withdraw" && (
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">STX amount</span>
                      <span className="font-normal text-slate-900">{amount || "0"} STX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Yield earned</span>
                      <span className="font-normal text-green-600">+{((parseFloat(amount) || 0) * 0.125).toFixed(2)} STX</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-slate-200 pt-2">
                      <span className="text-slate-600">Total receive</span>
                      <span className="font-normal text-slate-900">{((parseFloat(amount) || 0) * 1.125).toFixed(2)} STX</span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-normal py-3"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  {activeTab === "deposit" ? "Deposit STX" : "Withdraw STX"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image 
                        src={selectedVault.logo} 
                        alt={selectedVault.name} 
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-slate-900 font-normal">Selected Vault</h3>
                        <div className="text-slate-500 text-sm">{selectedVault.name}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">APY</span>
                      <span className="font-normal text-green-600">{selectedVault.apy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Chain</span>
                      <span className="font-normal text-slate-900">{selectedVault.chain}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">TVL</span>
                      <span className="font-normal text-slate-900">{selectedVault.tvl}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-slate-200 py-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-sora font-normal flex items-center">
                  <Star className="h-4 w-4 mr-2 text-slate-400" />
                  Available Vaults
                </CardTitle>
                <CardDescription className="text-sm">
                  Choose your preferred vault protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableVaults.map((vault) => (
                  <div
                    key={vault.name}
                    onClick={() => setSelectedVault(vault)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedVault.name === vault.name
                        ? 'border-slate-400 bg-slate-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image 
                          src={vault.logo} 
                          alt={vault.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-normal text-slate-900">{vault.name}</span>
                            {vault.featured && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-1 py-0">
                                Best
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">{vault.chain}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-normal text-green-600">{vault.apy}%</div>
                        <div className="text-xs text-slate-500">APY</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}