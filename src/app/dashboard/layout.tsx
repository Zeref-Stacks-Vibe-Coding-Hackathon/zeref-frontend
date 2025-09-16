"use client";

import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <DashboardSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}