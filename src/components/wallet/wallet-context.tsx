"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isUserSignedIn, getUserData, getAddress, getAddressAsync } from '@/lib/wallet';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  userData: any;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check for authentication response first
        const urlParams = new URLSearchParams(window.location.search);
        const authResponse = urlParams.get('authResponse');
        console.log('Auth response in URL:', authResponse);
        
        if (authResponse) {
          console.log('Processing auth response...');
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        const connected = isUserSignedIn();
        console.log('Wallet connected:', connected);
        setIsConnected(connected);
        
        if (connected) {
          const data = getUserData();
          console.log('User data:', data);
          
          // Try async address first, then fallback to sync
          let walletAddress = await getAddressAsync();
          if (!walletAddress) {
            walletAddress = getAddress();
          }
          
          console.log('Final wallet address:', walletAddress);
          setUserData(data);
          setAddress(walletAddress);
        } else {
          setUserData(null);
          setAddress(null);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
        setIsConnected(false);
        setUserData(null);
        setAddress(null);
      }
      
      setLoading(false);
    };

    checkWalletConnection();

    // Listen for storage changes to detect wallet connections
    const handleStorageChange = () => {
      console.log('Storage changed, rechecking wallet...');
      checkWalletConnection();
    };

    // Listen for custom wallet events
    const handleWalletConnected = () => {
      console.log('Wallet connected event received');
      checkWalletConnection();
    };

    const handleWalletDisconnected = () => {
      console.log('Wallet disconnected event received');
      checkWalletConnection();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wallet-connected', handleWalletConnected);
    window.addEventListener('wallet-disconnected', handleWalletDisconnected);
    
    // Also check periodically in case of same-tab changes
    const interval = setInterval(checkWalletConnection, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wallet-connected', handleWalletConnected);
      window.removeEventListener('wallet-disconnected', handleWalletDisconnected);
      clearInterval(interval);
    };
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, address, userData, loading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}