"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, Activity, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const supportedProtocols = [
  {
    name: "Aave",
    logo: "/Images/Logo/aave-logo.png",
    chain: "Base",
    apy: 15.8,
    tvl: "$2.1B",
    active: true
  },
  {
    name: "Moonwell",
    logo: "/Images/Logo/moonwell-logo.png",
    chain: "Base",
    apy: 14.2,
    tvl: "$185M",
    active: true
  },
  {
    name: "Pendle",
    logo: "/Images/Logo/pendle-logo.jpg",
    chain: "Arbitrum",
    apy: 13.7,
    tvl: "$1.8B",
    active: true
  },
  {
    name: "Hypurrfi",
    logo: "/Images/Logo/hypurfi-logo.png",
    chain: "Hyperliquid",
    apy: 12.4,
    tvl: "$95M",
    active: false
  },
  {
    name: "Ethereal",
    logo: "/Images/Logo/ethereal-logo.jpg",
    chain: "Ethereum",
    apy: 16.1,
    tvl: "$320M",
    active: true
  }
];

const getProtocolLogo = (protocolName: string) => {
  const protocolLogos: { [key: string]: string } = {
    "Aave": "/Images/Logo/aave-logo.png",
    "Moonwell": "/Images/Logo/moonwell-logo.png",
    "Pendle": "/Images/Logo/pendle-logo.jpg",
    "Hypurrfi": "/Images/Logo/hypurfi-logo.png",
    "Ethereal": "/Images/Logo/ethereal-logo.jpg"
  };
  return protocolLogos[protocolName] || "/Images/Logo/stacks-logo.png";
};

const resolverDecisions = [
  {
    id: 1,
    timestamp: new Date("2024-01-15T10:30:00"),
    action: "Moved to Aave",
    fromProtocol: "Moonwell",
    toProtocol: "Aave",
    reason: "Higher APY detected (15.8% vs 14.2%)",
    amount: "2,500 STX",
    status: "completed"
  },
  {
    id: 2,
    timestamp: new Date("2024-01-15T08:45:00"),
    action: "Maintained position",
    fromProtocol: "Pendle",
    toProtocol: "Pendle",
    reason: "Optimal APY maintained (13.7%)",
    amount: "1,800 STX",
    status: "completed"
  },
  {
    id: 3,
    timestamp: new Date("2024-01-15T06:15:00"),
    action: "Moved to Ethereal",
    fromProtocol: "Hypurrfi",
    toProtocol: "Ethereal",
    reason: "Better yield opportunities",
    amount: "3,200 STX",
    status: "completed"
  }
];

export default function ResolverPage() {
  const bestApy = Math.max(...supportedProtocols.map(p => p.apy));

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-6 border-b border-slate-200"
      >
        <h1 className="text-3xl font-sora font-semibold text-slate-900">Resolver View</h1>
        <p className="text-slate-600 font-normal mt-2">
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
            <Card className="border-slate-200 py-6">
              <CardHeader>
                <CardTitle className="text-lg font-sora font-normal flex items-center">
                  <Search className="h-5 w-5 mr-2 text-slate-400" />
                  Supported Vault Protocol
                </CardTitle>
                <CardDescription>
                  Real-time APY monitoring across all supported vault protocols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportedProtocols.map((protocol, index) => (
                    <div key={protocol.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${protocol.active ? 'bg-green-500' : 'bg-slate-300'}`} />
                        <Image 
                          src={protocol.logo} 
                          alt={protocol.name} 
                          width={32} 
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-normal text-slate-900">{protocol.name}</p>
                          <p className="text-sm text-slate-600">{protocol.chain} • TVL {protocol.tvl}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-normal text-slate-900">{protocol.apy}%</span>
                          {protocol.apy === bestApy && (
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
            <Card className="border-slate-200 py-6">
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
            <Card className="border-slate-200 py-6">
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
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={decision.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                        >
                          {decision.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center space-x-2">
                          <span className="font-normal">Route:</span>
                          <div className="flex items-center space-x-2">
                            <Image 
                              src={getProtocolLogo(decision.fromProtocol)} 
                              alt={decision.fromProtocol}
                              width={16}
                              height={16}
                              className="rounded-full"
                            />
                            <span className="text-xs">{decision.fromProtocol}</span>
                            {decision.fromProtocol !== decision.toProtocol && (
                              <>
                                <span className="text-slate-400">→</span>
                                <Image 
                                  src={getProtocolLogo(decision.toProtocol)} 
                                  alt={decision.toProtocol}
                                  width={16}
                                  height={16}
                                  className="rounded-full"
                                />
                                <span className="text-xs">{decision.toProtocol}</span>
                              </>
                            )}
                          </div>
                        </div>
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