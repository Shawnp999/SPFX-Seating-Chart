// src/webparts/SeatingMap/components/Sections/BossOfficeHalf.tsx

import * as React from 'react';
import styles from './AllCSS.module.scss';

interface EmployeeDesk {
  employeeKey: string;
  employeeDep: string;
}

interface BossOfficeProps {
  section: number;
  totalDesks: number;
  employeeDesk: EmployeeDesk;
  highlightColor: string;
}

const BossOffice: React.FC<BossOfficeProps> = ({ section, totalDesks, employeeDesk, highlightColor }) => {
  const { employeeKey, employeeDep } = employeeDesk;

  const isHighlighted = section === parseInt(employeeDep) && totalDesks === parseInt(employeeKey);

  return (
      <div className={styles.halfSection}>
        <div className={styles.officeLayoutHalf}>
          <div
              className={`${styles.deskHalf} ${isHighlighted ? styles.highlightedDesk : ''}`}
              style={{ gridRow: 2, gridColumn: '1 / span 2', backgroundColor: isHighlighted ? highlightColor : 'transparent' }}
          >
            <div className={styles.seat}>Desk {totalDesks}</div>
          </div>
        </div>
      </div>
  );
};

export default BossOffice;
