"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { useWallet } from "@/components/wallet/wallet-context";
import { 
  depositSTX, 
  withdrawSTX, 
  getUserBalance, 
  getExchangeRate, 
  previewDeposit, 
  previewWithdraw,
  validateDepositAmount,
  handleContractError,
  VaultBalance
} from "@/lib/vault-service";
import { MICROSTX_IN_STX } from "@/lib/stacks-config";

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
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [userBalance, setUserBalance] = useState<VaultBalance | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [previewAmount, setPreviewAmount] = useState<number>(0);
  
  const { isConnected, address } = useWallet();

  useEffect(() => {
    const loadVaultData = async () => {
      if (!isConnected || !address) return;
      
      try {
        const [balance, rate] = await Promise.all([
          getUserBalance(address),
          getExchangeRate()
        ]);
        setUserBalance(balance);
        setExchangeRate(rate / MICROSTX_IN_STX);
      } catch (error) {
        console.error('Failed to load vault data:', error);
      }
    };

    loadVaultData();
  }, [isConnected, address]);

  useEffect(() => {
    const calculatePreview = async () => {
      if (!amount || parseFloat(amount) <= 0) {
        setPreviewAmount(0);
        return;
      }

      try {
        const amountInMicroSTX = parseFloat(amount) * MICROSTX_IN_STX;
        
        if (activeTab === 'deposit') {
          const shares = await previewDeposit(amountInMicroSTX);
          setPreviewAmount(shares / MICROSTX_IN_STX);
        } else {
          const stxAmount = await previewWithdraw(amountInMicroSTX);
          setPreviewAmount(stxAmount / MICROSTX_IN_STX);
        }
      } catch (error) {
        console.error('Failed to preview:', error);
        setPreviewAmount(0);
      }
    };

    const debounce = setTimeout(calculatePreview, 500);
    return () => clearTimeout(debounce);
  }, [amount, activeTab]);

  const handleMaxClick = () => {
    if (activeTab === 'deposit') {
      // For deposit, we'd need to get STX balance from wallet
      // For now, set a placeholder
      setAmount('1');
    } else {
      // For withdraw, use ySTX balance
      if (userBalance?.shares) {
        setAmount((userBalance.shares / MICROSTX_IN_STX).toString());
      }
    }
  };

  const handleTransaction = async () => {
    if (!isConnected || !address) {
      setTxStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setTxStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    setIsLoading(true);
    setTxStatus({ type: null, message: '' });

    try {
      let txId: string;
      
      if (activeTab === 'deposit') {
        const amountInMicroSTX = validateDepositAmount(amount);
        txId = await depositSTX(amountInMicroSTX);
        setTxStatus({ 
          type: 'success', 
          message: `Deposit transaction submitted! TX ID: ${txId}` 
        });
      } else {
        const sharesAmount = parseFloat(amount) * MICROSTX_IN_STX;
        txId = await withdrawSTX(sharesAmount);
        setTxStatus({ 
          type: 'success', 
          message: `Withdraw transaction submitted! TX ID: ${txId}` 
        });
      }
      
      setAmount('');
      
      // Refresh user balance after transaction
      setTimeout(async () => {
        try {
          const balance = await getUserBalance(address);
          setUserBalance(balance);
        } catch (error) {
          console.error('Failed to refresh balance:', error);
        }
      }, 3000);
      
    } catch (error: any) {
      const errorMessage = handleContractError(error);
      setTxStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

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
                {!isConnected && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please connect your Stacks wallet to interact with the vault.
                    </AlertDescription>
                  </Alert>
                )}

                {txStatus.type && (
                  <Alert className={`mb-4 ${txStatus.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    {txStatus.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                    <AlertDescription className={txStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                      {txStatus.message}
                    </AlertDescription>
                  </Alert>
                )}

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
                      disabled={!isConnected}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMaxClick}
                      disabled={!isConnected}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                    >
                      Max
                    </Button>
                  </div>
                  {userBalance && activeTab === 'withdraw' && (
                    <div className="text-xs text-slate-500">
                      Available: {(userBalance.shares / MICROSTX_IN_STX).toFixed(6)} ySTX
                    </div>
                  )}
                </div>

                {activeTab === "deposit" && (
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">You will receive</span>
                      <span className="font-normal text-slate-900">{previewAmount.toFixed(6)} ySTX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Exchange rate</span>
                      <span className="font-normal text-slate-900">1 STX = {exchangeRate.toFixed(6)} ySTX</span>
                    </div>
                  </div>
                )}

                {activeTab === "withdraw" && (
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">ySTX to burn</span>
                      <span className="font-normal text-slate-900">{amount || "0"} ySTX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">STX you'll receive</span>
                      <span className="font-normal text-slate-900">{previewAmount.toFixed(6)} STX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Exchange rate</span>
                      <span className="font-normal text-slate-900">1 ySTX = {(1/exchangeRate).toFixed(6)} STX</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleTransaction}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-normal py-3"
                  disabled={!isConnected || !amount || parseFloat(amount) <= 0 || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    activeTab === "deposit" ? "Deposit STX" : "Withdraw STX"
                  )}
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