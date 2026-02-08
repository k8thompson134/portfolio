import { DemoEntry } from './types';
import SymptomChip from './SymptomChip';
import styles from './SymptomLog.module.scss';

interface SymptomLogProps {
  entries: DemoEntry[];
  onClearLog: () => void;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function SymptomLog({ entries, onClearLog }: SymptomLogProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>SYMPTOM LOG</span>
        <button
          className={styles.clearButton}
          onClick={onClearLog}
          type="button"
          aria-label="Clear symptom log"
        >
          CLEAR
        </button>
      </div>

      <div className={styles.list} role="list">
        {entries.map(entry => (
          <div key={entry.id} className={styles.entry} role="listitem">
            <div className={styles.entryHeader}>
              <span className={styles.timestamp}>{formatTime(entry.timestamp)}</span>
              <span className={styles.symptomCount}>
                {entry.symptoms.length} symptom{entry.symptoms.length !== 1 ? 's' : ''}
              </span>
            </div>
            <p className={styles.entryText}>{entry.text}</p>
            <div className={styles.entryChips}>
              {entry.symptoms.map((s, i) => (
                <SymptomChip key={`${s.symptom}-${i}`} symptom={s} compact />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
