"use client";

import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { WalletProvider } from "@/components/wallet/wallet-context";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-white flex">
        <DashboardSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </WalletProvider>
  );
}