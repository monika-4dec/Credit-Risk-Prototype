'use server';

/**
 * @fileOverview Generates human-readable explanations for why a borrower was flagged as high risk.
 *
 * - generateRiskExplanations - A function that generates risk explanations for a given borrower.
 * - GenerateRiskExplanationsInput - The input type for the generateRiskExplanations function.
 * - GenerateRiskExplanationsOutput - The return type for the generateRiskExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRiskExplanationsInputSchema = z.object({
  borrowerName: z.string().describe('The name of the borrower.'),
  riskScore: z.number().describe('The AI cognitive risk score of the borrower.'),
  behavioralDrivers: z
    .array(z.string())
    .describe('The top behavioral drivers contributing to the risk score.'),
  linguisticSignals: z
    .array(z.string())
    .describe('The key linguistic signals detected in borrower conversations.'),
  changeFromPreviousScore: z
    .number()
    .describe('The change in risk score from the previous assessment.'),
});
export type GenerateRiskExplanationsInput = z.infer<typeof GenerateRiskExplanationsInputSchema>;

const GenerateRiskExplanationsOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A human-readable explanation of why the borrower was flagged as high risk.'),
});
export type GenerateRiskExplanationsOutput = z.infer<typeof GenerateRiskExplanationsOutputSchema>;

export async function generateRiskExplanations(input: GenerateRiskExplanationsInput): Promise<GenerateRiskExplanationsOutput> {
  return generateRiskExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRiskExplanationsPrompt',
  input: {schema: GenerateRiskExplanationsInputSchema},
  output: {schema: GenerateRiskExplanationsOutputSchema},
  prompt: `You are an AI assistant specializing in explaining credit risk assessments to banking professionals who may not have a data science background.

  Given the following information about a borrower, generate a concise and easily understandable explanation of why the borrower was flagged as high risk.

  Borrower Name: {{{borrowerName}}}
  Risk Score: {{{riskScore}}}
  Top Behavioral Drivers: {{#each behavioralDrivers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Key Linguistic Signals: {{#each linguisticSignals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Change from Previous Score: {{{changeFromPreviousScore}}}

  Explanation:`, // Keep as one line to avoid extra spaces
});

const generateRiskExplanationsFlow = ai.defineFlow(
  {
    name: 'generateRiskExplanationsFlow',
    inputSchema: GenerateRiskExplanationsInputSchema,
    outputSchema: GenerateRiskExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
