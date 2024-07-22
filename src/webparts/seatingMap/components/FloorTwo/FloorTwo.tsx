// src/components/FloorTwo.tsx
import * as React from 'react';
import FullSection from "../Sections/FullSection";
import EmptyHalfSection from "../Sections/EmptyHalfSection";
import EmptyFullSection from "../Sections/EmptyFullSection";
import HalfSection from "../Sections/HalfSection";
import styles from "../SeatingMap.module.scss";
import { UserWithSeat } from "../ISeatingMapProps";
import {useEffect} from "react";



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
}

const FloorTwo: React.FC<FloorProps> = ({ sectionsConfig,  users, onDeskClick, selectedFloor, highlightedUserId }) => {
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
                <EmptyFullSection text="Bathroom" />
                <EmptyFullSection text="Staircase" />
                <HalfSection
                    {...sectionsConfig[20]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <HalfSection
                    {...sectionsConfig[21]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <EmptyFullSection text="Elevators" />
                <HalfSection
                    {...sectionsConfig[22]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <HalfSection
                    {...sectionsConfig[23]}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <EmptyFullSection text="Staircase" />
                <EmptyHalfSection text="Womans Bathroom" />
            </div>

            <div style={{ height: '10%' }}></div>

            <div className={styles.sectionsContainer}>
                <EmptyHalfSection text="Kitchen" />
                <EmptyHalfSection text="Kitchen" />
                {sectionsConfig.slice(14, 19).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        users={users}
                        onDeskClick={onDeskClick}
                        selectedFloor={selectedFloor}
                        highlightedUserId={highlightedUserId}
                    />
                ))}
                <EmptyHalfSection text="Kitchen" />
            </div>
        </div>
    );
};

export default FloorTwo;
