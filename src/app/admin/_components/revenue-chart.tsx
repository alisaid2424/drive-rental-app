"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
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
import type { ChartConfig } from "@/components/ui/chart";

const revenueData = [
  { day: "Mon", revenue: 4000 },
  { day: "Tue", revenue: 6200 },
  { day: "Wed", revenue: 5500 },
  { day: "Thu", revenue: 8500 },
  { day: "Fri", revenue: 4500 },
  { day: "Sat", revenue: 9500 },
  { day: "Sun", revenue: 6500 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <Card className="glass-panel lg:col-span-2 py-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm sm:text-lg font-black text-slate-900 capitalize tracking-tight">
          Revenue Performance
        </CardTitle>

        <Select defaultValue="30">
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="30">Last 30 Days</SelectItem>

            <SelectItem value="180">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <BarChart data={revenueData}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar dataKey="revenue" fill="#ff2056" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
