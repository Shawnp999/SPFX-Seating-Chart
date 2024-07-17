// src/webparts/SeatingMap/components/Sections/FullSection.tsx

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

interface FullSectionProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desksPerColumn: number[];
    employeeDesk: EmployeeDesk;
    bossRoom: boolean;
    highlightedColumns: HighlightedColumn[];
    users: ImportedUserWithSeat[];
    onDeskClick: (user: ImportedUserWithSeat | undefined) => void;

}

const FullSection: React.FC<FullSectionProps> = ({
                                                     section,
                                                     hasMeetingRoom,
                                                     desksPerColumn,
                                                     employeeDesk,
                                                     bossRoom,
                                                     highlightedColumns,
                                                     users,
                                                     onDeskClick,
                                                 }) => {



    const { employeeKey, employeeDep } = employeeDesk;
    const borderColor = departmentColors[section] || 'darkgoldenrod';
    const highlightColor = `${borderColor}`;


    const desks = [];
    let deskCounter = 1;



    const meetingRoomColumns = hasMeetingRoom === 'left' ? [0, 1] : hasMeetingRoom === 'right' ? [2, 3] : [];

    for (let col = 0; col < 4; col++) {
        let startRow = 0;
        if (meetingRoomColumns.includes(col)) {
            startRow = 2;
        }

        let columnDesks = desksPerColumn[col];
        if (bossRoom && col === 3) {
            columnDesks -= 1;
        }

        for (let row = startRow; row < startRow + columnDesks; row++) {
            const isHighlighted = section === parseInt(employeeDep) && deskCounter === parseInt(employeeKey);
            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());

            const deskClass = col === 0 || col === 2 ? styles.deskOdd : styles.deskEven;

            desks.push(
                <div
                    key={`${col}-${row}`}
                    className={`${styles.desk} ${deskClass} ${isHighlighted ? styles.highlightedDesk : ''}`}
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

    const meetingRoomStyle = hasMeetingRoom === 'left'
        ? { gridColumn: '1 / 3', gridRow: '1 / 3' }
        : { gridColumn: '3 / 5', gridRow: '1 / 3' };

    return (
        <div
            className={styles.fullSection}
            style={{ maxWidth: '300px', minWidth: '300px', height: '100%', border: '2px solid black' }}
        >
            <div className={styles.officeLayout}>
                {hasMeetingRoom && (
                    <div className={styles.meetingRoom} style={meetingRoomStyle}>
                        <div className={styles.meetingRoomTable}>Meeting Area</div>
                    </div>
                )}

                {desks}

                {bossRoom && (
                    <div
                        style={{
                            gridColumn: '1 / 5',
                            gridRow: '5 / 6',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'end',
                        }}
                    >
                        {[...Array(2)].map((_, i) => {
                            const isHighlighted = section === parseInt(employeeDep) && deskCounter === parseInt(employeeKey);
                            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());

                            return (
                                <div
                                    key={`boss-${i + 1}`}
                                    className={`${styles.desk} ${styles.largeDesk} ${isHighlighted ? styles.highlightedDesk : ''}`}
                                    style={{ borderTop: '1px solid black' }}
                                    onClick={() => onDeskClick(assignedUser)}
                                    data-testid={`desk-${section}-boss-${i + 1}`}
                                >
                                    <div className={styles.seat}>{deskCounter++}</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {highlightedColumns &&
                    highlightedColumns.map(({ column, rows }) =>
                        rows.map((row) => (
                            <div
                                key={`highlight-${column}-${row}`}
                                style={{
                                    gridColumn: `${column} / ${column + 1}`,
                                    gridRow: `${row} / ${row + 1}`,
                                    backgroundColor: highlightColor,
                                    opacity: '0.2',
                                }}
                            ></div>
                        ))
                    )}
            </div>
        </div>
    );
};

export default FullSection;