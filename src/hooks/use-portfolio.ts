"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@/components/wallet/wallet-context';
import { fetchSTXBalance, fetchSTXPrice } from '@/lib/stx-balance';

interface PortfolioData {
  totalValue: number;
  stxBalance: number;
  stxPrice: number;
  loading: boolean;
  error: string | null;
}

export function usePortfolio(): PortfolioData {
  const { isConnected, address } = useWallet();
  const [totalValue, setTotalValue] = useState(0);
  const [stxBalance, setStxBalance] = useState(0);
  const [stxPrice, setStxPrice] = useState(0.65); // Initialize with fallback price
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      loadPortfolioData();
    } else {
      // Reset values when wallet disconnected but keep fallback price
      setTotalValue(0);
      setStxBalance(0);
      setStxPrice(0.65);
      setLoading(false);
      setError(null);
    }
  }, [isConnected, address]);

  const loadPortfolioData = async () => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    
    // Set fallback price immediately to prevent 0.00 display
    setStxPrice(0.65);
    
    try {
      // Try to fetch balance first
      let balance = 0;
      let price = 0.65; // Default fallback
      
      // Fetch balance
      try {
        const balanceData = await fetchSTXBalance(address);
        balance = balanceData ? parseFloat(balanceData.balance) : 0;
      } catch (balanceError) {
        // Balance fetch failed, but continue with price fetch
        balance = 0;
      }
      
      // Fetch price separately with strong fallback
      try {
        const priceData = await fetchSTXPrice();
        price = (priceData && priceData > 0) ? priceData : 0.65;
      } catch (priceError) {
        // Price fetch failed, use fallback
        price = 0.65;
      }
      
      const value = balance * price;
      
      setStxBalance(balance);
      setStxPrice(price);
      setTotalValue(value);
      
    } catch (err) {
      setError('Failed to load portfolio data');
      // On complete failure, try to fetch balance separately but keep fallback price
      try {
        const balanceData = await fetchSTXBalance(address);
        const balance = balanceData ? parseFloat(balanceData.balance) : 0;
        setStxBalance(balance);
        setStxPrice(0.65);
        setTotalValue(balance * 0.65);
      } catch (fallbackError) {
        // Complete failure - reset but keep fallback price
        setStxBalance(0);
        setStxPrice(0.65);
        setTotalValue(0);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    totalValue,
    stxBalance,
    stxPrice,
    loading,
    error
  };
}