'use client';

import { TrendingUp } from 'lucide-react';
import { DonutChart, Legend } from '@tremor/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label, Pie, PieChart, Cell } from 'recharts';

type RiskDistributionChartProps = {
  data: {
    low: number;
    moderate: number;
    high: number;
  };
};

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  const total = data.low + data.moderate + data.high;
  const chartData = [
    { name: 'Low Risk', value: data.low, fill: 'hsl(var(--chart-1))' },
    { name: 'Moderate Risk', value: data.moderate, fill: 'hsl(var(--chart-2))' },
    { name: 'High Risk', value: data.high, fill: 'hsl(var(--chart-4))' },
  ];

  const chartConfig = {
      value: {
        label: "Borrowers",
      },
      low: {
        label: "Low Risk",
        color: "hsl(var(--chart-1))",
      },
      moderate: {
        label: "Moderate Risk",
        color: "hsl(var(--chart-2))",
      },
      high: {
        label: "High Risk",
        color: "hsl(var(--chart-4))",
      },
  }

  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
        <CardDescription>Current portfolio risk breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                            >
                            {total.toLocaleString()}
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                            >
                            Borrowers
                            </tspan>
                        </text>
                        )
                    }
                    }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
            Distribution of risk categories across all borrowers.
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
            <div className="flex items-center gap-4">
            {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: item.fill}} />
                <span className="text-xs">{item.name}</span>
                </div>
            ))}
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
