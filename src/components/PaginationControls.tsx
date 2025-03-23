import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationControls: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{ marginRight: '1rem' }}
      >
        ← Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{ marginLeft: '1rem' }}
      >
        Next →
      </button>
    </div>
  );
};

export default PaginationControls;
