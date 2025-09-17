import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { network } from './stacks-config';
import { userSession } from './wallet';

// Test dengan known working testnet contract
export const testSimpleContract = async (): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  console.log('Testing with known working contract...');

  return new Promise((resolve, reject) => {
    // Test dengan contract yang simple dan known working
    openContractCall({
      contractAddress: 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
      contractName: 'hello-world',
      functionName: 'say-hi', 
      functionArgs: [],
      network,
      postConditionMode: 'allow',
      appDetails: {
        name: 'Zeref Simple Test',
        icon: window.location.origin + '/favicon.ico'
      },
      onFinish: (data) => {
        console.log('Simple contract test successful:', data);
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

// Test with a much simpler approach - minimal deposit
export const testMinimalDeposit = async (): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  console.log('Testing minimal deposit...');

  return new Promise((resolve, reject) => {
    // Simplest possible deposit call
    openContractCall({
      contractAddress: 'ST3QYJZBWBZAJA69WSJDGMHRQ4FAGPY9QH15TJJJS',
      contractName: 'vault-v3',
      functionName: 'deposit',
      functionArgs: [uintCV(1000000)], // 1 STX in microSTX
      network,
      appDetails: {
        name: 'Zeref Minimal Test',
        icon: window.location.origin + '/favicon.ico'
      },
      onFinish: (data) => {
        console.log('Minimal deposit test successful:', data);
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};

// Test vault read function
export const testVaultRead = async (): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  console.log('Testing vault read function...');

  return new Promise((resolve, reject) => {
    // Test read-only function first
    openContractCall({
      contractAddress: 'ST3QYJZBWBZAJA69WSJDGMHRQ4FAGPY9QH15TJJJS',
      contractName: 'vault-v3',
      functionName: 'get-total-underlying',
      functionArgs: [],
      network,
      appDetails: {
        name: 'Zeref Vault Read Test',
        icon: window.location.origin + '/favicon.ico'
      },
      onFinish: (data) => {
        console.log('Vault read test successful:', data);
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};