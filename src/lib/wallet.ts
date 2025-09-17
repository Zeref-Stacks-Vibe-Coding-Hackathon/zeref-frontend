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
    console.log('Auth finished with data:', authData);
    // Dispatch event immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wallet-connected'));
    }
  },
  onCancel: () => {
    console.log('Auth canceled by user');
  },
};

export const network = process.env.NODE_ENV === 'production' 
  ? STACKS_MAINNET 
  : STACKS_TESTNET;

export function connectWallet() {
  try {
    console.log('Attempting to connect wallet...');
    authenticate(connectOptions);
  } catch (error) {
    console.error('Error connecting wallet:', error);
    // Fallback to connect if authenticate fails
    try {
      connect(connectOptions);
    } catch (fallbackError) {
      console.error('Fallback connect also failed:', fallbackError);
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
  console.log('UserSession.isUserSignedIn():', signedIn);
  
  // Also check localStorage directly for debugging
  const sessionKey = 'blockstack-session';
  const localStorageData = localStorage.getItem(sessionKey);
  console.log('LocalStorage session data:', localStorageData);
  
  // Check if there's user data available
  if (signedIn) {
    try {
      const userData = userSession.loadUserData();
      console.log('UserData available:', !!userData);
    } catch (error) {
      console.log('Error loading user data:', error);
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
      console.log('Address from getStxAddress:', address);
      if (address) return address;
    }
  } catch (error) {
    console.log('getStxAddress failed:', error);
  }
  
  return getAddress();
}

export function getAddress(): string | null {
  if (isUserSignedIn()) {
    const userData = getUserData();
    console.log('Full userData structure:', JSON.stringify(userData, null, 2));
    
    // Try different possible address locations based on Leather wallet structure
    let address = null;
    
    // Common locations for Stacks addresses
    if (userData.profile?.stxAddress?.mainnet) {
      address = userData.profile.stxAddress.mainnet;
      console.log('Found address in profile.stxAddress.mainnet:', address);
    } else if (userData.profile?.stxAddress?.testnet) {
      address = userData.profile.stxAddress.testnet;
      console.log('Found address in profile.stxAddress.testnet:', address);
    } else if (userData.stxAddress?.mainnet) {
      address = userData.stxAddress.mainnet;
      console.log('Found address in stxAddress.mainnet:', address);
    } else if (userData.stxAddress?.testnet) {
      address = userData.stxAddress.testnet;
      console.log('Found address in stxAddress.testnet:', address);
    } else if (userData.addresses?.mainnet) {
      address = userData.addresses.mainnet;
      console.log('Found address in addresses.mainnet:', address);
    } else if (userData.addresses?.testnet) {
      address = userData.addresses.testnet;
      console.log('Found address in addresses.testnet:', address);
    } else if (userData.identityAddress) {
      address = userData.identityAddress;
      console.log('Found address in identityAddress:', address);
    } else if (userData.profile?.stxAddress) {
      // If stxAddress is a string directly
      address = userData.profile.stxAddress;
      console.log('Found address in profile.stxAddress (direct):', address);
    } else if (userData.stxAddress) {
      // If stxAddress is a string directly
      address = userData.stxAddress;
      console.log('Found address in stxAddress (direct):', address);
    }
    
    // Log all possible paths for debugging
    console.log('Address search results:', {
      'profile.stxAddress.mainnet': userData.profile?.stxAddress?.mainnet,
      'profile.stxAddress.testnet': userData.profile?.stxAddress?.testnet,
      'stxAddress.mainnet': userData.stxAddress?.mainnet,
      'stxAddress.testnet': userData.stxAddress?.testnet,
      'addresses.mainnet': userData.addresses?.mainnet,
      'addresses.testnet': userData.addresses?.testnet,
      'identityAddress': userData.identityAddress,
      'profile.stxAddress': userData.profile?.stxAddress,
      'stxAddress': userData.stxAddress,
      finalAddress: address
    });
    
    return address;
  }
  return null;
}