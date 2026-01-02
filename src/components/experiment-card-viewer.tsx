import { ExperimentCard } from '@/types';
import styles from './experiment-card-viewer.module.css';

interface ExperimentCardViewerProps {
  card: ExperimentCard;
}

export default function ExperimentCardViewer({ card }: ExperimentCardViewerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>{card.ideaTitle}</h3>
          <button onClick={() => window.print()} className={styles.printButton}>
            🖨️ Print
          </button>
        </div>

        <div className={styles.section}>
          <h4>Problem Statement</h4>
          <p>{card.problem}</p>
        </div>

        <div className={styles.section}>
          <h4>Hypothesis</h4>
          <p>{card.hypothesis}</p>
        </div>

        <div className={styles.section}>
          <h4>Dataset & Data Readiness</h4>
          <p>{card.dataset}</p>
        </div>

        <div className={styles.section}>
          <h4>Success Metrics</h4>
          <ul>
            {card.metrics.map((metric, i) => (
              <li key={i}>{metric}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Go/No-Go Decision Criteria</h4>
          <div className={styles.criteria}>
            <strong>Key Criteria:</strong>
            <ul>
              {card.goNoGo.criteria.map((criterion, i) => (
                <li key={i}>{criterion}</li>
              ))}
            </ul>
          </div>
          <div className={styles.threshold}>
            <strong>Decision Thresholds:</strong>
            <pre>{card.goNoGo.threshold}</pre>
          </div>
        </div>

        <div className={styles.section}>
          <h4>📚 Best Practices from Playbook</h4>
          <ul className={styles.practices}>
            {card.bestPractices.map((practice, i) => (
              <li key={i}>{practice}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
