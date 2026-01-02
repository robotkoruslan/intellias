import { Plan } from '@/types';
import styles from './plan-viewer.module.css';

interface PlanViewerProps {
  plans: Plan[];
}

export default function PlanViewer({ plans }: PlanViewerProps) {
  return (
    <div className={styles.container}>
      {plans.map((plan, index) => (
        <div key={plan.ideaId} className={styles.planCard}>
          <div className={styles.planHeader}>
            <h3>
              {index + 1}. {plan.ideaTitle}
            </h3>
            <div className={styles.resources}>
              <span>👥 {plan.resources.team} people</span>
              <span>💰 ${plan.resources.estimatedCost.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.timeline}>
            <div className={styles.phase}>
              <div className={styles.phaseHeader}>
                <h4>Days 1-30: Setup & Validation</h4>
                <span className={styles.badge}>Phase 1</span>
              </div>
              <ul>
                {plan.days30.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>

            <div className={styles.phase}>
              <div className={styles.phaseHeader}>
                <h4>Days 31-60: Development & Testing</h4>
                <span className={styles.badge}>Phase 2</span>
              </div>
              <ul>
                {plan.days60.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>

            <div className={styles.phase}>
              <div className={styles.phaseHeader}>
                <h4>Days 61-90: Finalization & Decision</h4>
                <span className={styles.badge}>Phase 3</span>
              </div>
              <ul>
                {plan.days90.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.milestones}>
            <h4>Key Milestones</h4>
            <div className={styles.milestoneGrid}>
              {plan.milestones.map((milestone, i) => (
                <div key={i} className={styles.milestone}>
                  <div className={styles.milestoneDay}>Day {milestone.day}</div>
                  <div className={styles.milestoneTitle}>{milestone.title}</div>
                  <div className={styles.milestoneDesc}>{milestone.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

