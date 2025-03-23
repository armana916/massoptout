import React from 'react';

type Props = {
  fullName: string;
  setFullName: (name: string) => void;
};

const SearchForm: React.FC<Props> = ({ fullName, setFullName }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
    </div>
  );
};

export default SearchForm;
