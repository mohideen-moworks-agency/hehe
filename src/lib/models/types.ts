export type AIModel = 'perplexity' | 'claude';

export type AnalysisInput = {
  region: string;
  industry: string;
  companySize: string;
  department: string;
  model: AIModel;
};

export type AnalysisResults = {
  problems: Array<{
    problem: string;
    cost: string;
    impact: string;
    causes: string;
  }>;
  tools: Array<{
    problem: string;
    tools: string;
    limitations: string;
    inefficiencies: string;
  }>;
  solutions: Array<{
    problem: string;
    solution: string;
    complexity: string;
    timeline: string;
  }>;
  benefits: Array<{
    problem: string;
    benefits: string;
    savings: string;
    value: string;
    timeline: string;
  }>;
  summary: {
    costImpact: string;
    quickWins: string[];
    strategicRecommendations: string[];
  };
};