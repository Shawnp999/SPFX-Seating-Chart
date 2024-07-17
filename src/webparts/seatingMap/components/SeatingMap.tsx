import * as React from 'react';
import {ISeatingMapProps} from './ISeatingMapProps';
import FullSection from './Sections/FullSection';
import EmptyHalfSection from './Sections/EmptyHalfSection';
import EmptyFullSection from './Sections/EmptyFullSection';
import HalfSection from './Sections/HalfSection';
// import BossOffice from './Sections/BossOfficeHalf';
import styles from './SeatingMap.module.scss';
import {matchUsersWithExcelData} from './Sections/FetchUserData';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {Dialog, DialogType, DialogFooter} from '@fluentui/react/lib/Dialog';
import {DefaultButton} from '@fluentui/react/lib/Button';
import {useState} from 'react';

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


interface UserWithSeat extends MicrosoftGraph.User {
    seat?: string;
    section?: string;
}

const NoUserPhotoUrl = `https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/NoPhoto/nophoto.jpg`;

const SeatingMap: React.FunctionComponent<ISeatingMapProps> = (props: ISeatingMapProps) => {
    const [users, setUsers] = React.useState<UserWithSeat[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserWithSeat | undefined>(undefined);
    const [isDialogHidden, setIsDialogHidden] = useState(true);

    const employeeDesk: EmployeeDesk = {
        employeeKey: '17',
        employeeDep: '3',
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const graphClient = await props.context.msGraphClientFactory.getClient('3');

                const matchedUsers = await matchUsersWithExcelData(graphClient);
                setUsers(matchedUsers);
                console.log('Matched users:', matchedUsers);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData().catch(error => console.error("Unhandled error in fetchData:", error));
    }, []);

    const sectionsConfig: SectionConfig[] = [
        {
            section: 1,
            hasMeetingRoom: 'left',
            desksPerColumn: [3, 3, 5, 5],
            bossRoom: false,
            highlightedColumns: [],
        },
        {
            section: 2,
            hasMeetingRoom: 'left',
            desksPerColumn: [3, 3, 5, 5],
            bossRoom: false,
            highlightedColumns: [],
        },
        {
            section: 3,
            hasMeetingRoom: 'left',
            desksPerColumn: [3, 3, 5, 5],
            bossRoom: false,
            highlightedColumns: [],
        },
        {
            section: 4,
            hasMeetingRoom: 'left',
            desksPerColumn: [3, 3, 5, 5],
            bossRoom: false,
            highlightedColumns: [],
        },
        {
            section: 5,
            hasMeetingRoom: 'left',
            desksPerColumn: [3, 3, 5, 5],
            bossRoom: false,
            highlightedColumns: [],
        },
        {
            section: 6,
            hasMeetingRoom: 'right',
            desksPerColumn: [4, 4, 2, 3],
            bossRoom: true,
            highlightedColumns: [],
        },
        {
            section: 7,
            hasMeetingRoom: false,
            desksPerColumn: [4, 4, 4, 5],
            bossRoom: true,
            highlightedColumns: [],
        },
        {
            section: 8,
            hasMeetingRoom: 'false',
            desksPerColumn: [2, 2],
            bossRoom: false,
            highlightedColumns: [],
        },
        {
            section: 9,
            hasMeetingRoom: 'false',
            desksPerColumn: [0, 0],
            bossRoom: true,
            highlightedColumns: [],
        },
        {
            section: 10,
            hasMeetingRoom: 'false',
            desksPerColumn: [0, 0],
            bossRoom: true,
            highlightedColumns: [],
        },
        {
            section: 11,
            hasMeetingRoom: 'false',
            desksPerColumn: [0, 0],
            bossRoom: true,
            highlightedColumns: [],
        },
        {
            section: 12,
            hasMeetingRoom: 'false',
            desksPerColumn: [1],
            bossRoom: true,
            highlightedColumns: [],
        },
        {
            section: 13,
            hasMeetingRoom: 'bottom',
            desksPerColumn: [0, 0, 2],
            bossRoom: false,
            highlightedColumns: [],
        },


    ];

    React.useEffect(() => {
        console.log('Users state updated:', users);
    }, [users]);

    const handleDeskClick = (user: UserWithSeat | undefined) => {
        setSelectedUser(user);
        setIsDialogHidden(false);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.topSectionsCont}>
                <EmptyHalfSection text="Bathrooms"/>
                <EmptyFullSection text="Staircase"/>
                <HalfSection
                    {...sectionsConfig[7]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                />
                <HalfSection
                    {...sectionsConfig[8]} // Use section 9 with custom boss desk position
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                />
                <EmptyFullSection text="Elevators"/>
                <HalfSection
                    {...sectionsConfig[9]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                />
                <HalfSection
                    {...sectionsConfig[10]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
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
                    onDeskClick={handleDeskClick}
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
                        onDeskClick={handleDeskClick}
                    />
                ))}
                <EmptyHalfSection text="Kitchen"/>
                <EmptyFullSection/>
                <FullSection
                    key={`section-${sectionsConfig[12].section}`}
                    {...sectionsConfig[12]}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                />
                {sectionsConfig.slice(5, 7).map((config, index) => (
                    <FullSection
                        key={`section-${config.section}`}
                        {...config}
                        employeeDesk={employeeDesk}
                        users={users}
                        onDeskClick={handleDeskClick}
                    />
                ))}
            </div>

            <Dialog
                hidden={isDialogHidden}
                onDismiss={() => setIsDialogHidden(true)}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'User Details',
                }}
            >
                {selectedUser ? (
                    <div>
                        <img
                            src={`https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/${selectedUser.mail?.replace('@uzmto.com', '')}/profile.jpg` || NoUserPhotoUrl}
                            alt="User Photo"
                            onError={(e) => {
                                e.currentTarget.src = NoUserPhotoUrl;
                                e.currentTarget.style.borderRadius = '10px';
                                e.currentTarget.style.objectFit = 'cover';
                                e.currentTarget.style.width = '100%';
                            }}
                            style={{
                                width: '100%',
                                cursor: 'pointer',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />

                        <p>Display Name: {selectedUser.displayName}</p>
                        <p>Department: {selectedUser.department}</p>
                    </div>
                ) : (
                    <p>No user found for this seat.</p>
                )}
                <DialogFooter>
                    <DefaultButton onClick={() => setIsDialogHidden(true)} text="Close"/>

                    {selectedUser && typeof selectedUser.id === 'string' && selectedUser.id.length > 0 && (
                        <DefaultButton
                            href={`https://eneraseg.sharepoint.com/sites/UZMTO2/SitePages/profile-page.aspx?userId=${selectedUser.id}`}
                            text="See Profile"
                        />
                    )}

                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default SeatingMap;
