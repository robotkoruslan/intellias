'use client';

import { useState } from 'react';
import { Idea } from '@/types';
import styles from './idea-upload.module.css';

interface IdeaUploadProps {
  onSubmit: (ideas: Idea[]) => void;
  loading: boolean;
}

export default function IdeaUpload({ onSubmit, loading }: IdeaUploadProps) {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '',
      title: '',
      description: '',
      impact: 5,
      effort: 5,
      risk: 5,
      dataReadiness: 5,
    },
  ]);

  const [uploadMode, setUploadMode] = useState<'manual' | 'json'>('manual');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddIdea = () => {
    setIdeas([
      ...ideas,
      {
        id: '',
        title: '',
        description: '',
        impact: 5,
        effort: 5,
        risk: 5,
        dataReadiness: 5,
      },
    ]);
  };

  const handleRemoveIdea = (index: number) => {
    if (ideas.length > 1) {
      setIdeas(ideas.filter((_, i) => i !== index));
    }
  };

  const handleIdeaChange = (index: number, field: keyof Idea, value: string | number) => {
    const newIdeas = [...ideas];
    newIdeas[index] = { ...newIdeas[index], [field]: value };
    setIdeas(newIdeas);
  };

  const handleJsonUpload = () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array of ideas');
      }
      setIdeas(parsed);
      setUploadMode('manual');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const handleSubmit = () => {
    setError(null);
    
    // Basic validation
    const validIdeas = ideas.filter(idea => idea.title.trim() && idea.description.trim());
    
    if (validIdeas.length === 0) {
      setError('Please add at least one valid idea');
      return;
    }

    onSubmit(validIdeas);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modeSwitch}>
        <button
          className={uploadMode === 'manual' ? styles.active : ''}
          onClick={() => setUploadMode('manual')}
        >
          Manual Entry
        </button>
        <button
          className={uploadMode === 'json' ? styles.active : ''}
          onClick={() => setUploadMode('json')}
        >
          JSON Upload
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {uploadMode === 'manual' ? (
        <div className={styles.ideas}>
          {ideas.map((idea, index) => (
            <div key={index} className={styles.ideaCard}>
              <div className={styles.ideaHeader}>
                <h3>Idea #{index + 1}</h3>
                {ideas.length > 1 && (
                  <button
                    onClick={() => handleRemoveIdea(index)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className={styles.field}>
                <label>Title</label>
                <input
                  type="text"
                  value={idea.title}
                  onChange={(e) => handleIdeaChange(index, 'title', e.target.value)}
                  placeholder="e.g., AI-powered customer segmentation"
                />
              </div>

              <div className={styles.field}>
                <label>Description</label>
                <textarea
                  value={idea.description}
                  onChange={(e) => handleIdeaChange(index, 'description', e.target.value)}
                  placeholder="Brief description of the PoC idea..."
                  rows={3}
                />
              </div>

              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <label>
                    Impact: <strong>{idea.impact}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={idea.impact}
                    onChange={(e) => handleIdeaChange(index, 'impact', Number(e.target.value))}
                  />
                  <span className={styles.range}>1 (Low) - 10 (High)</span>
                </div>

                <div className={styles.metric}>
                  <label>
                    Effort: <strong>{idea.effort}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={idea.effort}
                    onChange={(e) => handleIdeaChange(index, 'effort', Number(e.target.value))}
                  />
                  <span className={styles.range}>1 (Low) - 10 (High)</span>
                </div>

                <div className={styles.metric}>
                  <label>
                    Risk: <strong>{idea.risk}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={idea.risk}
                    onChange={(e) => handleIdeaChange(index, 'risk', Number(e.target.value))}
                  />
                  <span className={styles.range}>1 (Low) - 10 (High)</span>
                </div>

                <div className={styles.metric}>
                  <label>
                    Data Readiness: <strong>{idea.dataReadiness}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={idea.dataReadiness}
                    onChange={(e) => handleIdeaChange(index, 'dataReadiness', Number(e.target.value))}
                  />
                  <span className={styles.range}>1 (Low) - 10 (High)</span>
                </div>
              </div>
            </div>
          ))}

          <button onClick={handleAddIdea} className={styles.addButton}>
            + Add Another Idea
          </button>
        </div>
      ) : (
        <div className={styles.jsonUpload}>
          <p>Paste your ideas in JSON format:</p>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`[\n  {\n    "title": "AI Chatbot",\n    "description": "Customer support chatbot",\n    "impact": 8,\n    "effort": 6,\n    "risk": 4,\n    "dataReadiness": 7\n  }\n]`}
            rows={15}
            className={styles.jsonTextarea}
          />
          <button onClick={handleJsonUpload} className={styles.uploadButton}>
            Import JSON
          </button>
        </div>
      )}

      <div className={styles.submitSection}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Processing...' : 'Rank Ideas'}
        </button>
      </div>
    </div>
  );
}


