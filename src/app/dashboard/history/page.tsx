"use client";

import { motion } from "framer-motion";
import { History, ArrowRight, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const loopingHistory = [
  {
    id: 1,
    timestamp: new Date("2024-01-15T14:30:00"),
    type: "optimization",
    fromChain: "Stacks",
    toChain: "Ethereum L2",
    amount: "2,500 STX",
    previousApy: 12.2,
    newApy: 15.8,
    gasCost: "0.05 STX",
    status: "completed",
    txHash: "0xabc123...",
    duration: "2m 45s"
  },
  {
    id: 2,
    timestamp: new Date("2024-01-15T12:15:00"),
    type: "rebalancing",
    fromChain: "Base",
    toChain: "Solana",
    amount: "1,800 STX",
    previousApy: 13.1,
    newApy: 14.7,
    gasCost: "0.03 STX",
    status: "completed",
    txHash: "0xdef456...",
    duration: "1m 58s"
  },
  {
    id: 3,
    timestamp: new Date("2024-01-15T10:45:00"),
    type: "yield_harvest",
    fromChain: "Ethereum L2",
    toChain: "Ethereum L2",
    amount: "3,200 STX",
    previousApy: 14.5,
    newApy: 14.5,
    gasCost: "0.02 STX",
    status: "completed",
    txHash: "0xghi789...",
    duration: "45s"
  },
  {
    id: 4,
    timestamp: new Date("2024-01-15T08:30:00"),
    type: "emergency_exit",
    fromChain: "Solana",
    toChain: "Stacks",
    amount: "4,100 STX",
    previousApy: 11.2,
    newApy: 12.8,
    gasCost: "0.08 STX",
    status: "completed",
    txHash: "0xjkl012...",
    duration: "3m 12s"
  },
  {
    id: 5,
    timestamp: new Date("2024-01-15T06:20:00"),
    type: "optimization",
    fromChain: "Ethereum L2",
    toChain: "Base",
    amount: "1,500 STX",
    previousApy: 13.8,
    newApy: 16.2,
    gasCost: "0.04 STX",
    status: "completed",
    txHash: "0xmno345...",
    duration: "2m 15s"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "optimization":
      return TrendingUp;
    case "rebalancing":
      return ArrowRight;
    case "yield_harvest":
      return Clock;
    case "emergency_exit":
      return AlertCircle;
    default:
      return History;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "optimization":
      return { className: "bg-green-100 text-green-700", label: "Optimization" };
    case "rebalancing":
      return { className: "bg-blue-100 text-blue-700", label: "Rebalancing" };
    case "yield_harvest":
      return { className: "bg-purple-100 text-purple-700", label: "Yield Harvest" };
    case "emergency_exit":
      return { className: "bg-red-100 text-red-700", label: "Emergency Exit" };
    default:
      return { className: "bg-slate-100 text-slate-700", label: type };
  }
};

export default function HistoryPage() {
  const totalLoops = loopingHistory.length;
  const totalSavings = loopingHistory.reduce((acc, loop) => acc + (loop.newApy - loop.previousApy), 0);
  const totalGasCost = loopingHistory.reduce((acc, loop) => acc + parseFloat(loop.gasCost.replace(" STX", "")), 0);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-sora font-normal text-slate-900 mb-2">Looping History</h1>
        <p className="text-slate-600 font-normal">
          Complete timeline of automated yield optimization and asset movements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <History className="h-8 w-8 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-normal text-slate-600">Total Loops</h3>
                <p className="text-2xl font-normal text-slate-900">{totalLoops}</p>
                <p className="text-xs text-slate-500">Last 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-normal text-slate-600">APY Improvement</h3>
                <p className="text-2xl font-normal text-slate-900">+{totalSavings.toFixed(1)}%</p>
                <p className="text-xs text-slate-500">Cumulative gain</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-normal text-slate-600">Gas Costs</h3>
                <p className="text-2xl font-normal text-slate-900">{totalGasCost.toFixed(2)} STX</p>
                <p className="text-xs text-slate-500">Total spent</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-slate-200 py-6">
          <CardHeader>
            <CardTitle className="text-lg font-sora font-normal flex items-center">
              <History className="h-5 w-5 mr-2 text-slate-400" />
              Transaction Timeline
            </CardTitle>
            <CardDescription>
              Detailed history of all looping operations and yield optimizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loopingHistory.map((loop, index) => {
                const Icon = getTypeIcon(loop.type);
                const typeBadge = getTypeBadge(loop.type);

                return (
                  <div key={loop.id} className="relative">
                    {index < loopingHistory.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200"></div>
                    )}
                    
                    <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={typeBadge.className}>
                              {typeBadge.label}
                            </Badge>
                            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                              {loop.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-500">
                            {loop.timestamp.toLocaleString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-600 mb-1">Route</p>
                            <div className="flex items-center text-sm font-normal text-slate-900">
                              <span>{loop.fromChain}</span>
                              <ArrowRight className="h-3 w-3 mx-2 text-slate-400" />
                              <span>{loop.toChain}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-slate-600 mb-1">Amount</p>
                            <p className="text-sm font-normal text-slate-900">{loop.amount}</p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-600 mb-1">APY Change</p>
                            <div className="text-sm font-normal text-slate-900">
                              <span className="text-slate-500">{loop.previousApy}%</span>
                              <ArrowRight className="h-3 w-3 mx-1 text-slate-400 inline" />
                              <span className="text-green-600">{loop.newApy}%</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-slate-600 mb-1">Duration</p>
                            <p className="text-sm font-normal text-slate-900">{loop.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Gas Cost: {loop.gasCost}</span>
                          <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-600 hover:text-slate-900">
                            View Transaction: {loop.txHash}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-50">
                Load More History
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}