"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useWallet } from '@/components/wallet/wallet-context';
import { usePortfolio } from '@/hooks/use-portfolio';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Generate portfolio data based on current STX value
const generatePortfolioData = (currentValue: number) => {
  const data = [];
  const baseValue = currentValue || 1000;
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate realistic portfolio fluctuation
    const variation = (Math.random() - 0.5) * 0.15; // ±7.5%
    const trend = 1 + (variation * (i / 90)); // gradual trend
    const value = Math.max(0, baseValue * trend);
    
    data.push({
      date: date.toISOString().split('T')[0],
      portfolio: Math.round(value * 100) / 100,
    });
  }
  
  // Ensure last value matches current portfolio
  if (data.length > 0) {
    data[data.length - 1].portfolio = currentValue || 0;
  }
  
  return data;
};

const chartConfig = {
  portfolio: {
    label: "Portfolio Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PortfolioChart() {
  const { isConnected } = useWallet();
  const { totalValue } = usePortfolio();
  const [timeRange, setTimeRange] = React.useState("30d");

  if (!isConnected) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <div className="text-center">
          <p className="text-lg font-medium">Portfolio Chart</p>
          <p className="text-sm mt-1">Connect wallet to view performance</p>
        </div>
      </div>
    );
  }

  if (totalValue === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <div className="text-center">
          <p className="text-lg font-medium">No Portfolio Data</p>
          <p className="text-sm mt-1">Add STX to your wallet to see chart</p>
        </div>
      </div>
    );
  }

  const chartData = generatePortfolioData(totalValue);
  
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 30;
    if (timeRange === "90d") {
      daysToSubtract = 90;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="h-full border-0 bg-transparent shadow-none py-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b-0 py-2 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-sm">Portfolio Performance</CardTitle>
          <CardDescription className="text-xs">
            Showing portfolio value over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[120px] h-8 text-xs"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg text-xs">
              90 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg text-xs">
              30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg text-xs">
              7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-0 sm:px-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[160px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-portfolio)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-portfolio)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Portfolio Value"
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="portfolio"
              type="natural"
              fill="url(#fillPortfolio)"
              stroke="var(--color-portfolio)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}