import { Anthropic } from '@anthropic-ai/sdk';
import { CLAUDE_API_KEY } from '../../config/credentials';
import { AnalysisInput, AnalysisResults } from './types';
import { parseAnalysisResponse } from '../analysis';

const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
});

export async function generateClaudeAnalysis(data: Omit<AnalysisInput, 'model'>): Promise<AnalysisResults> {
  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Act as a business analyst and provide a detailed analysis for a company with these characteristics:

Region: ${data.region}
Industry: ${data.industry}
Company Size: ${data.companySize}
Department: ${data.department}

Create 4 detailed tables:

1. Common Problems:
| Problem | Estimated Annual Cost | Impact Description | Root Causes |

2. Current Tools & Limitations:
| Problem | Commonly Used Tools | Tool Limitations | Inefficiencies |

3. Recommended Solutions:
| Problem | Recommended Solutions | Implementation Complexity (Low/Medium/High) | Expected Timeline |

4. Benefits & ROI:
| Problem | Expected Benefits | Cost Savings | Additional Value Generated | Expected ROI Timeline |

Requirements:
1. Ensure all costs reflect company size, regional market conditions, industry standards, and department-specific factors
2. Include industry-specific regulations and regional compliance requirements
3. Consider technology adoption rates by region
4. Include department-specific workflows
5. Account for direct and indirect costs
6. Consider current market solutions
7. Provide quantifiable metrics where possible

After the tables, provide:
- Total potential cost impact (as % of department budget)
- Top 3 quick wins with implementation timeframes
- Long-term strategic recommendations (2-3 years)
- Critical success factors for implementation`
    }],
  });

  return parseAnalysisResponse(response.content[0].text);
}