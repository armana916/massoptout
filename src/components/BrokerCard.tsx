import React, { useEffect, useState } from 'react';

type Broker = {
  id: string;
  name: string;
  baseUrl: string;
  optOutUrl: string;
  instructions: string;
};

type Props = {
  broker: Broker;
  fullName: string;
};

const BrokerCard: React.FC<Props> = ({ broker, fullName }) => {
  const [found, setFound] = useState(false);
  const [optedOut, setOptedOut] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`status-${broker.id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFound(parsed.found);
      setOptedOut(parsed.optedOut);
    }
  }, [broker.id]);

  useEffect(() => {
    localStorage.setItem(
      `status-${broker.id}`,
      JSON.stringify({ found, optedOut })
    );
  }, [found, optedOut, broker.id]);

  const searchLink = `https://www.google.com/search?q=site:${broker.baseUrl}+"${encodeURIComponent(fullName)}"`;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: optedOut ? '#e0ffe0' : '#fff'
    }}>
      <h3>{broker.name}</h3>
      <p>{broker.instructions}</p>
      <a href={searchLink} target="_blank" rel="noopener noreferrer">
        🔍 Search for "{fullName}"
      </a>
      <br />
      <a href={broker.optOutUrl} target="_blank" rel="noopener noreferrer">
        📝 Opt-Out Instructions
      </a>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => setFound(!found)}>
          Mark as {found ? 'Not Found' : 'Found'}
        </button>
        <button onClick={() => setOptedOut(!optedOut)} style={{ marginLeft: '0.5rem' }}>
          Mark as {optedOut ? 'Pending' : 'Opted Out'}
        </button>
      </div>
    </div>
  );
};

export default BrokerCard;
