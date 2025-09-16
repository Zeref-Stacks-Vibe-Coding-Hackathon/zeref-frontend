"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { copy } from "@/lib/copy";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/Images/Logo/zeref-logo.jpg"
              alt="Zeref Logo"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {copy.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard" target="_blank" rel="noopener noreferrer">
              {" "}
              <Button
                size="sm"
                className="cursor-pointer hidden md:inline-flex bg-slate-900 hover:bg-slate-800 text-white font-light border-0 rounded-sm"
              >
                Open App
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {copy.nav.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-slate-600 hover:text-slate-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-slate-200">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-light border-0 rounded-sm">
                      Open App
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
