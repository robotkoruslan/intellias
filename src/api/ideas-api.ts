import { Idea, Constraints, RankingResult, Plan, ExperimentCard } from '@/types';
import { ApiClient } from '@/lib/api-client';

const defaultClient = new ApiClient();

export async function rankIdeas(ideas: Idea[], client: ApiClient = defaultClient): Promise<RankingResult> {
  return client.post<RankingResult>('/api/ranking', { ideas });
}

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

export async function generateExperimentCard(idea: Idea, client: ApiClient = defaultClient): Promise<ExperimentCard> {
  const response = await client.post<{ card: ExperimentCard }>('/api/experiment-card', {
    idea,
  });

  return response.card;
}

export const ideasApi = {
  rankIdeas: (ideas: Idea[]) => rankIdeas(ideas),
  generatePlans: (ideas: Idea[], constraints: Constraints) => generatePlans(ideas, constraints),
  generateExperimentCard: (idea: Idea) => generateExperimentCard(idea),
};
