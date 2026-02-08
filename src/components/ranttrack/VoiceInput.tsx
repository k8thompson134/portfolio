'use client';

import { useEffect, useState } from 'react';
import { EXAMPLE_PROMPTS } from './constants';
import styles from './VoiceInput.module.scss';

interface VoiceInputProps {
  currentText: string;
  onTextChange: (text: string) => void;
  onSubmit: (text: string) => void;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

export default function VoiceInput({
  currentText,
  onTextChange,
  onSubmit,
  isListening,
  onStartListening,
  onStopListening,
}: VoiceInputProps) {
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    const supported = typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    setSpeechSupported(supported);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && currentText.trim()) {
      e.preventDefault();
      onSubmit(currentText);
    }
    if (e.key === 'Escape' && isListening) {
      onStopListening();
    }
  };

  const handleExampleClick = (prompt: string) => {
    onTextChange(prompt);
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>VOICE INPUT</span>

      <div className={styles.inputRow}>
        <textarea
          className={styles.input}
          value={currentText}
          onChange={e => onTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How are you feeling today..."
          rows={3}
          aria-label="Symptom description input"
        />
      </div>

      <div className={styles.actions}>
        {speechSupported && (
          <button
            className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
            onClick={isListening ? onStopListening : onStartListening}
            aria-label={isListening ? 'Stop voice recording' : 'Start voice recording'}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isListening ? (
                // Stop icon
                <rect x="6" y="6" width="12" height="12" rx="1" />
              ) : (
                // Mic icon
                <>
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </>
              )}
            </svg>
            {isListening && <span className={styles.listeningText}>Listening...</span>}
          </button>
        )}
        <button
          className={styles.submitButton}
          onClick={() => onSubmit(currentText)}
          disabled={!currentText.trim()}
          type="button"
        >
          Log Entry
        </button>
      </div>

      {!speechSupported && (
        <p className={styles.speechNote}>
          Voice input is available in Chrome and Safari.
        </p>
      )}

      <div className={styles.examples}>
        <span className={styles.examplesLabel}>TRY AN EXAMPLE</span>
        <div className={styles.exampleList}>
          {EXAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              className={styles.exampleButton}
              onClick={() => handleExampleClick(prompt)}
              type="button"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
