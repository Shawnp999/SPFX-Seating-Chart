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
                                                 }) => {
    const deskRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const renderedDesks: JSX.Element[] = [];
    let deskCounter = 1;

    desks.forEach(({ column, rows }) => {
        rows.forEach(row => {
            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
            const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;
            const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;

            const deskClass = selectedFloor === 2
                ? row === 1
                    ? styles.deskTop
                    : row % 2 === 0
                        ? styles.deskTop
                        : styles.deskBottom
                : '';

            const deskClassNine = section === 13
                ? column % 2 !== 0
                    ? `${styles.rightDesk} ${styles.deskEven}`
                    : `${styles.leftDesk} ${styles.deskOdd}`
                : column % 2 === 0
                    ? `${styles.rightDesk} ${styles.deskEven}`
                    : `${styles.leftDesk} ${styles.deskOdd}`;


            const className = selectedFloor === 2
                ? `${styles.deskFloorTwo} ${deskClass} ${isHighlightedUser ? styles.highlightedDesk : ''} ${isHighlightedDepartment ? styles.departmentDesk : ''}`
                : `${styles.desk} ${styles.deskVertical} ${deskClassNine} ${isHighlightedUser ? styles.highlightedDesk : ''} ${isHighlightedDepartment ? styles.departmentDesk : ''}`;

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
                    {assignedUser && (
                        <div className={styles.seatText}>
                            {deskCounter}
                            {formatUserName(assignedUser.displayName || '')}
                        </div>
                    )}
                </div>
            );

            deskCounter++;
        });
    });

    const meetingRoomClass = hasMeetingRoom === 'left' ? styles.rightMeetingRoom : hasMeetingRoom === 'right' ? styles.leftMeetingRoom : styles.meetingRoomTable;

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
        <div className={styles.fullSection}>
            <div className={officeLayoutClassName}>
                {hasMeetingRoom && (

                    <div className={styles.meetingRoom} style={meetingRoomStyle}>
                        <div className={meetingRoomClass}></div>
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
                        {[...Array(section === 14 ? 1 : 2)].map((_, i) => {
                            const assignedUser = users.find(user => user.section === section.toString() && user.seat === deskCounter.toString());
                            const isHighlightedUser = assignedUser && highlightedUserId && assignedUser.id === highlightedUserId;
                            const isHighlightedDepartment = assignedUser && highlightedDepartment && assignedUser.department === highlightedDepartment;
                            return (
                                <div
                                    key={`boss-${i + 1}`}
                                    ref={el => {
                                        deskRefs.current[deskCounter - 1] = el;
                                    }}
                                    className={`${styles.deskBossCenterDown} ${styles.bossDeskDown} ${styles.flexStart} ${isHighlightedUser ? styles.highlightedDesk : ''} ${isHighlightedDepartment ? styles.departmentDesk : ''}`}
                                    style={bossDeskPosition || { gridRow: 2, gridColumn: '1 / span 2' } }
                                    onClick={() => onDeskClick(assignedUser)}
                                    data-testid={`desk-${section}-boss-${i + 1}`}
                                >
                                    {assignedUser && (
                                        <div className={styles.seatText}>
                                            {formatUserName(assignedUser.displayName || '')}
                                            {deskCounter++}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FullSection;
