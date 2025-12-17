'use client';

import { useState } from 'react';
import { CheckCircle, Bot } from 'lucide-react';
import { getActionableRecommendationsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Borrower } from '@/lib/types';
import type { SuggestActionableRecommendationsOutput } from '@/ai/flows/suggest-actionable-recommendations';

type Recommendation = SuggestActionableRecommendationsOutput['recommendations'][0];

const priorityVariantMap = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
} as const;

export function ActionableRecommendations({ borrower }: { borrower: Borrower }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setRecommendations([]);
    const result = await getActionableRecommendationsAction(borrower);
    if (result.success && result.recommendations) {
      setRecommendations(result.recommendations);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI-Suggested Next Steps
        </h3>
        <Button onClick={handleGenerate} disabled={isLoading} size="sm">
          {isLoading ? 'Generating Recommendations...' : 'Generate Recommendations'}
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Rationale</TableHead>
                <TableHead className="text-center">Priority</TableHead>
                <TableHead className="text-center">Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendations.map((rec, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{rec.action}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{rec.rationale}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={priorityVariantMap[rec.priority]} className="w-20 justify-center">
                      {rec.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{rec.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!isLoading && recommendations.length === 0 && (
        <div className="text-center text-muted-foreground p-8 border border-dashed rounded-lg">
          <CheckCircle className="mx-auto h-10 w-10 mb-2" />
          <p>Click "Generate Recommendations" to get AI-suggested next steps.</p>
        </div>
      )}
    </div>
  );
}
