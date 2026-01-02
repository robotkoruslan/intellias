import { Idea, ExperimentCard } from '@/types';
import { getRelevantPractices } from './playbook-parser';

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

function generateProblemStatement(idea: Idea): string {
  return `${idea.description}\n\nThis initiative aims to address the challenge through an AI-powered approach, with an estimated impact level of ${idea.impact}/10 on business outcomes.`;
}

function generateHypothesis(idea: Idea): string {
  const impactLevel = idea.impact >= 7 ? 'significant' : idea.impact >= 4 ? 'moderate' : 'measurable';
  const confidenceLevel = idea.risk <= 3 ? 'high' : idea.risk <= 6 ? 'moderate' : 'cautious';

  return `We believe that implementing ${idea.title} will deliver ${impactLevel} improvements in the target area. Our ${confidenceLevel} confidence is based on the current risk assessment (${idea.risk}/10) and available data readiness (${idea.dataReadiness}/10).`;
}

function generateDatasetDescription(idea: Idea): string {
  if (idea.dataReadiness >= 7) {
    return 'High-quality datasets are available and validated. Data pipeline is established with proper versioning and quality controls. Ready for immediate use in model development.';
  } else if (idea.dataReadiness >= 4) {
    return 'Datasets are partially available but require cleaning and validation. Estimated 20-30% of project time will be allocated to data preparation. Data quality monitoring will be implemented.';
  } else {
    return 'Limited data availability. Significant effort required for data collection, labeling, and preparation (40-50% of timeline). Consider synthetic data generation or partnership with data teams. Data acquisition strategy must be prioritized.';
  }
}

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

function generateGoNoGoCriteria(idea: Idea): {
  criteria: string[];
  threshold: string;
} {
  const criteria: string[] = [];

  // Success threshold based on impact and risk
  const successThreshold = idea.impact >= 7 ? 80 : idea.impact >= 4 ? 70 : 60;

  // Checkpoint timings based on complexity
  const firstCheckpoint = idea.effort >= 7 ? 45 : 30;
  const finalCheckpoint = 90;

  criteria.push(
    `Day ${firstCheckpoint}: Core functionality demonstrated and ${successThreshold}%+ of initial metrics achieved`,
    `Day 60: No critical technical blockers remain unresolved`,
    `Day ${finalCheckpoint}: Positive ROI projection (minimum 2:1 return) with clear path to production`,
    'Stakeholder sign-off confirmed at each milestone checkpoint'
  );

  if (idea.risk >= 7) {
    criteria.push(`Day ${firstCheckpoint}: All high-risk assumptions validated or prototype adjusted`);
  }

  if (idea.dataReadiness < 4) {
    criteria.push('Day 30: Data pipeline operational with quality metrics above 85% threshold');
  }

  if (idea.effort >= 7) {
    criteria.push('Day 75: Technical debt documentation completed and maintenance plan approved');
  }

  const threshold = `
**GO Decision (Proceed to Production):**
• Achieve ${successThreshold}%+ of target metrics by Day ${finalCheckpoint}
• Technical feasibility proven with working prototype
• Cost-benefit analysis shows minimum 2:1 ROI
• No unresolved critical blockers
• Team recommends scaling with high confidence

**PIVOT Decision (Adjust Scope):**
• Achieve 50-${successThreshold - 10}% of targets by Day 60
• Core hypothesis validated but implementation challenges identified
• Stakeholders agree on reduced scope or extended timeline
• Path to success visible with adjustments

**NO-GO Decision (Terminate Project):**
• <50% of target metrics achieved by Day 60
• Fundamental technical or data limitations discovered
• Negative or unclear ROI projection
• Critical resources unavailable or cost prohibitive
• Alternative solutions prove more viable
  `.trim();

  return {
    criteria,
    threshold,
  };
}

export function generateExperimentCards(ideas: Idea[]): ExperimentCard[] {
  return ideas.map(idea => generateExperimentCard(idea));
}
