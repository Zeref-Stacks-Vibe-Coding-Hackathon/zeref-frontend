"use client";

import { motion } from "framer-motion";
import { Eye, Shuffle, Repeat, ShieldCheck, LucideIcon } from "lucide-react";
import { copy } from "@/lib/copy";

const iconMap: Record<string, LucideIcon> = {
  eye: Eye,
  shuffle: Shuffle,
  repeat: Repeat,
  "shield-check": ShieldCheck,
};

export function FeatureCards() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sora font-light text-slate-900 mb-6 tracking-tight">
            Core Features
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
            Essential tools for cross-chain yield optimization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {copy.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 bg-white border border-slate-200/50 rounded-sm hover:border-slate-300 transition-all duration-300">
                  <div className="mb-6">
                    <Icon className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-sora font-light text-slate-900 mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}