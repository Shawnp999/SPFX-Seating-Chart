import * as React from 'react';
import styles from './AllCSS.module.scss'

interface EmptyFullSectionProps {
  text?: string;
}

const EmptyFullSection: React.FC<EmptyFullSectionProps> = ({ text }) => {
  return (
    <div className={styles.fullSection} style={{ width: '300px', height: '100%', border: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {text && <p>{text}</p>}
    </div>
  );
};

export default EmptyFullSection;
