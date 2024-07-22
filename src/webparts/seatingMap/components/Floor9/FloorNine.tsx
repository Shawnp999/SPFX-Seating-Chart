import * as React from 'react';
import FullSection from "../Sections/FullSection";
import EmptyHalfSection from "../Sections/EmptyHalfSection";
import EmptyFullSection from "../Sections/EmptyFullSection";
import HalfSection from "../Sections/HalfSection";
import styles from "../SeatingMap.module.scss";
import { UserWithSeat } from "../ISeatingMapProps";
import { useEffect } from "react";

interface SectionConfig {
    section: number;
    hasMeetingRoom: string | boolean;
    desks: { column: number; rows: number[] }[];
    bossRoom: boolean;
}

interface FloorProps {
    sectionsConfig: SectionConfig[];
    users: UserWithSeat[];
    onDeskClick: (user: UserWithSeat | undefined) => void;
    selectedFloor: number;
    highlightedUserId: string | null;
    highlightedDepartment: string | null;
}

const FloorNine: React.FC<FloorProps> = ({ sectionsConfig, users, onDeskClick, selectedFloor, highlightedUserId, highlightedDepartment }) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (highlightedUserId && containerRef.current) {
            const highlightedUser = users.find(user => user.id === highlightedUserId);
            if (highlightedUser) {
                const highlightedDesk = containerRef.current.querySelector(`[data-testid="desk-${highlightedUser.section}-${highlightedUser.seat}"]`);
                if (highlightedDesk) {
                    (highlightedDesk as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }, [highlightedUserId, users]);

    return (
        <div className={styles.mainContainer} ref={containerRef}>
            <div className={styles.topSectionsCont}>
                <EmptyHalfSection text="Bathrooms" />
                <EmptyFullSection text="Staircase" />
                <HalfSection
                    {...sectionsConfig[7]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                <HalfSection
                    {...sectionsConfig[8]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                <EmptyFullSection text="Elevators" />
                <HalfSection
                    {...sectionsConfig[9]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                <HalfSection
                    {...sectionsConfig[10]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                <EmptyFullSection text="Staircase" />
                <EmptyHalfSection text="Womans Bathroom" />
                <EmptyFullSection text="Cleaning room and staircase" />
                <EmptyFullSection text="Taken space" />
                <EmptyFullSection text="Elevators" />
                <HalfSection
                    {...sectionsConfig[11]}
                    users={users}
                    onDeskClick={onDeskClick}
                    bossDeskPosition={{ gridRow: 2, gridColumn: '1 / span 2' }}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                <EmptyHalfSection text="Wardrobe" />
            </div>

            <div style={{ height: '10%' }}></div>

            <div className={styles.sectionsContainer}>
                <EmptyHalfSection text="Free Zone" />
                {sectionsConfig.slice(0, 5).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        users={users}
                        onDeskClick={onDeskClick}
                        selectedFloor={selectedFloor}
                        highlightedUserId={highlightedUserId}
                        highlightedDepartment={highlightedDepartment}
                    />
                ))}
                <EmptyHalfSection text="Kitchen" />
                <FullSection
                    key={`section-${sectionsConfig[13].section}`}
                    {...sectionsConfig[13]}
                    users={users}
                    onDeskClick={onDeskClick}
                    selectedFloor={selectedFloor}
                    bossDeskPosition={{ gridRow: 1, gridColumn: '1 / span 3' }}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                <FullSection
                    key={`section-${sectionsConfig[12].section}`}
                    {...sectionsConfig[12]}
                    users={users}
                    onDeskClick={onDeskClick}
                    selectedFloor={selectedFloor}
                    highlightedUserId={highlightedUserId}
                    highlightedDepartment={highlightedDepartment}
                />
                {sectionsConfig.slice(5, 7).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        users={users}
                        onDeskClick={onDeskClick}
                        selectedFloor={selectedFloor}
                        highlightedUserId={highlightedUserId}
                        highlightedDepartment={highlightedDepartment}
                    />
                ))}
            </div>
        </div>
    );
};

export default FloorNine;
