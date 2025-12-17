export type RiskClassification = 'Low' | 'Moderate' | 'High';

export type Conversation = {
  id: string;
  date: string;
  type: 'Call' | 'Email' | 'Chat';
  customer: string;
  banker: string;
  transcript: string;
  behavioralCues: string[];
  riskIndicator: RiskClassification;
};

export type Borrower = {
  id: string;
  name: string;
  borrowerId: string;
  loan: {
    amount: number;
    tenure: number;
    type: string;
  };
  repaymentStatus: 'On Track' | 'Delayed' | 'Default';
  traditionalCreditScore: number;
  aiCognitiveRisk: {
    score: number;
    classification: RiskClassification;
    confidence: number;
    trend: 'Improving' | 'Stable' | 'Deteriorating';
    changeFromPrevious: number;
  };
  behavioralDrivers: string[];
  linguisticSignals: string[];
  conversations: Conversation[];
  geography: string;
  segment: string;
  rmName: string;
};

export type PortfolioStats = {
  totalBorrowers: number;
  riskDistribution: {
    low: number;
    moderate: number;
    high: number;
  };
  newlyFlagged: number;
  riskTrend: { month: string; low: number; moderate: number; high: number }[];
  riskComparison: { name: string; behavioral: number; financial: number }[];
};
