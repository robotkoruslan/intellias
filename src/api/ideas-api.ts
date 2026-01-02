import { Idea, Constraints, RankingResult, Plan, ExperimentCard } from '@/types';
import { ApiClient } from '@/lib/api-client';

/**
 * Default API client instance
 */
const defaultClient = new ApiClient();

/**
 * Rank ideas based on impact, effort, risk, and data readiness
 * 
 * @param ideas - Array of ideas to rank
 * @param client - Optional API client (uses default if not provided)
 * @returns Ranked ideas with scores and top picks
 */
export async function rankIdeas(
  ideas: Idea[],
  client: ApiClient = defaultClient
): Promise<RankingResult> {
  return client.post<RankingResult>('/api/ranking', { ideas });
}

/**
 * Generate 30-60-90 day plans for given ideas
 * 
 * @param ideas - Ideas to generate plans for
 * @param constraints - Budget and team size constraints
 * @param client - Optional API client (uses default if not provided)
 * @returns Array of generated plans
 */
export async function generatePlans(
  ideas: Idea[],
  constraints: Constraints,
  client: ApiClient = defaultClient
): Promise<Plan[]> {
  const response = await client.post<{ plans: Plan[] }>('/api/plan', {
    ideas,
    constraints,
  });

  return response.plans;
}

/**
 * Generate experiment card for a single idea
 * 
 * @param idea - Idea to generate card for
 * @param client - Optional API client (uses default if not provided)
 * @returns Generated experiment card
 */
export async function generateExperimentCard(
  idea: Idea,
  client: ApiClient = defaultClient
): Promise<ExperimentCard> {
  const response = await client.post<{ card: ExperimentCard }>('/api/experiment-card', {
    idea,
  });

  return response.card;
}

/**
 * Convenience object with all API methods using default client
 * For backward compatibility and cleaner imports
 */
export const ideasApi = {
  rankIdeas: (ideas: Idea[]) => rankIdeas(ideas),
  generatePlans: (ideas: Idea[], constraints: Constraints) => generatePlans(ideas, constraints),
  generateExperimentCard: (idea: Idea) => generateExperimentCard(idea),
};

