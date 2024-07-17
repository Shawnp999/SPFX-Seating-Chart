import * as React from 'react';
import styles from '../SeatingMap.module.scss'

interface EmptyFullSectionProps {
  text?: string;
}

const EmptyFullSection: React.FC<EmptyFullSectionProps> = ({ text }) => {
  return (
    <div className={styles.fullSection} style={{ maxWidth : '300px', minWidth : '300px', height: '100%', border: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {text && <p>{text}</p>}
    </div>
  );
};

export default EmptyFullSection;
