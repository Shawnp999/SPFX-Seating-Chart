import * as React from 'react';
import FullSection from "../Sections/FullSection";
import EmptyHalfSection from "../Sections/EmptyHalfSection";
import EmptyFullSection from "../Sections/EmptyFullSection";
import HalfSection from "../Sections/HalfSection";
import styles from "../SeatingMap.module.scss";
import { UserWithSeat } from "../ISeatingMapProps";
import {useEffect} from "react";

interface EmployeeDesk {
    employeeKey: string;
    employeeDep: string;
}

interface SectionConfig {
    section: number;
    hasMeetingRoom: string | boolean;
    desks: { column: number; rows: number[] }[];
    bossRoom: boolean;
    highlightedColumns: { column: number; rows: number[] }[];
}

interface FloorProps {
    sectionsConfig: SectionConfig[];
    employeeDesk: EmployeeDesk;
    users: UserWithSeat[];
    onDeskClick: (user: UserWithSeat | undefined) => void;
    selectedFloor: number;
    highlightedUserId: string | null;
}

const FloorNine: React.FC<FloorProps> = ({ sectionsConfig, employeeDesk, users, onDeskClick, selectedFloor, highlightedUserId }) => {
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
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <HalfSection
                    {...sectionsConfig[8]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <EmptyFullSection text="Elevators" />
                <HalfSection
                    {...sectionsConfig[9]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <HalfSection
                    {...sectionsConfig[10]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    highlightedUserId={highlightedUserId}
                />
                <EmptyFullSection text="Staircase" />
                <EmptyHalfSection text="Womans Bathroom" />
                <EmptyFullSection text="Cleaning room and staircase" />
                <EmptyFullSection text="Taken space" />
                <EmptyFullSection text="Elevators" />
                <HalfSection
                    {...sectionsConfig[11]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    bossDeskPosition={{ gridRow: 2, gridColumn: '1 / span 2' }}
                    highlightedUserId={highlightedUserId}
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
                        employeeDesk={employeeDesk}
                        users={users}
                        onDeskClick={onDeskClick}
                        selectedFloor={selectedFloor}
                        highlightedUserId={highlightedUserId}
                    />
                ))}
                <EmptyHalfSection text="Kitchen" />
                <FullSection
                    key={`section-${sectionsConfig[13].section}`}
                    {...sectionsConfig[13]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    selectedFloor={selectedFloor}
                    bossDeskPosition={{ gridRow: 1, gridColumn: '1 / span 3' }}
                    highlightedUserId={highlightedUserId}
                />
                <FullSection
                    key={`section-${sectionsConfig[12].section}`}
                    {...sectionsConfig[12]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    selectedFloor={selectedFloor}
                    highlightedUserId={highlightedUserId}
                />
                {sectionsConfig.slice(5, 7).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        employeeDesk={employeeDesk}
                        users={users}
                        onDeskClick={onDeskClick}
                        selectedFloor={selectedFloor}
                        highlightedUserId={highlightedUserId}
                    />
                ))}
            </div>
        </div>
    );
};

export default FloorNine;
