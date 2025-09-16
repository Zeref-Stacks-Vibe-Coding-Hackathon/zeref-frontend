"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend = "neutral",
  delay = 0 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-slate-400" />
        {trend !== "neutral" && (
          <div className={`
            text-xs px-2 py-1 rounded-full
            ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
          `}>
            {trend === "up" ? "↗" : "↘"}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-normal text-slate-600">{title}</h3>
        <p className="text-2xl font-normal text-slate-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}