import { generatePerplexityAnalysis } from './perplexity';
import { generateClaudeAnalysis } from './claude';
import { AnalysisInput, AnalysisResults, AIModel } from './types';

export async function generateAnalysis(data: AnalysisInput): Promise<AnalysisResults> {
  const { model, ...analysisData } = data;
  
  switch (model) {
    case 'perplexity':
      return generatePerplexityAnalysis(analysisData);
    case 'claude':
      return generateClaudeAnalysis(analysisData);
    default:
      throw new Error('Invalid model selected');
  }
}