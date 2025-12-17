'use client';

import { useState } from 'react';
import { Lightbulb, Info } from 'lucide-react';
import { getRiskExplanationAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Borrower } from '@/lib/types';
import { Badge } from '../ui/badge';

export function RiskExplanation({ borrower }: { borrower: Borrower }) {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setExplanation('');
    const result = await getRiskExplanationAction(borrower);
    if (result.success) {
      setExplanation(result.explanation);
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
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Why was this borrower flagged?</h3>
        <p className="text-sm text-muted-foreground">
          Top behavioral drivers and linguistic signals contributing to the AI risk score.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 className="font-medium mb-2">Top Behavioral Drivers</h4>
                <div className="flex flex-wrap gap-2">
                    {borrower.behavioralDrivers.map((driver, i) => (
                        <Badge key={i} variant="secondary">{driver}</Badge>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-medium mb-2">Key Linguistic Signals</h4>
                <div className="flex flex-wrap gap-2">
                    {borrower.linguisticSignals.map((signal, i) => (
                        <Badge key={i} variant="secondary">{signal}</Badge>
                    ))}
                </div>
            </div>
        </div>
      </div>
      
      <div className="p-4 bg-muted/50 rounded-lg space-y-4">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Explainable AI Summary
            </h3>
            <Button onClick={handleGenerate} disabled={isLoading} size="sm">
            {isLoading ? 'Generating Explanation...' : 'Generate Explanation'}
            </Button>
        </div>
        
        {isLoading && <Skeleton className="w-full h-24" />}

        {explanation && (
          <div className="p-4 border-l-4 border-primary bg-background rounded-r-md">
            <p className="text-sm text-foreground">{explanation}</p>
          </div>
        )}
        {!isLoading && !explanation && (
            <div className="text-sm text-muted-foreground flex items-center gap-2 p-4 justify-center">
                <Info className="h-4 w-4" />
                <span>Click "Generate Explanation" to get an AI-powered summary.</span>
            </div>
        )}
      </div>
    </div>
  );
}
