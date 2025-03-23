import React, { useEffect, useState } from 'react';
import BrokerCard from '../src/components/BrokerCard';
import SearchForm from '../src/components/SearchForm';
import ProgressBar from '../src/components/ProgressBar';
import PaginationControls from '../src/components/PaginationControls';

type Broker = {
  id: string;
  name: string;
  baseUrl: string;
  optOutUrl: string;
  instructions: string;
};

export default function Home() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [fullName, setFullName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const brokersPerPage = 5;

  useEffect(() => {
    fetch('/brokers.json')
      .then(res => res.json())
      .then(data => setBrokers(data));
  }, []);

  const completed = brokers.filter((broker) => {
    const saved = localStorage.getItem(`status-${broker.id}`);
    if (!saved) return false;
    const { optedOut } = JSON.parse(saved);
    return optedOut;
  });

  const indexOfLast = currentPage * brokersPerPage;
  const indexOfFirst = indexOfLast - brokersPerPage;
  const currentBrokers = brokers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(brokers.length / brokersPerPage);

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1>MassOptOut</h1>
      <p>Enter your full name below. We'll help you search and opt out from data broker sites.</p>

      <SearchForm fullName={fullName} setFullName={setFullName} />
      <ProgressBar total={brokers.length} done={completed.length} />

      {fullName && currentBrokers.map(broker => (
        <BrokerCard key={broker.id} broker={broker} fullName={fullName} />
      ))}

      {fullName && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
