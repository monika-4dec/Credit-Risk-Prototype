'use server';

/**
 * @fileOverview Summarizes key insights from customer-banker conversations to highlight potential risk factors.
 *
 * - summarizeConversationInsights - A function that summarizes conversation insights.
 * - SummarizeConversationInsightsInput - The input type for the summarizeConversationInsights function.
 * - SummarizeConversationInsightsOutput - The return type for the summarizeConversationInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConversationInsightsInputSchema = z.object({
  conversationText: z
    .string()
    .describe("The full text of the customer-banker conversation to be analyzed."),
});

export type SummarizeConversationInsightsInput = z.infer<
  typeof SummarizeConversationInsightsInputSchema
>;

const SummarizeConversationInsightsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the conversation, highlighting potential risk factors and key insights.'
    ),
});

export type SummarizeConversationInsightsOutput = z.infer<
  typeof SummarizeConversationInsightsOutputSchema
>;

export async function summarizeConversationInsights(
  input: SummarizeConversationInsightsInput
): Promise<SummarizeConversationInsightsOutput> {
  return summarizeConversationInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConversationInsightsPrompt',
  input: {schema: SummarizeConversationInsightsInputSchema},
  output: {schema: SummarizeConversationInsightsOutputSchema},
  prompt: `You are an AI assistant that analyzes customer-banker conversations to identify potential credit risk factors.
  Your goal is to provide a concise summary of the conversation, highlighting any concerning patterns or information that may indicate increased risk.

  Analyze the following conversation text:
  {{conversationText}}

  Focus on identifying:
  - Negative sentiment expressed by the borrower
  - Hesitation or uncertainty in the borrower's responses
  - Avoidance of financial topics
  - Excessive justification of financial decisions
  - Any other red flags that may suggest financial distress

  Provide a summary of the conversation that includes these risk factors.
  The summary should be no more than 200 words.
  `,
});

const summarizeConversationInsightsFlow = ai.defineFlow(
  {
    name: 'summarizeConversationInsightsFlow',
    inputSchema: SummarizeConversationInsightsInputSchema,
    outputSchema: SummarizeConversationInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
