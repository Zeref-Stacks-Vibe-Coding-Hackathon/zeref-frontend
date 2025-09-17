import { 
  fetchCallReadOnlyFunction,
  AnchorMode,
  PostConditionMode,
  uintCV,
  standardPrincipalCV,
  cvToJSON,
  noneCV,
  Pc
} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { network, CONTRACT_ADDRESSES, DEFAULT_TX_FEE, MICROSTX_IN_STX } from './stacks-config';
import { userSession } from './wallet';

export interface VaultBalance {
  shares: number;
  'est-amount': number;
}

export interface VaultStats {
  exchangeRate: number;
  totalUnderlying: number;
  totalShares: number;
}

export const validateDepositAmount = (amount: string): number => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    throw new Error('Invalid amount');
  }
  
  if (numAmount < 0.000001) {
    throw new Error('Amount too small');
  }
  
  if (numAmount > 1000000) {
    throw new Error('Amount too large');
  }
  
  return Math.floor(numAmount * MICROSTX_IN_STX);
};

export const handleContractError = (error: any): string => {
  const message = error.message || error.toString();
  
  if (message.includes('u100') || message.includes('(err u100)')) {
    return '⚠️ Vault is currently paused. Please try again later or contact support.';
  } else if (message.includes('u101') || message.includes('(err u101)')) {
    return 'Insufficient funds in vault';
  } else if (message.includes('u102') || message.includes('(err u102)')) {
    return 'Invalid shares amount';
  } else if (message.includes('u103') || message.includes('(err u103)')) {
    return 'Not authorized keeper';
  } else if (message.includes('u104') || message.includes('(err u104)')) {
    return 'Not authorized admin';
  } else if (message.includes('u105') || message.includes('(err u105)')) {
    return 'TVL cap exceeded - vault has reached maximum capacity';
  } else if (message.includes('u106') || message.includes('(err u106)')) {
    return 'Strategy not allowed';
  } else if (message.includes('u109') || message.includes('(err u109)')) {
    return 'Amount cannot be zero';
  } else if (message.includes('u110') || message.includes('(err u110)')) {
    return 'Shares cannot be zero';
  }
  
  return 'Transaction failed: ' + message;
};

export const depositSTX = async (amount: number): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  // Validate amount
  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  console.log('Deposit params:', {
    amount,
    contractAddress: CONTRACT_ADDRESSES.VAULT,
    contractName: CONTRACT_ADDRESSES.VAULT_NAME,
    network: network
  });

  return new Promise((resolve, reject) => {
    openContractCall({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'deposit',
      functionArgs: [uintCV(amount)],
      network,
      postConditionMode: PostConditionMode.Allow,
      appDetails: {
        name: 'Zeref Vault',
        icon: window.location.origin + '/favicon.ico'
      },
      onFinish: (data) => {
        console.log('Deposit transaction successful:', data);
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const withdrawSTX = async (shares: number): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  // Validate shares
  if (shares <= 0) {
    throw new Error('Shares must be greater than 0');
  }

  console.log('Withdraw params:', {
    shares,
    contractAddress: CONTRACT_ADDRESSES.VAULT,
    contractName: CONTRACT_ADDRESSES.VAULT_NAME,
    network: network
  });

  return new Promise((resolve, reject) => {
    openContractCall({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'withdraw',
      functionArgs: [uintCV(shares)],
      network,
      postConditionMode: PostConditionMode.Allow,
      appDetails: {
        name: 'Zeref Vault',
        icon: window.location.origin + '/favicon.ico'
      },
      onFinish: (data) => {
        console.log('Withdraw transaction successful:', data);
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const getUserBalance = async (userAddress: string): Promise<VaultBalance> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'get-user-balance',
      functionArgs: [standardPrincipalCV(userAddress)],
      senderAddress: userAddress,
      network
    });

    const balance = cvToJSON(result);
    return balance.value as VaultBalance;
  } catch (error) {
    throw new Error('Failed to fetch user balance');
  }
};

export const getExchangeRate = async (): Promise<number> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'get-exchange-rate',
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESSES.VAULT,
      network
    });

    return cvToJSON(result).value;
  } catch (error) {
    throw new Error('Failed to fetch exchange rate');
  }
};

export const getTotalUnderlying = async (): Promise<number> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'get-total-underlying',
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESSES.VAULT,
      network
    });

    return cvToJSON(result).value;
  } catch (error) {
    throw new Error('Failed to fetch total underlying');
  }
};

export const getTotalShares = async (): Promise<number> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'get-total-shares',
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESSES.VAULT,
      network
    });

    return cvToJSON(result).value;
  } catch (error) {
    throw new Error('Failed to fetch total shares');
  }
};

export const previewDeposit = async (amount: number): Promise<number> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'preview-deposit',
      functionArgs: [uintCV(amount)],
      senderAddress: CONTRACT_ADDRESSES.VAULT,
      network
    });

    return cvToJSON(result).value;
  } catch (error) {
    throw new Error('Failed to preview deposit');
  }
};

export const previewWithdraw = async (shares: number): Promise<number> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.VAULT,
      contractName: CONTRACT_ADDRESSES.VAULT_NAME,
      functionName: 'preview-withdraw',
      functionArgs: [uintCV(shares)],
      senderAddress: CONTRACT_ADDRESSES.VAULT,
      network
    });

    return cvToJSON(result).value;
  } catch (error) {
    throw new Error('Failed to preview withdraw');
  }
};

export const getYSTXBalance = async (userAddress: string): Promise<number> => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESSES.YSTX_TOKEN,
      contractName: CONTRACT_ADDRESSES.YSTX_TOKEN_NAME,
      functionName: 'get-balance',
      functionArgs: [standardPrincipalCV(userAddress)],
      senderAddress: userAddress,
      network
    });

    return cvToJSON(result).value;
  } catch (error) {
    throw new Error('Failed to fetch ySTX balance');
  }
};

export const transferYSTX = async (amount: number, recipient: string): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  const userData = userSession.loadUserData();
  const userAddress = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress;
  
  if (!userAddress) {
    throw new Error('No STX address found');
  }

  return new Promise((resolve, reject) => {
    openContractCall({
      contractAddress: CONTRACT_ADDRESSES.YSTX_TOKEN,
      contractName: CONTRACT_ADDRESSES.YSTX_TOKEN_NAME,
      functionName: 'transfer',
      functionArgs: [
        uintCV(amount),
        standardPrincipalCV(userAddress),
        standardPrincipalCV(recipient),
        noneCV()
      ],
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

export const checkVaultStatus = async (): Promise<{ isPaused: boolean; canDeposit: boolean }> => {
  try {
    // Try to call a simple read function to check if vault is accessible
    await getExchangeRate();
    
    // If we can read exchange rate, vault is not paused
    return { isPaused: false, canDeposit: true };
  } catch (error: any) {
    const message = error.message || error.toString();
    
    if (message.includes('u100') || message.includes('ERR_PAUSED')) {
      return { isPaused: true, canDeposit: false };
    }
    
    // Other errors might still allow deposits
    return { isPaused: false, canDeposit: true };
  }
};

export const getVaultStats = async (): Promise<VaultStats> => {
  try {
    const [exchangeRate, totalUnderlying, totalShares] = await Promise.all([
      getExchangeRate(),
      getTotalUnderlying(),
      getTotalShares()
    ]);

    return {
      exchangeRate,
      totalUnderlying,
      totalShares
    };
  } catch (error) {
    throw new Error('Failed to fetch vault stats');
  }
};