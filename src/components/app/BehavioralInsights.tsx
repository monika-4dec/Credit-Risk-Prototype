'use client';

import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { Borrower } from "@/lib/types";

const sentimentData = [
    { name: 'Jan', sentiment: 0.8 },
    { name: 'Feb', sentiment: 0.7 },
    { name: 'Mar', sentiment: 0.75 },
    { name: 'Apr', sentiment: 0.5 },
    { name: 'May', sentiment: 0.4 },
    { name: 'Jun', sentiment: 0.2 },
];

const intentData = [
    { name: 'Avoidance', value: 8 },
    { name: 'Delay', value: 5 },
    { name: 'Reassurance-seeking', value: 12 },
    { name: 'Justification', value: 6 },
];

const chartConfigSentiment = {
    sentiment: { label: "Sentiment Score", color: "hsl(var(--chart-1))" }
};
const chartConfigIntent = {
    value: { label: "Count", color: "hsl(var(--chart-2))" }
};

export function BehavioralInsights({ borrower }: { borrower: Borrower }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Sentiment Trend</CardTitle>
                    <CardDescription>Positive/Negative sentiment over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfigSentiment} className="h-[250px] w-full">
                        <LineChart data={sentimentData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis domain={[0, 1]} tickLine={false} axisLine={false} tickMargin={8} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="sentiment" stroke="var(--color-sentiment)" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Detected Intents</CardTitle>
                    <CardDescription>Frequency of behavioral intents in conversations.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfigIntent} className="h-[250px] w-full">
                        <BarChart data={intentData} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={120} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
