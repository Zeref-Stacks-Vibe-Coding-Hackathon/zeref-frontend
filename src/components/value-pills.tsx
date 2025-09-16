"use client";

import { motion } from "framer-motion";
import { Link, Layers, RefreshCw, LucideIcon } from "lucide-react";
import { copy } from "@/lib/copy";

const iconMap: Record<string, LucideIcon> = {
  link: Link,
  layers: Layers,
  "refresh-cw": RefreshCw,
};

export function ValuePills() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sora font-light text-slate-900 mb-6 tracking-tight">
            Seamless. Automated. Optimized.
          </h2>
          <p className="text-slate-500 font-light text-lg max-w-2xl mx-auto">
            Experience the future of cross-chain yield farming with our intelligent protocol
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {copy.valuePills.map((pill, index) => {
            const Icon = iconMap[pill.icon];
            return (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="mb-4">
                  <Icon className="h-8 w-8 text-slate-400 mx-auto" />
                </div>
                <h3 className="text-lg font-light text-slate-900 mb-2">{pill.label}</h3>
                <p className="text-sm text-slate-500 font-light">
                  {pill.label === "Cross-Chain" && "Bridge assets seamlessly across multiple DeFi Protocols"}
                  {pill.label === "DeFi Native" && "Built specifically for decentralized finance protocols"}
                  {pill.label === "Auto-Looping" && "Continuously optimize yields through automated strategies"}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}