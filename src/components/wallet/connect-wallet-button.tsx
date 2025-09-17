"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "./wallet-context";
import { connectWallet, disconnectWallet } from "@/lib/wallet";
import { Wallet, LogOut } from "lucide-react";

export function ConnectWalletButton() {
  const { isConnected, address, loading } = useWallet();

  const handleConnect = () => {
    connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (loading) {
    return (
      <Button disabled className="min-w-[140px]">
        Loading...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 bg-black text-white rounded-lg text-sm font-medium">
          {formatAddress(address)}
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
    >
      <Wallet size={16} />
      Connect Wallet
    </Button>
  );
}