// Floor9.tsx
import * as React from 'react';
import FullSection from "../Sections/FullSection";
import EmptyHalfSection from "../Sections/EmptyHalfSection";
import EmptyFullSection from "../Sections/EmptyFullSection";
import HalfSection from "../Sections/HalfSection";
import styles from "../SeatingMap.module.scss";
import {UserWithSeat} from "../ISeatingMapProps";

interface EmployeeDesk {
    employeeKey: string;
    employeeDep: string;
}

interface SectionConfig {
    section: number;
    hasMeetingRoom: string | boolean;
    desksPerColumn: number[];
    bossRoom: boolean;
    highlightedColumns: { column: number; rows: number[] }[];
}

interface FloorProps {
    sectionsConfig: SectionConfig[];
    employeeDesk: EmployeeDesk;
    users: UserWithSeat[];
    onDeskClick: (user: UserWithSeat | undefined) => void;
}

const FloorNine: React.FC<FloorProps> = ({ sectionsConfig, employeeDesk, users, onDeskClick }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.topSectionsCont}>
                <EmptyHalfSection text="Bathrooms"/>
                <EmptyFullSection text="Staircase"/>
                <HalfSection
                    {...sectionsConfig[7]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <HalfSection
                    {...sectionsConfig[8]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <EmptyFullSection text="Elevators"/>
                <HalfSection
                    {...sectionsConfig[9]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <HalfSection
                    {...sectionsConfig[10]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <EmptyFullSection text="Staircase"/>
                <EmptyHalfSection text="Womans Bathroom"/>
                <EmptyFullSection text="Cleaning room and staircase"/>
                <EmptyFullSection text="Taken space"/>
                <EmptyFullSection text="Elevators"/>
                <HalfSection
                    {...sectionsConfig[11]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    bossDeskPosition={{gridRow: 2, gridColumn: '1 / span 2'}}
                />
                <EmptyHalfSection text="Wardrobe"/>
            </div>

            <div style={{height: '10%'}}></div>

            <div className={styles.sectionsContainer}>
                <EmptyHalfSection text="Free Zone"/>
                {sectionsConfig.slice(0, 5).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        employeeDesk={employeeDesk}
                        users={users}
                        onDeskClick={onDeskClick}
                    />
                ))}
                <EmptyHalfSection text="Kitchen"/>
                <FullSection
                    key={`section-${sectionsConfig[13].section}`}
                    {...sectionsConfig[13]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                    bossDeskPosition={{gridRow: 1, gridColumn: '1 / span 3'}}
                />
                <FullSection
                    key={`section-${sectionsConfig[12].section}`}
                    {...sectionsConfig[12]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                {sectionsConfig.slice(5, 7).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        employeeDesk={employeeDesk}
                        users={users}
                        onDeskClick={onDeskClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default FloorNine;
