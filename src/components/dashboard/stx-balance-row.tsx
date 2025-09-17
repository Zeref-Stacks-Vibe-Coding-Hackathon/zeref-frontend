"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@/components/wallet/wallet-context';
import { fetchSTXBalance, fetchSTXPrice, STXBalance } from '@/lib/stx-balance';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function STXBalanceRow() {
  const { isConnected, address } = useWallet();
  const [balance, setBalance] = useState<STXBalance | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadBalance();
    }
  }, [isConnected, address]);

  const loadBalance = async () => {
    if (!address) {
      return;
    }
    
    setLoading(true);
    // Set fallback price immediately
    setPrice(0.65);
    
    try {
      let balanceData = null;
      let priceData = 0.65; // Default fallback
      
      // Fetch balance
      try {
        balanceData = await fetchSTXBalance(address);
      } catch (balanceError) {
        // Balance fetch failed
      }
      
      // Fetch price separately
      try {
        const fetchedPrice = await fetchSTXPrice();
        priceData = (fetchedPrice && fetchedPrice > 0) ? fetchedPrice : 0.65;
      } catch (priceError) {
        // Price fetch failed, use fallback
        priceData = 0.65;
      }
      
      setBalance(balanceData);
      setPrice(priceData);
    } catch (error) {
      // Complete failure - try balance only
      try {
        const balanceData = await fetchSTXBalance(address);
        setBalance(balanceData);
        setPrice(0.65);
      } catch (fallbackError) {
        // Keep fallback price even on complete failure
        setPrice(0.65);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected || !address) {
    return null;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-6 gap-4 p-4 border-b border-slate-200 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          <div>
            <div className="w-12 h-4 bg-slate-200 rounded"></div>
            <div className="w-16 h-3 bg-slate-200 rounded mt-1"></div>
          </div>
        </div>
        <div className="w-20 h-4 bg-slate-200 rounded"></div>
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
        <div className="w-20 h-4 bg-slate-200 rounded"></div>
        <div className="w-16 h-4 bg-slate-200 rounded"></div>
      </div>
    );
  }

  if (!balance) {
    return (
      <div className="grid grid-cols-6 gap-4 p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <Image 
            src="/Images/Logo/stacks-stx-logo.png" 
            alt="STX" 
            width={32} 
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-medium text-slate-900">STX</div>
            <div className="text-sm text-slate-500">Stacks</div>
          </div>
        </div>
        <div className="text-slate-500">
          <div className="font-medium">0.000000 STX</div>
          <div className="text-xs">Unable to fetch balance</div>
        </div>
        <div className="text-slate-500">-</div>
        <div className="text-slate-500">-</div>
        <div className="text-slate-500">-</div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={loadBalance}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const balanceValue = parseFloat(balance.balance);
  const usdValue = balanceValue * price;
  const todayReturn = 0; // Mock data - you can implement real price change calculation

  return (
    <div className="grid grid-cols-6 gap-4 p-4 border-b border-slate-200 hover:bg-slate-50">
      <div className="flex items-center space-x-3">
        <Image 
          src="/Images/Logo/stacks-stx-logo.png" 
          alt="STX" 
          width={32} 
          height={32}
          className="rounded-full"
        />
        <div>
          <div className="font-medium text-slate-900">STX</div>
          <div className="text-sm text-slate-500">Stacks</div>
        </div>
      </div>
      
      <div>
        <div className="font-medium text-slate-900">
          {balanceValue.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 6 
          })} STX
        </div>
        <div className="text-sm text-slate-500">
          ${usdValue.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
      </div>
      
      <div className="flex items-center">
        {todayReturn >= 0 ? (
          <div className="flex items-center text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>+{todayReturn.toFixed(2)}%</span>
          </div>
        ) : (
          <div className="flex items-center text-red-600">
            <TrendingDown size={16} className="mr-1" />
            <span>{todayReturn.toFixed(2)}%</span>
          </div>
        )}
      </div>
      
      <div className="text-slate-900">
        ${price.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 4 
        })}
      </div>
      
      <div className="text-slate-500">
        ${(balanceValue * price * 0.1).toLocaleString('en-US', { 
          minimumFractionDigits: 0, 
          maximumFractionDigits: 0 
        })}
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-xs">
          Send
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          Receive
        </Button>
      </div>
    </div>
  );
}