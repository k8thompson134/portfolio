"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ArchitectureDiagram.module.scss";

export type NodeKind = "client" | "service" | "data" | "job" | "external";

export interface DiagramNode {
  id: string;
  name: string;
  kind: NodeKind;
  tech?: string;
  detail: string;
  // In-page anchor for the part of the page that covers this node
  link?: { href: string; label: string };
}

export type DiagramBlock =
  | { type: "tier"; label: string; nodes: DiagramNode[] }
  | { type: "link"; flows: string[] }
  | {
      type: "boundary";
      label: string;
      variant: "private" | "public" | "host";
      blocks: DiagramBlock[];
    }
  | { type: "columns"; blocks: DiagramBlock[] };

interface ArchitectureDiagramProps {
  title: string;
  notation: string;
  blocks: DiagramBlock[];
}

const KIND_LABELS: Record<NodeKind, string> = {
  client: "Client",
  service: "Service",
  data: "Data store",
  job: "Scheduled job",
  external: "External system",
};

function allNodes(blocks: DiagramBlock[]): DiagramNode[] {
  return blocks.flatMap((b) =>
    b.type === "tier" ? b.nodes : b.type === "link" ? [] : allNodes(b.blocks),
  );
}

function boundaryVariants(blocks: DiagramBlock[]): string[] {
  return blocks.flatMap((b) =>
    b.type === "boundary"
      ? [b.variant, ...boundaryVariants(b.blocks)]
      : b.type === "columns"
        ? boundaryVariants(b.blocks)
        : [],
  );
}

export default function ArchitectureDiagram({
  title,
  notation,
  blocks,
}: ArchitectureDiagramProps) {
  const nodes = allNodes(blocks);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const selected = nodes.find((n) => n.id === selectedId);
  const variants = new Set(boundaryVariants(blocks));

  // The window floats over the page, so hide it once the diagram scrolls away
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(figureRef.current!);
    return () => observer.disconnect();
  }, []);

  const close = () => {
    if (!selectedId) return;
    document.getElementById(`node-${selectedId}`)?.focus();
    setSelectedId(null);
  };

  const renderBlocks = (list: DiagramBlock[]) =>
    list.map((block, i) => {
      if (block.type === "link") {
        return (
          <div key={i} className={styles.link}>
            <span className={styles.wire} aria-hidden="true" />
            <ul className={styles.flows}>
              {block.flows.map((flow) => (
                <li key={flow}>{flow}</li>
              ))}
            </ul>
          </div>
        );
      }
      if (block.type === "columns") {
        return (
          <div key={i} className={styles.columns}>
            {renderBlocks(block.blocks)}
          </div>
        );
      }
      if (block.type === "boundary") {
        return (
          <div
            key={i}
            className={`${styles.boundary} ${styles[block.variant]}`}
          >
            <span className={styles.boundaryLabel}>{block.label}</span>
            {renderBlocks(block.blocks)}
          </div>
        );
      }
      return (
        <div key={i} className={styles.tier}>
          <span className={styles.tierLabel}>{block.label}</span>
          <div className={styles.nodes}>
            {block.nodes.map((node) => (
              <button
                key={node.id}
                id={`node-${node.id}`}
                type="button"
                className={`${styles.node} ${styles[node.kind]} ${node.id === selectedId ? styles.selected : ""}`}
                onClick={() =>
                  setSelectedId(node.id === selectedId ? null : node.id)
                }
                aria-pressed={node.id === selectedId}
              >
                <span className={styles.stereotype}>
                  «{KIND_LABELS[node.kind].toLowerCase()}»
                </span>
                <span className={styles.nodeName}>{node.name}</span>
                {node.tech && (
                  <span className={styles.nodeTech}>{node.tech}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      );
    });

  return (
    <figure
      ref={figureRef}
      className={styles.diagram}
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      <figcaption className={styles.header}>
        <span className={styles.leds} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>{title}</span>
        <span className={styles.notation}>{notation}</span>
      </figcaption>

      <div className={styles.canvas}>{renderBlocks(blocks)}</div>

      <div className={styles.dock} aria-live="polite">
        {selected && inView && (
          <div
            key={selected.id}
            role="dialog"
            aria-label={`${selected.name} details`}
            className={`${styles.window} ${styles[selected.kind]}`}
          >
            <div className={styles.windowBar}>
              <span className={styles.windowTitle}>node.info</span>
              <button
                type="button"
                className={styles.windowClose}
                onClick={close}
                aria-label="Close details"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className={styles.windowBody}>
              <span className={styles.prompt}>&gt; {selected.name}</span>
              <span className={styles.readoutKind}>
                {KIND_LABELS[selected.kind]}
                {selected.tech ? ` · ${selected.tech}` : ""}
              </span>
              <p>{selected.detail}</p>
              {selected.link && (
                <a
                  href={selected.link.href}
                  className={styles.jump}
                  onClick={() => setSelectedId(null)}
                >
                  {selected.link.label}{" "}
                  {selected.link.href.startsWith("#") ? "↓" : "→"}
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <ul className={styles.legend}>
        {(Object.keys(KIND_LABELS) as NodeKind[])
          .filter((kind) => nodes.some((n) => n.kind === kind))
          .map((kind) => (
            <li key={kind}>
              <span className={`${styles.swatch} ${styles[kind]}`} />
              {KIND_LABELS[kind]}
            </li>
          ))}
        {variants.has("private") && (
          <li>
            <span className={`${styles.line} ${styles.private}`} />
            Private boundary
          </li>
        )}
        {variants.has("public") && (
          <li>
            <span className={`${styles.line} ${styles.public}`} />
            Public edge
          </li>
        )}
        <li className={styles.hint}>Tap a box for details</li>
      </ul>
    </figure>
  );
}
