'use client';

export default function K8Tap({ children }: { children: React.ReactNode }) {
  const handleTap = () => {
    window.dispatchEvent(new CustomEvent('rise:trigger'));
  };
  return (
    <span onClick={handleTap} style={{ cursor: 'pointer' }}>
      {children}
    </span>
  );
}
