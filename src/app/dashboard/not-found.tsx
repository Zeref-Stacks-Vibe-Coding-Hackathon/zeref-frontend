"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Dashboard Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            This page is not available. The dashboard page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
            <strong>Error Status:</strong> 404 - Dashboard Page Not Found
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default">
              <Link href="/dashboard">
                Main Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}