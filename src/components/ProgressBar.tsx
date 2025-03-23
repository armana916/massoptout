import React from 'react';

type Props = {
  total: number;
  done: number;
};

const ProgressBar: React.FC<Props> = ({ total, done }) => {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{
      marginBottom: '1rem',
      background: '#eee',
      padding: '0.5rem',
      borderRadius: '6px'
    }}>
      <div style={{
        height: '10px',
        background: '#ccc',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percent}%`,
          background: '#4caf50',
          height: '100%',
          transition: 'width 0.3s ease'
        }} />
      </div>
      <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>
        {done} of {total} opt-outs completed ({percent}%)
      </p>
    </div>
  );
};

export default ProgressBar;
