'use server';

import { generateRiskExplanations } from '@/ai/flows/generate-risk-explanations';
import { suggestActionableRecommendations } from '@/ai/flows/suggest-actionable-recommendations';
import { summarizeConversationInsights } from '@/ai/flows/summarize-conversation-insights';
import type { Borrower } from './lib/types';


export async function getRiskExplanationAction(borrower: Borrower) {
    try {
        const result = await generateRiskExplanations({
            borrowerName: borrower.name,
            riskScore: borrower.aiCognitiveRisk.score,
            behavioralDrivers: borrower.behavioralDrivers,
            linguisticSignals: borrower.linguisticSignals,
            changeFromPreviousScore: borrower.aiCognitiveRisk.changeFromPrevious,
        });
        return { success: true, explanation: result.explanation };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate explanation.' };
    }
}


export async function getActionableRecommendationsAction(borrower: Borrower) {
    try {
        const result = await suggestActionableRecommendations({
            borrowerName: borrower.name,
            riskClassification: borrower.aiCognitiveRisk.classification,
            behavioralDrivers: borrower.behavioralDrivers.join(', '),
            loanDetails: `Type: ${borrower.loan.type}, Amount: ${borrower.loan.amount}, Tenure: ${borrower.loan.tenure} months`,
        });
        return { success: true, recommendations: result.recommendations };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate recommendations.' };
    }
}


export async function getConversationSummaryAction(conversationText: string) {
    try {
        const result = await summarizeConversationInsights({ conversationText });
        return { success: true, summary: result.summary };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate summary.' };
    }
}
