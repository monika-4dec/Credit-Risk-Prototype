'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting actionable recommendations based on AI risk assessment.
 *
 * - suggestActionableRecommendations - A function that suggests actionable recommendations for a borrower.
 * - SuggestActionableRecommendationsInput - The input type for the suggestActionableRecommendations function.
 * - SuggestActionableRecommendationsOutput - The return type for the suggestActionableRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActionableRecommendationsInputSchema = z.object({
  riskClassification: z
    .enum(['Low', 'Moderate', 'High'])
    .describe('The AI-assessed risk classification of the borrower.'),
  behavioralDrivers: z
    .string()
    .describe(
      'A summary of the key behavioral factors contributing to the risk assessment.'
    ),
  loanDetails: z.string().describe('Details about the borrower loan.'),
  borrowerName: z.string().describe('The name of the borrower.'),
});
export type SuggestActionableRecommendationsInput = z.infer<
  typeof SuggestActionableRecommendationsInputSchema
>;

const SuggestActionableRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      action: z.string().describe('The recommended action to take.'),
      priority: z.enum(['High', 'Medium', 'Low']).describe('The priority level of the action.'),
      rationale: z.string().describe('The rationale behind the recommendation.'),
      owner: z.enum(['RM', 'Credit']).describe('The recommended owner of the action.'),
    })
  ).describe('A list of actionable recommendations.'),
});
export type SuggestActionableRecommendationsOutput = z.infer<
  typeof SuggestActionableRecommendationsOutputSchema
>;

export async function suggestActionableRecommendations(
  input: SuggestActionableRecommendationsInput
): Promise<SuggestActionableRecommendationsOutput> {
  return suggestActionableRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestActionableRecommendationsPrompt',
  input: {schema: SuggestActionableRecommendationsInputSchema},
  output: {schema: SuggestActionableRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide actionable recommendations to credit officers based on a risk assessment of a borrower.

  Based on the borrower's risk classification, behavioral drivers, and loan details, suggest a list of actions that a credit officer can take.

  Borrower Name: {{{borrowerName}}}
  Risk Classification: {{{riskClassification}}}
  Behavioral Drivers: {{{behavioralDrivers}}}
  Loan Details: {{{loanDetails}}}

  Provide clear and concise recommendations, including the action to take, the priority level (High, Medium, Low), the rationale behind the recommendation, and the recommended owner (RM for Relationship Manager, or Credit).

  Format your response as a JSON object that adheres to the following schema:
  ${JSON.stringify(
    SuggestActionableRecommendationsOutputSchema.describe(
      'The output schema for actionable recommendations.'
    )
  )}
  `,
});

const suggestActionableRecommendationsFlow = ai.defineFlow(
  {
    name: 'suggestActionableRecommendationsFlow',
    inputSchema: SuggestActionableRecommendationsInputSchema,
    outputSchema: SuggestActionableRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
