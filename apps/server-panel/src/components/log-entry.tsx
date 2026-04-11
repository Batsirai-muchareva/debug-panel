type LogItem = {
    index: number;
    language: 'PHP' | 'JS';
    data: string;
    file: string;
    method: string;
    line: number;
    time: string;
};

export const LogEntry = ({ item }: { item: LogItem }) => (
    <div style={{ background: '#13152e', border: '1px solid #1e2140', borderRadius: '10px', overflow: 'hidden' }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderBottom: '1px solid #1e2140' }}>
      <span style={{ fontSize: '12px', color: '#4a4d6e' }}>#{item.index}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#1a1d40', border: '1px solid #2a2d5a', borderRadius: '20px', padding: '3px 10px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7c7fdd', display: 'inline-block' }} />
        <span style={{ fontSize: '11px', color: '#9da0dd' }}>{item.language}</span>
      </span>
      <span style={{ background: '#1e2140', border: '1px solid #2a2d4a', borderRadius: '20px', padding: '3px 10px', fontSize: '11px', color: '#4a4d6e' }}>{item.language}</span>
    </div>

    <div style={{ padding: '20px 24px', fontFamily: "'Fira Code', monospace", fontSize: '13px', lineHeight: 1.9 }}>
      <pre style={{ margin: 0, color: '#e8f5f3', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{item.data}</pre>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderTop: '1px solid #1e2140' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
        <span style={{ color: '#7c7fdd' }}>{item.file}</span>
        <span style={{ color: '#4a4d6e' }}>·</span>
        <span style={{ color: '#4a4d6e' }}>{item.method}</span>
        <span style={{ color: '#4a4d6e' }}>·</span>
        <span style={{ color: '#4a4d6e' }}>line {item.line}</span>
      </div>
      <span style={{ fontSize: '12px', color: '#4a4d6e' }}>{item.time}</span>
    </div>

  </div>
);
