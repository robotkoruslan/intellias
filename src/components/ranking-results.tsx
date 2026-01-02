import { RankingResult } from '@/types';
import { getQuadrant } from '@/lib/ranking-engine';
import styles from './ranking-results.module.css';

interface RankingResultsProps {
  result: RankingResult;
}

export default function RankingResults({ result }: RankingResultsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{result.ideas.length}</div>
          <div className={styles.statLabel}>Total Ideas</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{result.topPicks.length}</div>
          <div className={styles.statLabel}>Top Picks</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>
            {result.topPicks[0]?.score?.toFixed(1) || 'N/A'}
          </div>
          <div className={styles.statLabel}>Highest Score</div>
        </div>
      </div>

      <div className={styles.topPicks}>
        <h3>🏆 Top Picks for Implementation</h3>
        <div className={styles.picksGrid}>
          {result.topPicks.map((idea) => (
            <div key={idea.id} className={styles.topPickCard}>
              <div className={styles.pickHeader}>
                <span className={styles.rank}>#{idea.rank}</span>
                <span className={styles.score}>{idea.score?.toFixed(1)}</span>
              </div>
              <h4>{idea.title}</h4>
              <p>{idea.description}</p>
              <div className={styles.pickMetrics}>
                <span>Impact: {idea.impact}</span>
                <span>Effort: {idea.effort}</span>
                <span>Risk: {idea.risk}</span>
                <span>Data: {idea.dataReadiness}</span>
              </div>
              <div className={styles.quadrant}>{getQuadrant(idea)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.allIdeas}>
        <h3>All Ideas - Ranked</h3>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div>Rank</div>
            <div>Title</div>
            <div>Score</div>
            <div>Impact</div>
            <div>Effort</div>
            <div>Risk</div>
            <div>Data</div>
            <div>Quadrant</div>
          </div>
          {result.ideas.map((idea) => (
            <div
              key={idea.id}
              className={`${styles.tableRow} ${
                result.topPicks.some((top) => top.id === idea.id)
                  ? styles.topPick
                  : ''
              }`}
            >
              <div className={styles.rankCell}>#{idea.rank}</div>
              <div className={styles.titleCell}>
                <strong>{idea.title}</strong>
                <span>{idea.description}</span>
              </div>
              <div className={styles.scoreCell}>{idea.score?.toFixed(1)}</div>
              <div>{idea.impact}</div>
              <div>{idea.effort}</div>
              <div>{idea.risk}</div>
              <div>{idea.dataReadiness}</div>
              <div className={styles.quadrantCell}>{getQuadrant(idea)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


