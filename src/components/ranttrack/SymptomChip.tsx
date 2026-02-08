import { ExtractedSymptom } from './types';
import { getSymptomColor, getDisplayName, SEVERITY_COLORS } from './constants';
import styles from './SymptomChip.module.scss';

interface SymptomChipProps {
  symptom: ExtractedSymptom;
  compact?: boolean;
}

export default function SymptomChip({ symptom, compact }: SymptomChipProps) {
  const color = getSymptomColor(symptom.symptom);
  const displayName = getDisplayName(symptom.symptom);
  const severityColor = SEVERITY_COLORS[symptom.severity];

  const hasPainDetails = symptom.painDetails &&
    (symptom.painDetails.qualifiers.length > 0 || symptom.painDetails.location);

  const label = [
    displayName,
    symptom.severity ? `severity: ${symptom.severity}` : '',
    symptom.painDetails?.location ? `location: ${symptom.painDetails.location}` : '',
    symptom.painDetails?.qualifiers.length ? `type: ${symptom.painDetails.qualifiers.join(', ')}` : '',
  ].filter(Boolean).join(', ');

  return (
    <span
      className={`${styles.chip} ${compact ? styles.compact : ''}`}
      style={{ color: color.text, backgroundColor: color.bg, borderColor: `${color.text}33` }}
      aria-label={label}
    >
      <span
        className={styles.severityDot}
        style={{ backgroundColor: severityColor }}
        title={symptom.severity}
      />
      <span className={styles.name}>{displayName}</span>
      {!compact && (
        <span className={styles.severity} style={{ color: severityColor }}>
          {symptom.severity.toUpperCase()}
        </span>
      )}
      {!compact && hasPainDetails && (
        <span className={styles.painDetails}>
          {symptom.painDetails!.qualifiers.map(q => (
            <span key={q} className={styles.qualifier}>{q}</span>
          ))}
          {symptom.painDetails!.location && (
            <span className={styles.location}>
              {symptom.painDetails!.location.replace(/_/g, ' ')}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
