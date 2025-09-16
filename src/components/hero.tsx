"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Smaller and centered for clean minimalist look */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="w-full max-w-6xl h-64 sm:h-80 md:h-180 bg-contain bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('/Images/Background/zeref-bg.png')"
          }}
        />
      </div>
      {/* Light overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/80" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16">

          {/* Main Headline - One liner description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-12"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora font-normal text-slate-900 leading-[1.2] tracking-tight max-w-4xl mx-auto">
              Cross-Chain Yield Resolver with Automated Looping in{' '}
              <span className="inline-flex items-center align-baseline">
                <Image
                  src="/Images/Logo/stacks-logo.png"
                  alt="Stacks"
                  width={80}
                  height={24}
                  className="inline-block ml-1 sm:ml-2 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-auto"
                />
              </span>
            </div>
          </motion.div>

          {/* New subtitle about Stacks & EVM DeFi */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            The home of Stacks & EVM DeFi, built for the next generation of yield optimization.
          </motion.p>

          {/* Supporting subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Optimize your yield automatically across multiple DeFi Protocols.
          </motion.p>

          {/* DeFi Protocol Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center items-center gap-2 sm:gap-3 mb-10 max-w-xl mx-auto"
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/Images/Logo/ethereal-logo.jpg"
                alt="Ethereal"
                width={32}
                height={32}
                className="rounded-full r duration-300 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/Images/Logo/pendle-logo.jpg"
                alt="Pendle"
                width={32}
                height={32}
                className="rounded-full r duration-300 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/Images/Logo/hypurfi-logo.png"
                alt="Hypurfi"
                width={32}
                height={32}
                className="rounded-full duration-300 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/Images/Logo/moonwell-logo.png"
                alt="Moonwell"
                width={32}
                height={32}
                className="rounded-full duration-300 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/Images/Logo/aave-logo.png"
                alt="Aave"
                width={32}
                height={32}
                className="r duration-300 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
          </motion.div>

          {/* Responsive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 md:mb-20"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-3 font-normal text-sm sm:text-base border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-sm"
            >
              Launch App
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full sm:w-auto text-slate-800 hover:text-slate-900 px-6 sm:px-8 py-3 font-normal text-sm sm:text-base border border-slate-400 hover:bg-white/50 transition-all duration-300 rounded-sm"
            >
              Documentation
            </Button>
          </motion.div>

          {/* Responsive metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-12 lg:gap-16 max-w-4xl mx-auto text-center"
          >
            <div className="px-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-900 mb-2">$2.4M</div>
              <div className="text-xs sm:text-sm text-slate-600 font-normal">Total Value Locked</div>
            </div>
            <div className="px-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-900 mb-2">12.5%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-normal">Average APY</div>
            </div>
            <div className="px-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-900 mb-2">5+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-normal">Supported DeFi Protocols</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}