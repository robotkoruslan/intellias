import { Idea, RankingWeights, RankingResult } from '@/types';

/**
 * Default weights for ranking algorithm
 * Total should sum to 1.0
 */
const DEFAULT_WEIGHTS: RankingWeights = {
  impact: 0.4,
  effort: -0.3,      // Negative because lower effort is better
  risk: -0.2,        // Negative because lower risk is better
  dataReadiness: 0.1,
};

/**
 * Calculate ranking score for a single idea
 * Score = (Impact × 0.4) - (Effort × 0.3) - (Risk × 0.2) + (DataReadiness × 0.1)
 * 
 * @param idea - The idea to score
 * @param weights - Custom weights (optional)
 * @returns Calculated score
 */
export function calculateScore(
  idea: Idea,
  weights: RankingWeights = DEFAULT_WEIGHTS
): number {
  const score =
    idea.impact * weights.impact +
    idea.effort * weights.effort +
    idea.risk * weights.risk +
    idea.dataReadiness * weights.dataReadiness;

  // Normalize to 0-100 scale
  // Min possible: 1*0.4 + 10*(-0.3) + 10*(-0.2) + 1*0.1 = -4.5
  // Max possible: 10*0.4 + 1*(-0.3) + 1*(-0.2) + 10*0.1 = 4.5
  const normalized = ((score + 4.5) / 9) * 100;
  
  return Math.round(normalized * 10) / 10; // Round to 1 decimal place
}

/**
 * Rank a list of ideas based on scoring algorithm
 * 
 * @param ideas - Array of ideas to rank
 * @param weights - Custom weights (optional)
 * @returns Ranked ideas with scores
 */
export function rankIdeas(
  ideas: Idea[],
  weights: RankingWeights = DEFAULT_WEIGHTS
): RankingResult {
  // Calculate scores for all ideas
  const scoredIdeas = ideas.map(idea => ({
    ...idea,
    score: calculateScore(idea, weights),
  }));

  // Sort by score (highest first)
  const sortedIdeas = scoredIdeas.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  // Add rank numbers
  const rankedIdeas = sortedIdeas.map((idea, index) => ({
    ...idea,
    rank: index + 1,
  }));

  // Top picks: top 3 or top 20% of ideas, whichever is larger
  const topPicksCount = Math.max(3, Math.ceil(ideas.length * 0.2));
  const topPicks = rankedIdeas.slice(0, topPicksCount);

  return {
    ideas: rankedIdeas,
    topPicks,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Get quadrant position for Impact/Effort matrix visualization
 * 
 * @param idea - Idea to position
 * @returns Quadrant name
 */
export function getQuadrant(idea: Idea): string {
  const highImpact = idea.impact >= 6;
  const lowEffort = idea.effort <= 5;

  if (highImpact && lowEffort) return 'Quick Wins';
  if (highImpact && !lowEffort) return 'Major Projects';
  if (!highImpact && lowEffort) return 'Fill-Ins';
  return 'Time Sinks';
}

/**
 * Validate idea metrics are within valid range (1-10)
 * 
 * @param idea - Idea to validate
 * @returns Validation result
 */
export function validateIdea(idea: Partial<Idea>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!idea.title?.trim()) {
    errors.push('Title is required');
  }

  if (!idea.description?.trim()) {
    errors.push('Description is required');
  }

  const validateMetric = (value: number | undefined, name: string) => {
    if (value === undefined || value < 1 || value > 10) {
      errors.push(`${name} must be between 1 and 10`);
    }
  };

  validateMetric(idea.impact, 'Impact');
  validateMetric(idea.effort, 'Effort');
  validateMetric(idea.risk, 'Risk');
  validateMetric(idea.dataReadiness, 'Data Readiness');

  return {
    valid: errors.length === 0,
    errors,
  };
}


