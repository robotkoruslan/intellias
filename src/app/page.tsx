'use client';

import { useState } from 'react';
import styles from './page.module.css';
import IdeaUpload from '@/components/idea-upload';
import ConstraintsForm from '@/components/constraints-form';
import RankingResults from '@/components/ranking-results';
import PlanViewer from '@/components/plan-viewer';
import ExperimentCardViewer from '@/components/experiment-card-viewer';
import { Idea, Constraints, RankingResult, Plan, ExperimentCard } from '@/types';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [constraints, setConstraints] = useState<Constraints>({
    budget: 50000,
    teamSize: 3,
  });
  const [rankingResult, setRankingResult] = useState<RankingResult | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [experimentCard, setExperimentCard] = useState<ExperimentCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'results' | 'plans' | 'cards'>('upload');

  const handleIdeasSubmit = async (submittedIdeas: Idea[]) => {
    setIdeas(submittedIdeas);
    setLoading(true);
    setError(null);

    try {
      // Rank ideas
      const rankingResponse = await fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideas: submittedIdeas }),
      });

      if (!rankingResponse.ok) {
        const errorData = await rankingResponse.json();
        throw new Error(errorData.error || 'Failed to rank ideas');
      }

      const rankingData = await rankingResponse.json();
      setRankingResult(rankingData);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlans = async () => {
    if (!rankingResult) return;

    setLoading(true);
    setError(null);

    try {
      // Generate plans for top picks
      const topIdeas = rankingResult.topPicks;

      const planResponse = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideas: topIdeas, constraints }),
      });

      if (!planResponse.ok) {
        throw new Error('Failed to generate plans');
      }

      const planData = await planResponse.json();
      setPlans(planData.plans);
      setStep('plans');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCards = async () => {
    if (!rankingResult) return;

    setLoading(true);
    setError(null);

    try {
      // Generate card for the top-ranked idea only
      const topIdea = rankingResult.topPicks[0];

      const cardResponse = await fetch('/api/experiment-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: topIdea }),
      });

      if (!cardResponse.ok) {
        throw new Error('Failed to generate experiment card');
      }

      const cardData = await cardResponse.json();
      setExperimentCard(cardData.card);
      setStep('cards');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIdeas([]);
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
