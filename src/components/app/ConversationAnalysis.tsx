'use client';

import { useState } from 'react';
import { Phone, Mail, MessageSquare, Bot } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getConversationSummaryAction } from '@/app/actions';
import type { Conversation } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

const typeIconMap = {
  Call: <Phone className="h-4 w-4" />,
  Email: <Mail className="h-4 w-4" />,
  Chat: <MessageSquare className="h-4 w-4" />,
};

const riskVariantMap = {
  High: 'destructive',
  Moderate: 'secondary',
  Low: 'default',
} as const;

function ConversationSummary({ transcript }: { transcript: string }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');
    const result = await getConversationSummaryAction(transcript);
    if (result.success) {
      setSummary(result.summary);
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
    <div className="mt-4 space-y-2 rounded-md border bg-muted/50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI-Generated Summary
        </h4>
        <Button onClick={handleGenerateSummary} disabled={isLoading} size="sm">
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </Button>
      </div>
      {isLoading && <Skeleton className="h-16 w-full" />}
      {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
    </div>
  );
}

export function ConversationAnalysis({ conversations }: { conversations: Conversation[] }) {
  if (conversations.length === 0) {
    return <p className="text-muted-foreground">No conversation history available for this borrower.</p>;
  }
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {conversations.map((convo) => (
          <AccordionItem value={convo.id} key={convo.id}>
            <AccordionTrigger className="hover:bg-accent/50 px-4 rounded-md">
              <div className="flex items-center gap-4">
                <div className="text-muted-foreground">{typeIconMap[convo.type]}</div>
                <div className="text-left">
                  <p className="font-medium">
                    Interaction on {new Date(convo.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    with {convo.banker}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Risk:</span>
                <Badge variant={riskVariantMap[convo.riskIndicator]} className="w-20 justify-center">
                  {convo.riskIndicator}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4 border-t">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Behavioral Cues Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    {convo.behavioralCues.map((cue, i) => (
                      <Badge key={i} variant="outline">
                        {cue}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Transcript</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted/50 p-3 rounded-md">
                    {convo.transcript}
                  </p>
                </div>
                <ConversationSummary transcript={convo.transcript} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
