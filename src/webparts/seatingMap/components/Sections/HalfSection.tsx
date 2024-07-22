import * as React from 'react';
import departmentColors from '../Utilities/DepartmentColors';
import styles from '../SeatingMap.module.scss';
import { UserWithSeat as ImportedUserWithSeat } from '../Utilities/FetchUserData';



interface HighlightedColumn {
    column: number;
    rows: number[];
}

interface HalfSectionProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desks: { column: number; rows: number[] }[];
    highlightedColumns: HighlightedColumn[];
    users: ImportedUserWithSeat[];
    onDeskClick: (user: ImportedUserWithSeat | undefined) => void;
    bossRoom: boolean;
    bossDeskPosition?: { gridRow: number; gridColumn: string };
    highlightedUserId: string | null;
}

const HalfSection: React.FC<HalfSectionProps> = ({
                                                     section,
                                                     hasMeetingRoom,
                                                     desks,
                                                     highlightedColumns,
                                                     users,
                                                     onDeskClick,
                                                     bossRoom,
                                                     bossDeskPosition,
                                                     highlightedUserId
                                                 }) => {
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
    }, [highlightedUserId]);

    desks.forEach(({ column, rows }) => {
        rows.forEach(row => {
            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
            const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;

            const deskClass = column % 2 === 0 ? styles.deskEven : styles.deskOdd;

            renderedDesks.push(
                <div
                    key={`${column}-${row}`}
                    ref={el => {
                        deskRefs.current[deskCounter - 1] = el;
                    }}
                    className={`${styles.deskHalf} ${deskClass}  ${isHighlightedUser ? styles.highlightedDesk : ''}`}
                    style={{ gridRow: row, gridColumn: column }}
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
        });
    });

    if (bossRoom) {
        const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
        const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;

        renderedDesks.push(
            <div
                key={`boss-desk`}
                ref={el => {
                    deskRefs.current[deskCounter - 1] = el;
                }}
                className={`${styles.deskHalf} ${styles.largeDesk}  ${isHighlightedUser ? styles.highlightedDesk : ''}`}
                style={bossDeskPosition || { gridRow: 2, gridColumn: '1 / span 2' }}
                onClick={() => {
                    console.log('Boss desk clicked');
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

    return (
        <div className={styles.halfSection} style={{ maxWidth: '150px', minWidth: '150px', height: '100%', border: '2px solid black' }}>
            <div className={styles.officeLayoutHalf}>
                {renderedDesks}
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
