export const EmptyState = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(78,205,196,0.12) 0%, rgba(78,205,196,0.04) 40%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#0f3330', border: '1.5px solid #1a4a45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M8 6L4 12l4 6M16 6l4 6-4 6M12 4l-2 16" stroke="#4ecdc4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: '#e8f5f3' }}>No Debug Output Yet</p>
      <p style={{ margin: 0, fontSize: '13px', color: '#6b9e99', lineHeight: 1.6 }}>Use dev_debug() in your PHP code to send data here</p>
    </div>
    <div style={{ width: '100%', maxWidth: '300px', background: '#0a2220', border: '1px solid #1a4a45', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #1a4a45' }}>
        <span style={{ fontSize: '11px', color: '#3a6e6a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Example</span>
        <div style={{ display: 'flex', gap: '5px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e25555' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e2a955' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#55e275' }} />
        </div>
      </div>
      <div style={{ padding: '14px 16px', fontFamily: "'Fira Code', monospace", fontSize: '13px', lineHeight: 2 }}>
        <div><span style={{ color: '#3a6e6a', marginRight: '16px' }}>1</span><span style={{ color: '#8abfbb' }}>$data = fetchResults();</span></div>
        <div><span style={{ color: '#3a6e6a', marginRight: '16px' }}>2</span><span style={{ color: '#8abfbb' }}>$count = count($data);</span></div>
        <div><span style={{ color: '#3a6e6a', marginRight: '16px' }}>3</span><span style={{ color: '#4ecdc4' }}>dev_debug</span><span style={{ color: '#8abfbb' }}>($data);</span></div>
      </div>
    </div>
  </div>
);
