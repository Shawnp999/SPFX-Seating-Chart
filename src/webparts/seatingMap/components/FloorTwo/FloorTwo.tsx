import * as React from 'react';
import FullSection from "../Sections/FullSection";
import EmptyHalfSection from "../Sections/EmptyHalfSection";
import EmptyFullSection from "../Sections/EmptyFullSection";
import HalfSection from "../Sections/HalfSection";
import styles from "../SeatingMap.module.scss";
import { UserWithSeat } from "../ISeatingMapProps";

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
}

const FloorTwo: React.FC<FloorProps> = ({ sectionsConfig, employeeDesk, users, onDeskClick, selectedFloor }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.topSectionsCont}>
                <EmptyFullSection text="Bathroom" />
                <EmptyFullSection text="Staircase" />
                <HalfSection
                    {...sectionsConfig[20]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <HalfSection
                    {...sectionsConfig[21]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <EmptyFullSection text="Elevators" />
                <HalfSection
                    {...sectionsConfig[22]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
                />
                <HalfSection
                    {...sectionsConfig[23]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={onDeskClick}
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
                        employeeDesk={employeeDesk}
                        users={users}
                        onDeskClick={onDeskClick}
                        selectedFloor={selectedFloor}
                    />
                ))}
                <EmptyHalfSection text="Kitchen" />
            </div>
        </div>
    );
};

export default FloorTwo;
