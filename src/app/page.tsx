'use client';

import { useState } from 'react';
import styles from './page.module.css';
import IdeaUpload from '@/components/idea-upload/idea-upload';
import ConstraintsForm from '@/components/constraints-form/constraints-form';
import RankingResults from '@/components/ranking-results/ranking-results';
import PlanViewer from '@/components/plan-viewer/plan-viewer';
import ExperimentCardViewer from '@/components/experiment-card-viewer/experiment-card-viewer';
import { Idea, Constraints, RankingResult, Plan, ExperimentCard } from '@/types';
import { ideasApi } from '@/api/ideas-api';
import { getErrorMessage } from '@/utils/error-handler';

const DEFAULT_CONSTRAINTS: Constraints = {
  budget: 50000,
  teamSize: 3,
};

export default function Home() {
  const [constraints, setConstraints] = useState<Constraints>(DEFAULT_CONSTRAINTS);
  const [rankingResult, setRankingResult] = useState<RankingResult | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [experimentCard, setExperimentCard] = useState<ExperimentCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'results' | 'plans' | 'cards'>('upload');

  const handleIdeasSubmit = async (submittedIdeas: Idea[]) => {
    setLoading(true);
    setError(null);

    try {
      const rankingData = await ideasApi.rankIdeas(submittedIdeas);
      setRankingResult(rankingData);
      setStep('results');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to rank ideas'));
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlans = async () => {
    if (!rankingResult) return;

    setLoading(true);
    setError(null);

    try {
      const topIdeas = rankingResult.topPicks;
      const plansData = await ideasApi.generatePlans(topIdeas, constraints);
      setPlans(plansData);
      setStep('plans');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to generate plans'));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCards = async () => {
    if (!rankingResult) return;

    setLoading(true);
    setError(null);

    try {
      const topIdea = rankingResult.topPicks[0];
      const card = await ideasApi.generateExperimentCard(topIdea);
      setExperimentCard(card);
      setStep('cards');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to generate experiment card'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRankingResult(null);
    setPlans([]);
    setExperimentCard(null);
    setError(null);
    setStep('upload');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>AI Ideas Ranking Tool</h1>
        <p>Rank PoC ideas and generate actionable 30-60-90 day plans</p>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {step === 'upload' && (
          <>
            <section className={styles.section}>
              <h2>1. Set Constraints</h2>
              <ConstraintsForm constraints={constraints} onChange={setConstraints} />
            </section>

            <section className={styles.section}>
              <h2>2. Upload PoC Ideas</h2>
              <IdeaUpload onSubmit={handleIdeasSubmit} loading={loading} />
            </section>
          </>
        )}

        {step === 'results' && rankingResult && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Ranking Results</h2>
              <button onClick={handleReset} className={styles.secondaryButton}>
                Start Over
              </button>
            </div>
            <RankingResults result={rankingResult} />
            <div className={styles.actions}>
              <button onClick={handleGeneratePlans} disabled={loading} className={styles.primaryButton}>
                {loading ? 'Generating...' : 'Generate 30-60-90 Plans'}
              </button>
              <button onClick={handleGenerateCards} disabled={loading} className={styles.primaryButton}>
                {loading ? 'Generating...' : 'Generate Experiment Card'}
              </button>
            </div>
          </section>
        )}

        {step === 'plans' && plans.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>30-60-90 Day Plans</h2>
              <div className={styles.actionButtons}>
                <button onClick={() => setStep('results')} className={styles.secondaryButton}>
                  Back to Results
                </button>
                <button onClick={handleReset} className={styles.secondaryButton}>
                  Start Over
                </button>
              </div>
            </div>
            <PlanViewer plans={plans} />
            <div className={styles.actions}>
              <button onClick={handleGenerateCards} disabled={loading} className={styles.primaryButton}>
                {loading ? 'Generating...' : 'Generate Experiment Card'}
              </button>
            </div>
          </section>
        )}

        {step === 'cards' && experimentCard && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Experiment Card</h2>
              <div className={styles.actionButtons}>
                <button onClick={() => setStep('results')} className={styles.secondaryButton}>
                  Back to Results
                </button>
                <button onClick={handleReset} className={styles.secondaryButton}>
                  Start Over
                </button>
              </div>
            </div>
            <ExperimentCardViewer card={experimentCard} />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>AI Ideas Ranking Tool - R&D Project Prioritization</p>
      </footer>
    </div>
  );
}
