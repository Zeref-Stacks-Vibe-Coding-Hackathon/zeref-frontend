"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Coins, 
  Search, 
  History,
  Menu,
  X,
  Repeat
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Earn", href: "/dashboard/earn", icon: Coins },
  { name: "Looping", href: "/dashboard/looping", icon: Repeat },
  { name: "Resolver View", href: "/dashboard/resolver", icon: Search },
  { name: "Looping History", href: "/dashboard/history", icon: History },
];

export function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white/80 backdrop-blur border border-slate-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        bg-white border-r border-slate-200 flex flex-col
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center">
            <Image
              src="/Images/Logo/zeref-logo.jpg"
              alt="Zeref"
              width={32}
              height={32}
              className="rounded-full mr-3"
            />
            <span className="text-xl font-sora font-medium text-slate-900">Zeref</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center px-4 py-3 text-sm font-normal rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-slate-500 font-normal">Protocol Active</span>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}