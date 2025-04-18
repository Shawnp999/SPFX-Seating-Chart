import * as React from 'react';
import styles from '../SeatingMap.module.scss';
import { formatUserName, UserWithSeat as ImportedUserWithSeat } from '../Utilities/FetchUserData';

interface HalfSectionProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desks: { column: number; rows: number[] }[];
    users: ImportedUserWithSeat[];
    onDeskClick: (user: ImportedUserWithSeat | undefined) => void;
    bossRoom: boolean;
    bossDeskPosition?: { gridRow: number; gridColumn: string };
    highlightedUserId: string | null;
    highlightedDepartment: string | null;
}

const HalfSection: React.FC<HalfSectionProps> = ({
                                                     section,
                                                     hasMeetingRoom,
                                                     desks,
                                                     users,
                                                     onDeskClick,
                                                     bossRoom,
                                                     bossDeskPosition,
                                                     highlightedUserId,
                                                     highlightedDepartment,
                                                 }) => {
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
            const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;

            const deskClass = row % 2 === 0
                ? `${isHighlightedUser ? styles.smallDeskSeatUpHighlighted : styles.smallDeskUp} ${styles.positionBottom}`
                : `${isHighlightedUser ? styles.smallDeskSeatDownHighlighted : styles.smallDeskDown}`;

            renderedDesks.push(
                <div
                    key={`${column}-${row}`}
                    ref={el => {
                        deskRefs.current[deskCounter - 1] = el;
                    }}
                    className={`${styles.deskHalf} ${deskClass} ${isHighlightedDepartment ? styles.departmentDesk : ''}`}
                    style={{ gridRow: row, gridColumn: column }}
                    onClick={() => onDeskClick(assignedUser)}
                    data-testid={`desk-${section}-${deskCounter}`}
                >
                    <div className={styles.seat}>
                        {assignedUser && (
                            <div className={styles.seatText}>
                                {formatUserName(assignedUser.displayName || '')}
                                {/*{deskCounter}*/}
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
        const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;
        const setClassCustom = { justifyContent: 'center', display: 'flex' };
        const setTextClassCustom = { maxWidth: '80%' };

        renderedDesks.push(
            <div
                key={`boss-desk`}
                ref={el => {
                    deskRefs.current[deskCounter - 1] = el;
                }}
                className={`${styles.deskBossCenterUp} ${styles.bossDeskUp} ${isHighlightedUser ? styles.BossDeskupHighlighted : ''} ${isHighlightedDepartment ? styles.departmentDesk : ''}`}
                style={bossDeskPosition || { gridRow: 2, gridColumn: '1 / span 2' }}
                onClick={() => onDeskClick(assignedUser)}
                data-testid={`desk-${section}-${deskCounter}`}
            >
                <div className={styles.seat} style={setClassCustom}>
                    {assignedUser && (
                        <div className={styles.seatText} style={setTextClassCustom}>
                            {formatUserName(assignedUser.displayName || '')}
                            {/*{deskCounter}*/}
                        </div>
                    )}
                </div>
            </div>
        );

        deskCounter++;
    }

    return (
        <div className={styles.halfSection}>
            <div className={styles.officeLayoutHalf}>
                {renderedDesks}

            </div>
        </div>
    );
};

export default HalfSection;
