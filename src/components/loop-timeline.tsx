"use client";

import { motion } from "framer-motion";
import { Coins, Search, ArrowLeftRight, Activity, LucideIcon } from "lucide-react";
import { copy } from "@/lib/copy";

const iconMap: Record<string, LucideIcon> = {
  coins: Coins,
  search: Search,
  bridge: ArrowLeftRight,
  activity: Activity,
};

export function LoopTimeline() {
  return (
    <section id="timeline" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A simple, automated process that optimizes your yield across chains.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Open Apping Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 -translate-y-1/2 z-0"></div>
          
          {copy.timeline.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center relative z-10 bg-white"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-white border-4 border-sky-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-sm font-bold text-sky-600">{step.step}</span>
                </div>
                <div className="text-center max-w-48">
                  <h3 className="font-sora font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8">
          {copy.timeline.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  {index < copy.timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-sky-300 to-sky-200 mt-4"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {step.step}
                    </span>
                    <h3 className="font-sora font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}