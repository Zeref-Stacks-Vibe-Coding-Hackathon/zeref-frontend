"use client";

import { useWallet } from "./wallet-context";
import { Card } from "@/components/ui/card";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";

export function WalletStatus() {
  const { isConnected, address, loading } = useWallet();

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Wallet className="text-gray-400" size={20} />
          <span className="text-gray-600">Checking wallet connection...</span>
        </div>
      </Card>
    );
  }

  if (!isConnected) {
    return (
      <Card className="p-4 border-orange-200">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-orange-500" size={20} />
          <div>
            <p className="font-medium text-gray-900">Wallet Not Connected</p>
            <p className="text-sm text-gray-600">Connect your Leather wallet to access Zeref features</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-green-200 bg-green-50">
      <div className="flex items-center gap-3">
        <CheckCircle className="text-green-600" size={20} />
        <div>
          <p className="font-medium text-gray-900">Wallet Connected</p>
          <p className="text-sm text-gray-600 font-mono">{address}</p>
        </div>
      </div>
    </Card>
  );
}