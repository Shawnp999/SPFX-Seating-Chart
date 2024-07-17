// src/webparts/SeatingMap/components/Sections/HalfSection.tsx

import * as React from 'react';
import departmentColors from './DepartmentColors';
import styles from '../SeatingMap.module.scss';
import { UserWithSeat as ImportedUserWithSeat } from '../Sections/FetchUserData';

interface EmployeeDesk {
    employeeKey: string;
    employeeDep: string;
}

interface HighlightedColumn {
    column: number;
    rows: number[];
}

interface HalfSectionProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desksPerColumn: number[];
    employeeDesk: EmployeeDesk;
    highlightedColumns: HighlightedColumn[];
    users: ImportedUserWithSeat[];
    onDeskClick: (user: ImportedUserWithSeat | undefined) => void;
}

const HalfSection: React.FC<HalfSectionProps> = ({
                                                     section,
                                                     hasMeetingRoom,
                                                     desksPerColumn,
                                                     employeeDesk,
                                                     highlightedColumns,
                                                     users,
                                                     onDeskClick,
                                                 }) => {
    const { employeeKey, employeeDep } = employeeDesk;
    const borderColor = departmentColors[section] || 'darkgoldenrod';
    const highlightColor = `${borderColor}`;

    const desks: JSX.Element[] = [];
    let deskCounter = 1;

    for (let col = 0; col < 2; col++) {
        let startRow = 0;
        let columnDesks = desksPerColumn[col];

        for (let row = startRow; row < startRow + columnDesks; row++) {
            const isHighlighted = section === parseInt(employeeDep) && deskCounter === parseInt(employeeKey);
            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
            const deskClass = col % 2 === 0 ? styles.deskOdd : styles.deskEven;

            desks.push(
                <div
                    key={`${col}-${row}`}
                    className={`${styles.deskHalf} ${deskClass} ${isHighlighted ? styles.highlightedDesk : ''}`}
                    style={{ gridRow: row + 1, gridColumn: col + 1 }}
                    onClick={() => {
                        console.log('Desk clicked');
                        console.log('Assigned user:', assignedUser);
                        onDeskClick(assignedUser);
                    }}
                    data-testid={`desk-${section}-${deskCounter}`}
                >
                    <div className={styles.seat}>
                        {deskCounter}
                        {assignedUser && (
                            <div>
                                {assignedUser.displayName}
                            </div>
                        )}
                    </div>
                </div>
            );

            deskCounter++;
        }
    }

    return (
        <div className={styles.halfSection} style={{ maxWidth: '150px', minWidth: '150px', height: '100%', border: '2px solid black' }}>
            <div className={styles.officeLayoutHalf}>
                {desks}
                {highlightedColumns &&
                    highlightedColumns.map(({ column, rows }) =>
                        rows.map((row) => (
                            <div
                                key={`highlight-${column}-${row}`}
                                style={{ gridColumn: `${column} / ${column + 1}`, gridRow: `${row} / ${row + 1}`, backgroundColor: highlightColor, opacity: '0.2' }}
                            ></div>
                        ))
                    )}
            </div>
        </div>
    );
};

export default HalfSection;
