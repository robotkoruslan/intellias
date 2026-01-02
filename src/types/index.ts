export interface Idea {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-10: Business impact potential
  effort: number; // 1-10: Development effort required
  risk: number; // 1-10: Technical and business risk
  dataReadiness: number; // 1-10: Data availability and quality
  score?: number; // Calculated ranking score
  rank?: number; // Position in ranking
}

export interface Constraints {
  budget: number; // Total budget in USD
  teamSize: number; // Number of team members
}

export interface RankingWeights {
  impact: number;
  effort: number;
  risk: number;
  dataReadiness: number;
}

export interface RankingResult {
  ideas: Idea[];
  topPicks: Idea[];
  timestamp: string;
}

export interface Plan {
  ideaId: string;
  ideaTitle: string;
  days30: string[]; // Tasks for first 30 days
  days60: string[]; // Tasks for days 31-60
  days90: string[]; // Tasks for days 61-90
  resources: {
    team: number;
    estimatedCost: number;
  };
  milestones: Milestone[];
}

export interface Milestone {
  day: number;
  title: string;
  description: string;
}

export interface ExperimentCard {
  ideaId: string;
  ideaTitle: string;
  problem: string;
  hypothesis: string;
  dataset: string;
  metrics: string[];
  goNoGo: {
    criteria: string[];
    threshold: string;
  };
  bestPractices: string[];
}

export interface PlaybookSection {
  title: string;
  category: string;
  tips: string[];
}
