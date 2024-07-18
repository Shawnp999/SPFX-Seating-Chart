import * as React from 'react';
import departmentColors from '../Utilities/DepartmentColors';
import styles from '../SeatingMap.module.scss';
import { UserWithSeat as ImportedUserWithSeat } from '../Utilities/FetchUserData';

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
    desks: { column: number; rows: number[] }[];
    employeeDesk: EmployeeDesk;
    bossRoom: boolean;
    highlightedColumns: HighlightedColumn[];
    users: ImportedUserWithSeat[];
    onDeskClick: (user: ImportedUserWithSeat | undefined) => void;
    selectedFloor: number;
    bossDeskPosition?: { gridRow: number; gridColumn: string };
    highlightedUserId: string | null;
}

const FullSection: React.FC<FullSectionProps> = ({
                                                     section,
                                                     hasMeetingRoom,
                                                     desks,
                                                     employeeDesk,
                                                     bossRoom,
                                                     highlightedColumns,
                                                     users,
                                                     onDeskClick,
                                                     selectedFloor,
                                                     bossDeskPosition,
                                                     highlightedUserId
                                                 }) => {
    const { employeeKey, employeeDep } = employeeDesk;
    const borderColor = departmentColors[section] || 'darkgoldenrod';
    const highlightColor = `${borderColor}`;

    const deskRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const renderedDesks: JSX.Element[] = [];
    let deskCounter = 1;

    React.useEffect(() => {
        if (highlightedUserId) {
            const highlightedDesk = deskRefs.current.find(
                (deskRef, index) =>
                    deskRef && users.find(user => user.id === highlightedUserId)?.seat === (index + 1).toString()
            );
            highlightedDesk?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlightedUserId, users]);

    desks.forEach(({ column, rows }) => {
        rows.forEach(row => {
            const isHighlighted = section === parseInt(employeeDep) && deskCounter === parseInt(employeeKey);
            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
            const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;

            const deskClass = selectedFloor === 2
                ? row === 1
                    ? styles.deskTop
                    : row % 2 === 0
                        ? styles.deskTop
                        : styles.deskBottom
                : '';

            const deskClassNine = column % 2 === 0 ? styles.deskEven : styles.deskOdd;

            const className = selectedFloor === 2
                ? `${styles.deskFloorTwo} ${deskClass} ${isHighlighted ? styles.highlightedDesk : ''} ${isHighlightedUser ? styles.highlightedDesk : ''}`
                : `${styles.desk} ${deskClassNine} ${isHighlighted ? styles.highlightedDesk : ''} ${isHighlightedUser ? styles.highlightedDesk : ''}`;

            renderedDesks.push(
                <div
                    key={`${column}-${row}`}
                    ref={el => {
                        deskRefs.current[deskCounter - 1] = el;
                    }}
                    className={className}
                    style={{ gridRow: row, gridColumn: column }}
                    onClick={() => onDeskClick(assignedUser)}
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
        });
    });

    const meetingRoomStyle = hasMeetingRoom === 'left'
        ? { gridColumn: '1 / 3', gridRow: '1 / 3' }
        : hasMeetingRoom === 'right'
            ? { gridColumn: '3 / 5', gridRow: '1 / 3' }
            : hasMeetingRoom === 'bottom'
                ? { gridColumn: '1 / 5', gridRow: '3 / 6' }
                : {};

    const officeLayoutClassName = selectedFloor === 2
        ? `${styles.officeLayout} ${styles.officeLayoutTwo}`
        : `${styles.officeLayout}`;

    return (
        <div
            className={styles.fullSection}
            style={{ maxWidth: '300px', minWidth: '300px', height: '100%', border: '2px solid black' }}
        >
            <div className={officeLayoutClassName}>
                {hasMeetingRoom && (
                    <div className={styles.meetingRoom} style={meetingRoomStyle}>
                        <div className={styles.meetingRoomTable}>Meeting Area</div>
                    </div>
                )}

                {renderedDesks}

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
                            const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;

                            return (
                                <div
                                    key={`boss-${i + 1}`}
                                    ref={el => {
                                        deskRefs.current[deskCounter - 1] = el;
                                    }}
                                    className={`${styles.desk} ${styles.largeDesk} ${isHighlighted ? styles.highlightedDesk : ''} ${isHighlightedUser ? styles.highlightedDesk : ''}`}
                                    style={bossDeskPosition || { gridRow: 2, gridColumn: '1 / span 2' }}
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
