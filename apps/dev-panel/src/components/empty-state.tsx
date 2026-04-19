export const EmptyState = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', gap: '12px' }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M13 10V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M14 20h12M14 25h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
    <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
      No data to preview
    </p>
    <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-tertiary)', textAlign: 'center', maxWidth: '200px', lineHeight: 1.5 }}>
      Select an element on the canvas to inspect its data here.
    </p>
  </div>
);
