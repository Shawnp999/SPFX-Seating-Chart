import * as React from 'react';
import styles from "../SeatingMap.module.scss";

interface EmptyHalfSectionProps {
  text?: string;
}

const EmptyHalfSection: React.FC<EmptyHalfSectionProps> = ({ text }) => {
  return (
    <div className={styles.halfSection} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {text && <p>{text}</p>}
    </div>
  );
};

export default EmptyHalfSection;
