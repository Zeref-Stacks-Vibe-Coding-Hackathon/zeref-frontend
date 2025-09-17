import { AppConfig, connect, authenticate, UserSession, getStxAddress } from '@stacks/connect';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const connectOptions = {
  userSession,
  appDetails: {
    name: 'Zeref',
    icon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '/favicon.ico',
  },
  redirectTo: typeof window !== 'undefined' ? window.location.origin : '/',
  manifestPath: typeof window !== 'undefined' ? `${window.location.origin}/manifest.json` : '/manifest.json',
  onFinish: (authData: any) => {
    // Dispatch event immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wallet-connected'));
    }
  },
  onCancel: () => {
    // Auth canceled by user
  },
};

export const network = process.env.NODE_ENV === 'production' 
  ? STACKS_MAINNET 
  : STACKS_TESTNET;

export function connectWallet() {
  try {
    authenticate(connectOptions);
  } catch (error) {
    // Fallback to connect if authenticate fails
    try {
      connect(connectOptions);
    } catch (fallbackError) {
      // Both connection methods failed
    }
  }
}

export function disconnectWallet() {
  userSession.signUserOut();
  setTimeout(() => {
    window.dispatchEvent(new Event('wallet-disconnected'));
  }, 100);
}

export function isUserSignedIn(): boolean {
  const signedIn = userSession.isUserSignedIn();
  
  // Also check localStorage directly for debugging
  const sessionKey = 'blockstack-session';
  const localStorageData = localStorage.getItem(sessionKey);
  
  // Check if there's user data available
  if (signedIn) {
    try {
      const userData = userSession.loadUserData();
    } catch (error) {
      // Error loading user data
    }
  }
  
  return signedIn;
}

export function getUserData() {
  return userSession.loadUserData();
}

export async function getAddressAsync(): Promise<string | null> {
  try {
    if (isUserSignedIn()) {
      // Try using the newer getStxAddress function
      const address = await getStxAddress({ userSession });
      if (address) return address;
    }
  } catch (error) {
    // getStxAddress failed
  }
  
  return getAddress();
}

export function getAddress(): string | null {
  if (isUserSignedIn()) {
    const userData = getUserData();
    
    // Try different possible address locations based on Leather wallet structure
    let address = null;
    
    // Common locations for Stacks addresses
    if (userData.profile?.stxAddress?.mainnet) {
      address = userData.profile.stxAddress.mainnet;
    } else if (userData.profile?.stxAddress?.testnet) {
      address = userData.profile.stxAddress.testnet;
    } else if (userData.stxAddress?.mainnet) {
      address = userData.stxAddress.mainnet;
    } else if (userData.stxAddress?.testnet) {
      address = userData.stxAddress.testnet;
    } else if (userData.addresses?.mainnet) {
      address = userData.addresses.mainnet;
    } else if (userData.addresses?.testnet) {
      address = userData.addresses.testnet;
    } else if (userData.identityAddress) {
      address = userData.identityAddress;
    } else if (userData.profile?.stxAddress) {
      // If stxAddress is a string directly
      address = userData.profile.stxAddress;
    } else if (userData.stxAddress) {
      // If stxAddress is a string directly
      address = userData.stxAddress;
    }
    
    return address;
  }
  return null;
}