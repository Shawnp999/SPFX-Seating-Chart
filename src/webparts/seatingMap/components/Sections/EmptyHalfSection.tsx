import * as React from 'react';

interface EmptyHalfSectionProps {
  text?: string;
}

const EmptyHalfSection: React.FC<EmptyHalfSectionProps> = ({ text }) => {
  return (
    <div style={{ maxWidth: '150px', minWidth: '150px', height: '100%', border: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {text && <p>{text}</p>}
    </div>
  );
};

export default EmptyHalfSection;
