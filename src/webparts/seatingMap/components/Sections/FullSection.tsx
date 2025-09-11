import * as React from 'react';
import styles from '../SeatingMap.module.scss';
import { UserWithSeat as ImportedUserWithSeat, formatUserName } from '../Utilities/FetchUserData';

interface FullSectionProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desks: { column: number; rows: number[] }[];
    bossRoom: boolean;
    users: ImportedUserWithSeat[];
    onDeskClick: (user: ImportedUserWithSeat | undefined) => void;
    selectedFloor: number;
    bossDeskPosition?: { gridRow: number; gridColumn: string };
    highlightedUserId: string | null;
    highlightedDepartment: string | null;
    currentUserId?: string;
}

const FullSection: React.FC<FullSectionProps> = ({
    section,
    hasMeetingRoom,
    desks,
    bossRoom,
    users,
    onDeskClick,
    selectedFloor,
    bossDeskPosition,
    highlightedUserId,
    highlightedDepartment,
    currentUserId,
}) => {
    const deskRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
    const renderedDesks: JSX.Element[] = [];
    let deskCounter = 1;

    // Check if current user is one of the two special users
    const showDebugInfo = currentUserId === '35017994-7401-4011-bee5-9d74e9454516' || 
                         currentUserId === 'b947e7da-7da9-4200-9046-ca0b3b3d9f7a' || 
                         currentUserId === 'd74c2ed9-0a7c-4929-b184-9e1beae268d7';  

    React.useEffect(() => {
        if (highlightedUserId) {
            const highlightedUser = users.find(user => user.id === highlightedUserId);
            if (highlightedUser && highlightedUser.seat) {
                const deskKey = `${section}-${highlightedUser.seat}`;
                const highlightedDesk = deskRefs.current[deskKey];

                if (highlightedDesk) {
                    highlightedDesk.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    const bossDeskKey = `boss-${highlightedUser.seat}`;
                    const highlightedBossDesk = deskRefs.current[bossDeskKey];
                    if (highlightedBossDesk) {
                        highlightedBossDesk.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        }
    }, [highlightedUserId, users, section]);

    // Render normal desks
    desks.forEach(({ column, rows }) => {
        rows.forEach(row => {
            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
            const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;
            const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;

            let deskClass = '';
            if (selectedFloor === 2) {
                if (row === 1 || row === 3) {
                    deskClass = isHighlightedUser
                        ? styles.smallDeskSeatDownHighlighted
                        : styles.smallDeskDownTwo;
                } else if (row === 2 || row === 4) {
                    deskClass = isHighlightedUser
                        ? styles.smallDeskSeatUpHighlighted
                        : styles.smallDeskUpTwo;
                } else {
                    deskClass = styles.smallDeskDownTwo;
                }
            } else {
                deskClass = section === 13
                    ? column % 2 !== 0
                        ? isHighlightedUser ? styles.highlightedSeatRightChair : `${styles.rightDesk} ${styles.deskEven}`
                        : isHighlightedUser ? styles.highlightedSeatLeftChair : `${styles.leftDesk} ${styles.deskOdd}`
                    : column % 2 === 0
                        ? isHighlightedUser ? styles.highlightedSeatRightChair : `${styles.rightDesk} ${styles.deskEven}`
                        : isHighlightedUser ? styles.highlightedSeatLeftChair : `${styles.leftDesk} ${styles.deskOdd}`;
            }

            const className = selectedFloor === 2
                ? `${styles.deskFloorTwo} ${deskClass} ${isHighlightedDepartment ? styles.departmentDesk : ''}`
                : `${styles.desk} ${styles.deskVertical} ${deskClass} ${isHighlightedDepartment ? styles.departmentDesk : ''}`;

            renderedDesks.push(
                <div
                    key={`${column}-${row}`}
                    ref={el => {
                        deskRefs.current[`${section}-${deskCounter}`] = el;
                    }}
                    className={className}
                    style={{ gridRow: row, gridColumn: column }}
                    onClick={() => onDeskClick(assignedUser)}
                    data-testid={`desk-${section}-${deskCounter}`}
                >
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
            );

            deskCounter++;
        });
    });

    // Render boss desks starting after the last normal desk index
    const bossDeskStartingIndex = deskCounter;

    if (bossRoom) {
        renderedDesks.push(
            <div
                style={{
                    gridColumn: '1 / 5',
                    gridRow: '5 / 6',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'end',
                }}
            >
                {[...Array(section === 14 ? 1 : 2)].map((_, i) => {
                    const assignedUser = users.find(user => user.section === section.toString() && user.seat === (bossDeskStartingIndex + i).toString());
                    const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;
                    const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;
                    return (
                        <div
                            key={`boss-${i + 1}`}
                            ref={el => {
                                deskRefs.current[`boss-${bossDeskStartingIndex + i}`] = el;
                            }}
                            className={`${styles.deskBossCenterDown} ${styles.bossDeskDown} ${styles.flexStart} 
                                ${isHighlightedUser ? styles.bossDeskDownHighlighted : ''} 
                                ${isHighlightedDepartment ? styles.departmentDesk : ''}`}
                            style={bossDeskPosition || { gridRow: 2, gridColumn: '1 / span 2' }}
                            onClick={() => onDeskClick(assignedUser)}
                            data-testid={`desk-${section}-boss-${i + 1}`}
                        >
                            <div className={styles.seatText}>
                                {showDebugInfo ? (
                                    <>
                                        {bossDeskStartingIndex + i}&nbsp;
                                        {assignedUser && formatUserName(assignedUser.displayName || '')}
                                    </>
                                ) : (
                                    assignedUser && formatUserName(assignedUser.displayName || '')
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

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

    const officeLayoutClassName = selectedFloor === 2
        ? `${styles.officeLayout} ${styles.officeLayoutTwo}`
        : `${styles.officeLayout}`;

    return (
        <div className={styles.fullSection}>
            <div className={officeLayoutClassName}>
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

export default FullSection;