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
  const [stxPrice, setStxPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      loadPortfolioData();
    } else {
      // Reset values when wallet disconnected
      setTotalValue(0);
      setStxBalance(0);
      setStxPrice(0);
      setLoading(false);
      setError(null);
    }
  }, [isConnected, address]);

  const loadPortfolioData = async () => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading portfolio data for address:', address);
      
      const [balanceData, priceData] = await Promise.all([
        fetchSTXBalance(address),
        fetchSTXPrice()
      ]);
      
      console.log('Portfolio balance data:', balanceData);
      console.log('Portfolio price data:', priceData);
      
      const balance = balanceData ? parseFloat(balanceData.balance) : 0;
      const price = priceData && priceData > 0 ? priceData : 0.65; // Use fallback price if API fails
      const value = balance * price;
      
      setStxBalance(balance);
      setStxPrice(price);
      setTotalValue(value);
      
      console.log('Portfolio calculated:', { balance, price, value });
      
    } catch (err) {
      console.error('Error loading portfolio data:', err);
      setError('Failed to load portfolio data');
      // Still try to show fallback price even on error
      setStxPrice(0.65);
      setStxBalance(0);
      setTotalValue(0);
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