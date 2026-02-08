import { ExtractionResult } from './types';
import { getSymptomColor } from './constants';
import SymptomChip from './SymptomChip';
import styles from './ExtractionView.module.scss';

interface ExtractionViewProps {
  text: string;
  extraction: ExtractionResult | null;
  isProcessing: boolean;
}

function highlightMatches(text: string, extraction: ExtractionResult) {
  if (!extraction.symptoms.length) return [{ text, highlighted: false, color: '' }];

  const textLower = text.toLowerCase();
  const segments: Array<{ start: number; end: number; color: string }> = [];

  for (const symptom of extraction.symptoms) {
    const matched = symptom.matched.toLowerCase();
    const index = textLower.indexOf(matched);
    if (index !== -1) {
      segments.push({
        start: index,
        end: index + matched.length,
        color: getSymptomColor(symptom.symptom).text,
      });
    }
  }

  // Sort by start position and remove overlaps
  segments.sort((a, b) => a.start - b.start);
  const merged: typeof segments = [];
  for (const seg of segments) {
    if (merged.length === 0 || seg.start >= merged[merged.length - 1].end) {
      merged.push(seg);
    }
  }

  // Build text fragments
  const fragments: Array<{ text: string; highlighted: boolean; color: string }> = [];
  let cursor = 0;

  for (const seg of merged) {
    if (cursor < seg.start) {
      fragments.push({ text: text.slice(cursor, seg.start), highlighted: false, color: '' });
    }
    fragments.push({ text: text.slice(seg.start, seg.end), highlighted: true, color: seg.color });
    cursor = seg.end;
  }

  if (cursor < text.length) {
    fragments.push({ text: text.slice(cursor), highlighted: false, color: '' });
  }

  return fragments;
}

export default function ExtractionView({ text, extraction, isProcessing }: ExtractionViewProps) {
  if (!text && !isProcessing) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <span className={styles.emptyLabel}>NLP OUTPUT</span>
          <p>Type or speak a symptom description to see the extraction engine in action.</p>
        </div>
      </div>
    );
  }

  const fragments = extraction ? highlightMatches(text, extraction) : [];
  const symptomCount = extraction?.symptoms.length ?? 0;

  return (
    <div className={styles.container} aria-live="polite">
      <div className={styles.header}>
        <span className={styles.label}>NLP OUTPUT</span>
        {isProcessing ? (
          <span className={styles.status}>PROCESSING...</span>
        ) : (
          <span className={styles.count}>
            {symptomCount} symptom{symptomCount !== 1 ? 's' : ''} detected
          </span>
        )}
      </div>

      {text && (
        <div className={styles.parsedText}>
          <span className={styles.sectionLabel}>INPUT ANALYSIS</span>
          <p className={styles.text}>
            {fragments.map((frag, i) =>
              frag.highlighted ? (
                <mark
                  key={i}
                  className={styles.highlight}
                  style={{
                    borderBottomColor: frag.color,
                    color: frag.color,
                  }}
                >
                  {frag.text}
                </mark>
              ) : (
                <span key={i}>{frag.text}</span>
              )
            )}
          </p>
        </div>
      )}

      {extraction && extraction.symptoms.length > 0 && (
        <div className={styles.symptoms}>
          <span className={styles.sectionLabel}>EXTRACTED SYMPTOMS</span>
          <div className={styles.chipList}>
            {extraction.symptoms.map((s, i) => (
              <SymptomChip key={`${s.symptom}-${i}`} symptom={s} />
            ))}
          </div>
        </div>
      )}

      {extraction && extraction.symptoms.length === 0 && text.length > 3 && (
        <div className={styles.noResults}>
          <p>No symptoms detected. Try describing how you feel using natural language.</p>
        </div>
      )}
    </div>
  );
}
