'use client';

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { borrowers as mockBorrowers } from "@/lib/mock-data";
import { BorrowerSummary } from "@/components/app/BorrowerSummary";
import { CognitiveRiskScore } from "@/components/app/CognitiveRiskScore";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConversationAnalysis } from "@/components/app/ConversationAnalysis";
import { BehavioralInsights } from "@/components/app/BehavioralInsights";
import { RiskExplanation } from "@/components/app/RiskExplanation";
import { ActionableRecommendations } from "@/components/app/ActionableRecommendations";
import { Alerts } from "@/components/app/Alerts";
import { useEffect, useState } from "react";
import type { Borrower } from "@/lib/types";

export default function BorrowerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [borrower, setBorrower] = useState<Borrower | undefined>(undefined);

  useEffect(() => {
    // In a real app, you'd fetch this data.
    // For now, we find it in the mock data, but this demonstrates
    // how a client component would handle dynamic data.
    const foundBorrower = mockBorrowers.find((b) => b.id === params.id);
    setBorrower(foundBorrower);
  }, [params.id]);


  if (!borrower) {
    // You could show a loading spinner here
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Portfolio
        </Link>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{borrower.name}</h1>
        <p className="text-muted-foreground">Detailed risk profile and interaction history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <BorrowerSummary borrower={borrower} />
          <CognitiveRiskScore borrower={borrower} />
          <Alerts />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="conversations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="explain">Explainability</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="conversations">
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <ConversationAnalysis conversations={borrower.conversations} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="insights">
              <Card>
                <CardHeader>
                  <CardTitle>Behavioural Insights Panel</CardTitle>
                </CardHeader>
                <CardContent>
                    <BehavioralInsights borrower={borrower} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="explain">
              <Card>
                <CardHeader>
                  <CardTitle>Explainability & Reason Codes</CardTitle>
                </CardHeader>
                <CardContent>
                    <RiskExplanation borrower={borrower} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="actions">
              <Card>
                <CardHeader>
                  <CardTitle>Actionable Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <ActionableRecommendations borrower={borrower} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
