'use client';

import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type RiskTrendChartProps = {
  data: { month: string; low: number; moderate: number; high: number }[];
};

const chartConfig = {
  low: { label: 'Low', color: 'hsl(var(--chart-1))' },
  moderate: { label: 'Moderate', color: 'hsl(var(--chart-2))' },
  high: { label: 'High', color: 'hsl(var(--chart-4))' },
};

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Risk Trend Over Time</CardTitle>
        <CardDescription>Number of borrowers in each risk category per month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={30}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <defs>
                    <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-low)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-low)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-moderate)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-moderate)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-high)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-high)" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="high" stackId="1" stroke="var(--color-high)" fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="moderate" stackId="1" stroke="var(--color-moderate)" fill="url(#colorModerate)" />
                <Area type="monotone" dataKey="low" stackId="1" stroke="var(--color-low)" fill="url(#colorLow)" />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
