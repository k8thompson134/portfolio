'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { DemoEntry, ExtractionResult } from './types';
import { extractSymptoms } from './extractor';
import VoiceInput from './VoiceInput';
import ExtractionView from './ExtractionView';
import SymptomLog from './SymptomLog';
import styles from './RantTrackApp.module.scss';

const STORAGE_KEY = 'ranttrack-demo-entries';

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

export default function RantTrackApp() {
  const [currentText, setCurrentText] = useState('');
  const [currentExtraction, setCurrentExtraction] = useState<ExtractionResult | null>(null);
  const [entries, setEntries] = useState<DemoEntry[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save entries to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Ignore storage errors
    }
  }, [entries]);

  // Debounced extraction on text change
  const handleTextChange = useCallback((text: string) => {
    setCurrentText(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!text.trim()) {
      setCurrentExtraction(null);
      return;
    }

    setIsProcessing(true);
    debounceRef.current = setTimeout(() => {
      const result = extractSymptoms(text);
      setCurrentExtraction(result);
      setIsProcessing(false);
    }, 150);
  }, []);

  const handleSubmit = useCallback((text: string) => {
    if (!text.trim()) return;

    const extraction = extractSymptoms(text);
    const entry: DemoEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: text.trim(),
      timestamp: Date.now(),
      symptoms: extraction.symptoms,
    };

    setEntries(prev => [entry, ...prev]);
    setCurrentText('');
    setCurrentExtraction(null);
  }, []);

  const handleStartListening = useCallback(() => {
    const win = window as unknown as Record<string, unknown>;
    const SpeechRecognitionAPI = (
      win.SpeechRecognition || win.webkitSpeechRecognition
    ) as (new () => SpeechRecognitionInstance) | undefined;

    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      handleTextChange(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [handleTextChange]);

  const handleStopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const handleClearLog = useCallback(() => {
    setEntries([]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputPanel}>
        <VoiceInput
          currentText={currentText}
          onTextChange={handleTextChange}
          onSubmit={handleSubmit}
          isListening={isListening}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
        />
      </div>

      <div className={styles.outputPanel}>
        <ExtractionView
          text={currentText}
          extraction={currentExtraction}
          isProcessing={isProcessing}
        />

        <SymptomLog
          entries={entries}
          onClearLog={handleClearLog}
        />
      </div>
    </div>
  );
}
