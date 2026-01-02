import { Constraints } from '@/types';
import styles from './constraints-form.module.css';

interface ConstraintsFormProps {
  constraints: Constraints;
  onChange: (constraints: Constraints) => void;
}

export default function ConstraintsForm({ constraints, onChange }: ConstraintsFormProps) {
  const handleChange = (field: keyof Constraints, value: number) => {
    onChange({
      ...constraints,
      [field]: value,
    });
  };

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label htmlFor='budget'>Budget (USD)</label>
        <input
          id='budget'
          type='number'
          value={constraints.budget}
          onChange={e => handleChange('budget', Number(e.target.value))}
          min='1000'
          step='1000'
        />
        <span className={styles.hint}>Total budget available for PoC projects</span>
      </div>

      <div className={styles.field}>
        <label htmlFor='teamSize'>Team Size</label>
        <input
          id='teamSize'
          type='number'
          value={constraints.teamSize}
          onChange={e => handleChange('teamSize', Number(e.target.value))}
          min='1'
          max='20'
        />
        <span className={styles.hint}>Number of team members available</span>
      </div>
    </div>
  );
}
