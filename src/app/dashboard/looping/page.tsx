"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Repeat, Play, Settings, Activity, Info, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const loopingSteps = [
  {
    id: 1,
    title: "Deposit",
    description: "Deposit STX tokens into the protocol",
    icon: "💰",
    status: "completed"
  },
  {
    id: 2,
    title: "Resolve",
    description: "AI resolver analyzes best yield opportunities across chains",
    icon: "🔍",
    status: "completed"
  },
  {
    id: 3,
    title: "Bridge",
    description: "Assets are bridged to the optimal chain automatically",
    icon: "🌉",
    status: "active"
  },
  {
    id: 4,
    title: "Yield",
    description: "Assets start earning optimized yields on target chain",
    icon: "📈",
    status: "pending"
  },
  {
    id: 5,
    title: "Loop",
    description: "Continuous monitoring and re-optimization as needed",
    icon: "🔄",
    status: "pending"
  }
];

const realtimeLogs = [
  {
    id: 1,
    timestamp: new Date("2024-01-15T14:35:00"),
    action: "Loop triggered",
    fromChain: "Stacks",
    toChain: "Ethereum L2",
    apy: { from: 12.2, to: 15.8 },
    reason: "APY difference exceeded threshold (3.6%)",
    status: "in_progress"
  },
  {
    id: 2,
    timestamp: new Date("2024-01-15T14:30:00"),
    action: "Threshold check",
    fromChain: "Base",
    toChain: "Solana",
    apy: { from: 13.1, to: 14.7 },
    reason: "APY difference below threshold (1.6%)",
    status: "skipped"
  },
  {
    id: 3,
    timestamp: new Date("2024-01-15T14:25:00"),
    action: "Manual loop completed",
    fromChain: "Ethereum L2",
    toChain: "Base",
    apy: { from: 14.5, to: 16.2 },
    reason: "User initiated force loop",
    status: "completed"
  }
];

export default function LoopingPage() {
  const [apyThreshold, setApyThreshold] = useState(2.0);
  const [isAutoLoopEnabled, setIsAutoLoopEnabled] = useState(true);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-sora font-normal text-slate-900 mb-2">Auto-Looping Control</h1>
        <p className="text-slate-600 font-normal">
          Understand, control, and monitor your automated yield optimization
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
                  <Info className="h-5 w-5 mr-2 text-slate-400" />
                  How Auto-Looping Works
                </CardTitle>
                <CardDescription>
                  Step-by-step process of automated yield optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loopingSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {index < loopingSteps.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 ${
                          step.status === "completed" ? "bg-green-100 border-green-200" :
                          step.status === "active" ? "bg-blue-100 border-blue-200" :
                          "bg-slate-100 border-slate-200"
                        }`}>
                          {step.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-normal text-slate-900">{step.title}</h3>
                            <Badge 
                              variant="secondary" 
                              className={
                                step.status === "completed" ? "bg-green-100 text-green-700" :
                                step.status === "active" ? "bg-blue-100 text-blue-700" :
                                "bg-slate-100 text-slate-600"
                              }
                            >
                              {step.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
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
                  <Settings className="h-5 w-5 mr-2 text-slate-400" />
                  Loop Settings
                </CardTitle>
                <CardDescription>
                  Configure your automatic looping preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-normal text-slate-900 mb-1 block">
                        Auto-Loop Enabled
                      </label>
                      <p className="text-xs text-slate-600">
                        Automatically optimize yields when opportunities are found
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAutoLoopEnabled(!isAutoLoopEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isAutoLoopEnabled ? 'bg-slate-900' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isAutoLoopEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-normal text-slate-900">
                      APY Threshold: {apyThreshold}%
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={apyThreshold}
                      onChange={(e) => setApyThreshold(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <p className="text-xs text-slate-600">
                      Only loop when APY difference exceeds this threshold
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Button 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-normal"
                    disabled={!isAutoLoopEnabled}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Force Loop Now
                  </Button>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Manually trigger optimization regardless of threshold
                  </p>
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
                  Real-time Loop Activity
                </CardTitle>
                <CardDescription>
                  Live feed of all looping decisions and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realtimeLogs.map((log, index) => (
                    <div key={log.id} className="border-l-4 border-l-slate-200 pl-4 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-normal text-slate-900 mb-1">{log.action}</p>
                          <div className="flex items-center text-sm text-slate-600 space-x-2">
                            <span>{log.fromChain}</span>
                            <ArrowRight className="h-3 w-3" />
                            <span>{log.toChain}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {log.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {log.status === "in_progress" && <Repeat className="h-4 w-4 text-blue-500 animate-spin" />}
                          {log.status === "skipped" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          <Badge 
                            variant="secondary" 
                            className={
                              log.status === "completed" ? "bg-green-100 text-green-700" :
                              log.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                              "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {log.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm text-slate-600">
                        <p>
                          <span className="font-normal">APY:</span> {log.apy.from}% → {log.apy.to}%
                        </p>
                        <p>
                          <span className="font-normal">Reason:</span> {log.reason}
                        </p>
                        <p className="text-xs text-slate-500">
                          {log.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                  <Button variant="outline" className="text-slate-600 border-slate-300 hover:bg-slate-50">
                    View Complete Log
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