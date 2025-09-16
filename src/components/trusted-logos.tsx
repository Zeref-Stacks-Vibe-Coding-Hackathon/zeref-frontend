"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";

const logoPlaceholders = [
  { name: "Partner 1", width: "w-24", height: "h-12" },
  { name: "Partner 2", width: "w-28", height: "h-10" },
  { name: "Partner 3", width: "w-20", height: "h-14" },
  { name: "Partner 4", width: "w-32", height: "h-8" },
  { name: "Partner 5", width: "w-24", height: "h-12" },
];

export function TrustedLogos() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-wider">
            {copy.trustedLogos.title}
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logoPlaceholders.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${logo.width} ${logo.height} bg-slate-300 rounded-lg opacity-40 hover:opacity-60 transition-opacity duration-300 flex items-center justify-center`}
              >
                <span className="text-xs text-slate-600 font-medium">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}