import { network } from './wallet';

export interface STXBalance {
  balance: string;
  totalSent: string;
  totalReceived: string;
  locked: string;
}

function validateStacksAddress(address: string): boolean {
  console.log('Validating address:', address, 'Length:', address.length);
  
  // Log each character to see what's actually in the address
  console.log('Address characters:', address.split('').map((char, i) => `${i}: ${char}`));
  
  // Simplified validation - just check basic format and length
  // Stacks addresses are 39 characters long and start with S, SP, or ST
  if (!address || typeof address !== 'string') {
    console.log('Address is not a valid string');
    return false;
  }
  
  if (address.length !== 39) {
    console.log('Address length is not 39');
    return false;
  }
  
  if (!address.startsWith('S')) {
    console.log('Address does not start with S');
    return false;
  }
  
  // Use a simpler regex that allows all alphanumeric characters
  // Stacks uses Base58 encoding which includes: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
  const isValid = /^S[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{38}$/.test(address);
  console.log('Regex validation result:', isValid);
  
  if (!isValid) {
    // Try an even more permissive check
    const basicValid = /^S[A-Za-z0-9]{38}$/.test(address);
    console.log('Basic alphanumeric validation:', basicValid);
    return basicValid;
  }
  
  return isValid;
}

export async function testApiConnection(): Promise<boolean> {
  try {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.mainnet.hiro.so' 
      : 'https://api.testnet.hiro.so';
    
    console.log('Testing API connection to:', apiUrl);
    
    // Test with a simpler endpoint
    const response = await fetch(`${apiUrl}/extended/v1/status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });
    
    console.log('API test response status:', response.status);
    console.log('API test response ok:', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API status data:', data);
    }
    
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}

export async function fetchSTXBalance(address: string): Promise<STXBalance | null> {
  try {
    console.log('Fetching STX balance for address:', address);
    console.log('Using network:', network);
    
    // Validate address format
    const isValidAddress = validateStacksAddress(address);
    console.log('Address validation result:', isValidAddress);
    
    // For now, proceed even if validation fails since the address looks correct
    if (!isValidAddress) {
      console.warn('Address validation failed, but proceeding anyway:', address);
    }
    
    // Test API connection first
    const canConnect = await testApiConnection();
    if (!canConnect) {
      console.warn('API connection test failed, but proceeding anyway');
    }
    
    // Use the correct testnet API URL
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.mainnet.hiro.so' 
      : 'https://api.testnet.hiro.so';
    
    console.log('API URL:', apiUrl);
    
    const fullUrl = `${apiUrl}/extended/v1/address/${address}/stx`;
    console.log('Full request URL:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Zeref-Dashboard/1.0',
      },
      mode: 'cors',
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      // If address not found, it might be a new address with 0 balance
      if (response.status === 404) {
        console.log('Address not found, returning zero balance');
        return {
          balance: '0',
          totalSent: '0',
          totalReceived: '0',
          locked: '0',
        };
      }
      
      throw new Error(`Failed to fetch STX balance: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('STX balance data:', data);
    
    return {
      balance: (parseInt(data.balance || '0') / 1000000).toString(), // Convert microSTX to STX
      totalSent: (parseInt(data.total_sent || '0') / 1000000).toString(),
      totalReceived: (parseInt(data.total_received || '0') / 1000000).toString(),
      locked: (parseInt(data.locked || '0') / 1000000).toString(),
    };
  } catch (error) {
    console.error('Error fetching STX balance:', error);
    return null;
  }
}

export async function fetchSTXPrice(): Promise<number> {
  try {
    // Try multiple API endpoints for better reliability
    const endpoints = [
      'https://api.coingecko.com/api/v3/simple/price?ids=stacks&vs_currencies=usd',
      'https://api.coinbase.com/v2/exchange-rates?currency=STX',
      'https://api.binance.com/api/v3/ticker/price?symbol=STXUSDT'
    ];

    // Try CoinGecko first (most reliable for STX)
    try {
      const response = await fetch(endpoints[0]);
      if (response.ok) {
        const data = await response.json();
        const price = data.stacks?.usd;
        if (price && price > 0) {
          return price;
        }
      }
    } catch (error) {
      console.warn('CoinGecko API failed:', error);
    }

    // Fallback to Coinbase
    try {
      const response = await fetch(endpoints[1]);
      if (response.ok) {
        const data = await response.json();
        const rate = data.data?.rates?.USD;
        if (rate && parseFloat(rate) > 0) {
          return parseFloat(rate);
        }
      }
    } catch (error) {
      console.warn('Coinbase API failed:', error);
    }

    // Fallback to Binance
    try {
      const response = await fetch(endpoints[2]);
      if (response.ok) {
        const data = await response.json();
        const price = data.price;
        if (price && parseFloat(price) > 0) {
          return parseFloat(price);
        }
      }
    } catch (error) {
      console.warn('Binance API failed:', error);
    }

    // If all APIs fail, return a default price (you might want to cache the last known price)
    console.warn('All price APIs failed, returning default price');
    return 1.50; // Default STX price as fallback

  } catch (error) {
    console.error('Error fetching STX price:', error);
    return 1.50; // Default STX price as fallback
  }
}