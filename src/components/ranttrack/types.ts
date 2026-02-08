export type Severity = 'mild' | 'moderate' | 'severe';

export interface PainDetails {
  qualifiers: string[];
  location: string | null;
}

export interface ExtractedSymptom {
  symptom: string;
  matched: string;
  method: 'phrase' | 'lemma';
  severity: Severity;
  painDetails?: PainDetails;
}

export interface ExtractionResult {
  text: string;
  symptoms: ExtractedSymptom[];
}

export interface DemoEntry {
  id: string;
  text: string;
  timestamp: number;
  symptoms: ExtractedSymptom[];
}
