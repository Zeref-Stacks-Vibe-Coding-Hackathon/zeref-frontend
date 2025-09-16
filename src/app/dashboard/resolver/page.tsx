"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, Activity, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDashboard } from "@/lib/mock-data";

const resolverDecisions = [
  {
    id: 1,
    timestamp: new Date("2024-01-15T10:30:00"),
    action: "Moved to Ethereum L2",
    fromChain: "Stacks",
    toChain: "Ethereum L2",
    reason: "Higher APY detected (15.8% vs 12.2%)",
    amount: "2,500 STX",
    status: "completed"
  },
  {
    id: 2,
    timestamp: new Date("2024-01-15T08:45:00"),
    action: "Maintained position",
    fromChain: "Base",
    toChain: "Base",
    reason: "Optimal APY maintained (14.1%)",
    amount: "1,800 STX",
    status: "completed"
  },
  {
    id: 3,
    timestamp: new Date("2024-01-15T06:15:00"),
    action: "Bridged from Solana",
    fromChain: "Solana",
    toChain: "Stacks",
    reason: "Gas fees optimization",
    amount: "3,200 STX",
    status: "completed"
  }
];

export default function ResolverPage() {
  const { activeChains } = mockDashboard;
  const bestApy = Math.max(...activeChains.map(c => c.apy));

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-sora font-normal text-slate-900 mb-2">Resolver View</h1>
        <p className="text-slate-600 font-normal">
          Monitor supported chains, APY rates, and resolver optimization decisions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-sora font-normal flex items-center">
                  <Search className="h-5 w-5 mr-2 text-slate-400" />
                  Supported Chains & APY
                </CardTitle>
                <CardDescription>
                  Real-time APY monitoring across all supported protocols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChains.map((chain, index) => (
                    <div key={chain.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${chain.active ? 'bg-green-500' : 'bg-slate-300'}`} />
                        <div>
                          <p className="font-normal text-slate-900">{chain.name}</p>
                          <p className="text-sm text-slate-600">{chain.strategy}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-normal text-slate-900">{chain.apy}%</span>
                          {chain.apy === bestApy && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                              Best
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">APY</p>
                      </div>
                    </div>
                  ))}
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
              <CardHeader>
                <CardTitle className="text-lg font-sora font-normal flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-slate-400" />
                  Resolver Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div>
                        <p className="font-normal text-slate-900">Active Monitoring</p>
                        <p className="text-sm text-slate-600">Scanning for optimal yields every 15 minutes</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Online
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-normal text-slate-900 mb-1">Next Optimization Check</p>
                      <p className="text-sm text-slate-600">In 8 minutes 32 seconds</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-sora font-normal flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-slate-400" />
                  Resolver Decision Log
                </CardTitle>
                <CardDescription>
                  Recent optimization decisions and asset movements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resolverDecisions.map((decision, index) => (
                    <div key={decision.id} className="border-l-4 border-blue-200 pl-4 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-normal text-slate-900 mb-1">{decision.action}</p>
                          <p className="text-sm text-slate-600">
                            {decision.fromChain !== decision.toChain ? (
                              `${decision.fromChain} → ${decision.toChain}`
                            ) : (
                              `Maintained on ${decision.fromChain}`
                            )}
                          </p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={decision.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                        >
                          {decision.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-slate-600">
                        <p><span className="font-normal">Amount:</span> {decision.amount}</p>
                        <p><span className="font-normal">Reason:</span> {decision.reason}</p>
                        <p className="text-xs text-slate-500">
                          {decision.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Button variant="outline" className="w-full text-slate-600 border-slate-300 hover:bg-slate-50">
                    View Full Decision History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}