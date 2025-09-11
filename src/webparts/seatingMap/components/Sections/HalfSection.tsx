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
    currentUserId?: string;
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
    currentUserId,
}) => {
    const deskRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const renderedDesks: JSX.Element[] = [];
    let deskCounter = 1;

    // Check if current user is one of the two special users
    const showDebugInfo = currentUserId === '35017994-7401-4011-bee5-9d74e9454516' || 
                         currentUserId === 'b947e7da-7da9-4200-9046-ca0b3b3d9f7a';

                         console.log(currentUserId,'currentUserId')

    React.useEffect(() => {
        if (highlightedUserId) {
            const highlightedDesk = deskRefs.current.find(
                (deskRef, index) =>
                    deskRef && users.find(user => user.id === highlightedUserId)?.seat === (index + 1).toString()
            );
            highlightedDesk?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlightedUserId, users, section]);

    // Render normal desks
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
                        <div className={styles.seatText}>
                            {showDebugInfo ? (
                                <>
                                    {deskCounter}&nbsp;
                                    {assignedUser && formatUserName(assignedUser.displayName || '')}
                                </>
                            ) : (
                                assignedUser && formatUserName(assignedUser.displayName || '')
                            )}
                        </div>
                    </div>
                </div>
            );

            deskCounter++;
        });
    });

    // Render boss desk
    if (bossRoom) {
        const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
        const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;
        const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;
        const setClassCustom = { justifyContent: 'center', display: 'flex' };

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
                    <div className={styles.seatText}>
                        {showDebugInfo ? (
                            <>
                                {deskCounter}&nbsp;
                                {assignedUser && formatUserName(assignedUser.displayName || '')}
                            </>
                        ) : (
                            assignedUser && formatUserName(assignedUser.displayName || '')
                        )}
                    </div>
                </div>
            </div>
        );

        deskCounter++;
    }

    // Meeting room styles
    const meetingRoomClass = hasMeetingRoom === 'left'
        ? styles.rightMeetingRoom
        : hasMeetingRoom === 'right'
            ? styles.leftMeetingRoom
            : hasMeetingRoom === 'farleft'
                ? styles.farLeftMeetingRoom
                : hasMeetingRoom === 'farright'
                    ? styles.farRightMeetingRoom
                    : styles.meetingRoomTable;

    const meetingRoomStyle = hasMeetingRoom === 'left'
        ? { gridColumn: '1 / 3', gridRow: '1 / 3' }
        : hasMeetingRoom === 'right'
            ? { gridColumn: '3 / 5', gridRow: '1 / 3' }
            : hasMeetingRoom === 'bottom'
                ? { gridColumn: '1 / 5', gridRow: '3 / 6' }
                : hasMeetingRoom === 'farleft'
                    ? { gridColumn: '1 / 3', gridRow: '1 / 3' }
                    : hasMeetingRoom === 'farright'
                        ? { gridColumn: '4 / 6', gridRow: '1 / 3' }
                        : {};

    return (
        <div className={styles.halfSection}>
            <div className={styles.officeLayoutHalf}>
                {showDebugInfo && <div>Section : {section}</div>}
                {hasMeetingRoom && (
                    <div className={styles.meetingRoom} style={meetingRoomStyle}>
                        <div className={meetingRoomClass}></div>
                    </div>
                )}
                {renderedDesks}
            </div>
        </div>
    );
};

export default HalfSection;