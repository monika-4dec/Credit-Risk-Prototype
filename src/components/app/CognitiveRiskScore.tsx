'use client';
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Label, Pie, PieChart } from "recharts"
import type { Borrower } from "@/lib/types"
import { Badge } from "../ui/badge";

const riskVariantMap = {
  High: 'destructive',
  Moderate: 'secondary',
  Low: 'default',
} as const;


export function CognitiveRiskScore({ borrower }: { borrower: Borrower }) {
    const chartData = [
        { name: 'score', value: borrower.aiCognitiveRisk.score, fill: 'hsl(var(--primary))' },
        { name: 'background', value: 100 - borrower.aiCognitiveRisk.score, fill: 'hsl(var(--muted))' },
    ];
    const trendIcon = borrower.aiCognitiveRisk.trend === 'Deteriorating' 
        ? <TrendingUp className="h-4 w-4 text-destructive" /> 
        : borrower.aiCognitiveRisk.trend === 'Improving' 
        ? <TrendingDown className="h-4 w-4 text-green-600" />
        : <Minus className="h-4 w-4 text-muted-foreground"/>

  return (
    <Card className="flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline text-xl">AI Cognitive Risk Score</CardTitle>
        <CardDescription>Behavioral risk assessment</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
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
              innerRadius={80}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              strokeWidth={0}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <>
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy - 10}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            className="fill-foreground text-5xl font-bold"
                          >
                            {borrower.aiCognitiveRisk.score}
                          </tspan>
                        </text>
                        <text
                            x={viewBox.cx}
                            y={viewBox.cy + 20}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan className="fill-muted-foreground text-sm">
                                out of 100
                            </tspan>
                        </text>
                      </>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-4 text-sm">
        <div className="flex flex-col items-center gap-2">
            <Badge variant={riskVariantMap[borrower.aiCognitiveRisk.classification]} className="w-24 justify-center text-base py-1">
                {borrower.aiCognitiveRisk.classification}
            </Badge>
            <span className="text-muted-foreground text-xs">
                Confidence: {(borrower.aiCognitiveRisk.confidence * 100).toFixed(0)}%
            </span>
        </div>
        <div className="flex w-full items-center justify-center gap-2 font-medium leading-none">
          {trendIcon}
          <div className="leading-none">
            <p className="font-medium">{borrower.aiCognitiveRisk.trend} trend</p>
            <p className="text-xs text-muted-foreground">
                {borrower.aiCognitiveRisk.changeFromPrevious >= 0 ? '+' : ''}{borrower.aiCognitiveRisk.changeFromPrevious} points from last assessment
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
