import { Idea, Plan, Constraints, Milestone } from '@/types';

export function generatePlan(idea: Idea, constraints: Constraints): Plan {
  const isHighEffort = idea.effort >= 7;
  const isHighRisk = idea.risk >= 7;
  const lowDataReadiness = idea.dataReadiness < 4;

  // Generate 30-day tasks
  const days30: string[] = [
    'Set up development environment and required tools',
    'Review and validate project requirements with stakeholders',
  ];

  if (lowDataReadiness) {
    days30.push(
      'Initiate data collection and acquisition process',
      'Establish data quality metrics and validation criteria',
      'Begin data cleaning and preparation pipeline'
    );
  } else {
    days30.push(
      'Analyze existing datasets and validate data quality',
      'Set up data pipeline and preprocessing workflows'
    );
  }

  if (isHighRisk) {
    days30.push(
      'Conduct technical feasibility study and risk assessment',
      'Create proof-of-concept for highest-risk components',
      'Document all technical assumptions and constraints'
    );
  }

  days30.push(
    'Design system architecture and component structure',
    'Develop initial prototype/MVP with core functionality',
    'Set up monitoring and logging infrastructure',
    'Conduct first checkpoint review with stakeholders'
  );

  // Generate 60-day tasks
  const days60: string[] = [
    'Refine and enhance core features based on initial feedback',
    'Implement comprehensive error handling and validation',
  ];

  if (lowDataReadiness) {
    days60.push(
      'Complete data labeling and annotation (if required)',
      'Validate data pipeline performance and accuracy'
    );
  }

  days60.push(
    'Develop integration points with existing systems',
    'Create automated testing suite for core functionality',
    'Optimize performance and resource utilization',
    'Conduct internal testing and gather feedback'
  );

  if (isHighEffort) {
    days60.push(
      'Break down remaining complex features into manageable tasks',
      'Implement advanced features with proper documentation'
    );
  } else {
    days60.push('Implement remaining features and polish UI/UX');
  }

  days60.push(
    'Document API endpoints and integration guidelines',
    'Conduct mid-project review and adjust timeline if needed'
  );

  // Generate 90-day tasks
  const days90: string[] = [
    'Finalize all features and conduct comprehensive testing',
    'Address all critical bugs and performance issues',
    'Complete technical documentation and user guides',
    'Set up production-ready deployment pipeline',
  ];

  if (idea.impact >= 7) {
    days90.push(
      'Develop scaling strategy and infrastructure plan',
      'Create monitoring dashboard for key business metrics'
    );
  }

  days90.push(
    'Conduct user acceptance testing with stakeholders',
    'Prepare final presentation with results and metrics',
    'Document lessons learned and best practices',
    'Make Go/No-Go decision based on success criteria',
    'If Go: Create detailed roadmap for production rollout',
    'If No-Go: Document findings and recommendations for future initiatives'
  );

  // Calculate resource estimates
  const baseTeamSize = Math.min(constraints.teamSize, idea.effort >= 7 ? 5 : 3);
  const effortMultiplier = idea.effort / 10;
  const estimatedCost = Math.round((constraints.budget * effortMultiplier * baseTeamSize) / constraints.teamSize);

  // Generate milestones
  const milestones: Milestone[] = [
    {
      day: 10,
      title: 'Environment & Data Setup',
      description: 'Development environment ready, initial data pipeline established',
    },
    {
      day: 30,
      title: 'MVP Checkpoint',
      description: 'Core prototype completed, technical feasibility validated',
    },
    {
      day: 60,
      title: 'Feature Complete',
      description: 'All planned features implemented, integration testing done',
    },
    {
      day: 90,
      title: 'Go/No-Go Decision',
      description: 'Final review completed, decision made on production rollout',
    },
  ];

  return {
    ideaId: idea.id,
    ideaTitle: idea.title,
    days30,
    days60,
    days90,
    resources: {
      team: baseTeamSize,
      estimatedCost,
    },
    milestones,
  };
}

export function generatePlans(ideas: Idea[], constraints: Constraints): Plan[] {
  return ideas.map(idea => generatePlan(idea, constraints));
}
