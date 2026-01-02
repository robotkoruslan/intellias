import { Idea, ExperimentCard } from '@/types';
import { getRelevantPractices } from './playbook-parser';

/**
 * Generate an Experiment Card for a PoC idea
 * 
 * @param idea - The idea to create experiment card for
 * @returns Generated experiment card
 */
export function generateExperimentCard(idea: Idea): ExperimentCard {
  // Generate problem statement
  const problem = generateProblemStatement(idea);

  // Generate hypothesis
  const hypothesis = generateHypothesis(idea);

  // Generate dataset description
  const dataset = generateDatasetDescription(idea);

  // Generate metrics
  const metrics = generateMetrics(idea);

  // Generate Go/No-Go criteria
  const goNoGo = generateGoNoGoCriteria(idea);

  // Get relevant best practices
  const bestPractices = getRelevantPractices(idea).slice(0, 5); // Top 5

  return {
    ideaId: idea.id,
    ideaTitle: idea.title,
    problem,
    hypothesis,
    dataset,
    metrics,
    goNoGo,
    bestPractices,
  };
}

/**
 * Generate problem statement based on idea
 */
function generateProblemStatement(idea: Idea): string {
  return `${idea.description}\n\nThis initiative aims to address the challenge through an AI-powered approach, with an estimated impact level of ${idea.impact}/10 on business outcomes.`;
}

/**
 * Generate hypothesis for the experiment
 */
function generateHypothesis(idea: Idea): string {
  const impactLevel = idea.impact >= 7 ? 'significant' : idea.impact >= 4 ? 'moderate' : 'measurable';
  const confidenceLevel = idea.risk <= 3 ? 'high' : idea.risk <= 6 ? 'moderate' : 'cautious';

  return `We believe that implementing ${idea.title} will deliver ${impactLevel} improvements in the target area. Our ${confidenceLevel} confidence is based on the current risk assessment (${idea.risk}/10) and available data readiness (${idea.dataReadiness}/10).`;
}

/**
 * Generate dataset description
 */
function generateDatasetDescription(idea: Idea): string {
  if (idea.dataReadiness >= 7) {
    return 'High-quality datasets are available and validated. Data pipeline is established with proper versioning and quality controls. Ready for immediate use in model development.';
  } else if (idea.dataReadiness >= 4) {
    return 'Datasets are partially available but require cleaning and validation. Estimated 20-30% of project time will be allocated to data preparation. Data quality monitoring will be implemented.';
  } else {
    return 'Limited data availability. Significant effort required for data collection, labeling, and preparation (40-50% of timeline). Consider synthetic data generation or partnership with data teams. Data acquisition strategy must be prioritized.';
  }
}

/**
 * Generate success metrics
 */
function generateMetrics(idea: Idea): string[] {
  const metrics: string[] = [];

  // Technical metrics (always included)
  metrics.push('Model accuracy/performance vs baseline (target: +20%)');
  metrics.push('System response time and latency (target: <2s)');
  metrics.push('Error rate and failure handling (target: <5%)');

  // Business metrics based on impact
  if (idea.impact >= 7) {
    metrics.push('User adoption rate (target: >60%)');
    metrics.push('Cost savings or revenue impact (target: $XX,XXX)');
    metrics.push('Time savings for end users (target: 30%+ reduction)');
  } else if (idea.impact >= 4) {
    metrics.push('User satisfaction score (target: >7/10)');
    metrics.push('Process efficiency improvement (target: 15%+)');
  } else {
    metrics.push('User engagement metrics (target: baseline +10%)');
    metrics.push('Feature utilization rate (target: >40%)');
  }

  // Operational metrics
  metrics.push('Resource utilization (target: <80% of allocated)');

  return metrics;
}

/**
 * Generate Go/No-Go decision criteria
 */
function generateGoNoGoCriteria(idea: Idea): {
  criteria: string[];
  threshold: string;
} {
  const criteria: string[] = [];

  // Success threshold based on impact and risk
  const successThreshold = idea.impact >= 7 ? 80 : idea.impact >= 4 ? 70 : 60;

  criteria.push(
    `Core metrics achieve ${successThreshold}%+ of targets`,
    'No critical technical blockers identified',
    'Positive ROI projection with clear path to value',
    'Stakeholder alignment and support confirmed'
  );

  if (idea.risk >= 7) {
    criteria.push('All high-risk items successfully mitigated or resolved');
  }

  if (idea.dataReadiness < 4) {
    criteria.push('Data pipeline established and quality validated');
  }

  const threshold = `
**GO Decision:** Achieve ${successThreshold}%+ of target metrics, demonstrate clear scalability path, positive cost-benefit analysis.

**PIVOT Decision:** Achieve 50-${successThreshold}% of targets, issues identified but addressable with scope adjustments.

**NO-GO Decision:** <50% of targets met, fundamental technical or business blockers, negative ROI projection.
  `.trim();

  return {
    criteria,
    threshold,
  };
}

/**
 * Generate experiment cards for multiple ideas
 * 
 * @param ideas - Array of ideas
 * @returns Array of generated experiment cards
 */
export function generateExperimentCards(ideas: Idea[]): ExperimentCard[] {
  return ideas.map(idea => generateExperimentCard(idea));
}


