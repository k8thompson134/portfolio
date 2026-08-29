'use client';

import { useState } from 'react';
import styles from './Bio.module.scss';

export default function Bio() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={styles.bio}>
            <p>
                <b>I&apos;m a software engineering student at MSOE who takes projects from problem to production.</b>{' '}
                Currently running: a voice-first symptom tracker, a civic tech tool for Milwaukee, and a homelab
                with its own AI stack.
            </p>

            <div className={`${styles.expandable} ${expanded ? styles.expanded : ''}`}>
              <div>
                <p>
                    That includes RantTrack (voice-first symptom tracker in React Native), Stormglass (environmental
                    health forecasting with real-time API integration), a local-first AI system orchestrating
                    multiple services around unified data models, homelab infrastructure with Docker Compose on
                    constrained hardware, Cream City Docket (civic tech for Milwaukee government transparency),
                    contributions to the Progressive Learning Platform (assembly language IDE for students), and
                    eSubmit (Ruby on Rails submission system with Docker deployment).
                </p>
                <p>
                    I approach projects methodically: understand the problem, research solutions, gather
                    requirements, then plan implementation. I learned how to break down large problems from nearly a
                    decade organizing technical events, Women in STEM meetups as a FIRST Ladies regional partner with
                    my robotics team in high school, conference planning through SWE, and cultural celebrations as
                    outreach chair of my sorority.
                </p>
                <p>
                    I&apos;m comfortable with the full project lifecycle: user research, requirements documentation,
                    development, and knowledge transfer. Beyond coding, I&apos;ve taught programming, write technical
                    documentation that people actually use, present technical concepts clearly, and handle graphic
                    design and visual communication.
                </p>
              </div>
            </div>

            <button
                type="button"
                className={styles.toggle}
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
            >
                {expanded ? 'Show less' : 'Read more'}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={styles.chevron}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
        </div>
    );
}
