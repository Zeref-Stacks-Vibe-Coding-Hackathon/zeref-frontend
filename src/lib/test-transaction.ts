import { openSTXTransfer } from '@stacks/connect';
import { network } from './stacks-config';
import { userSession } from './wallet';

export const testSTXTransfer = async (amount: number): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  // Use a known testnet address that should accept STX
  const testRecipient = 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE'; // Known testnet address

  console.log('Test transfer params:', {
    recipient: testRecipient,
    amount: amount.toString(),
    network: network
  });

  return new Promise((resolve, reject) => {
    openSTXTransfer({
      recipient: testRecipient,
      amount: amount.toString(),
      memo: 'Test transaction from Zeref',
      network,
      appDetails: {
        name: 'Zeref Test',
        icon: window.location.origin + '/favicon.ico'
      },
      onFinish: (data) => {
        console.log('Test STX transfer successful:', data);
        resolve(data.txId);
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled by user'));
      },
    });
  });
};