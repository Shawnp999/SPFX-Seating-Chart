// src/components/SeatingMap.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ISeatingMapProps } from './ISeatingMapProps';
import FloorNine from "./Floor9/FloorNine";
import FloorTwo from "./FloorTwo/FloorTwo";
import { matchUsersWithExcelData } from './Utilities/FetchUserData';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { sectionsConfig } from './Utilities/sectionsConfig';
import styles from './SeatingMap.module.scss';
import { OrgStructure } from './Departments/Orgstructure';

interface EmployeeDesk {
    employeeKey: string;
    employeeDep: string;
}

interface UserWithSeat extends MicrosoftGraph.User {
    seat?: string;
    section?: string;
}

const NoUserPhotoUrl = `https://eneraseg.sharepoint.com/sites/UZMTO2/foto_employees/NoPhoto/nophoto.jpg`;

const sectionToFloorMap = {
    9: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    2: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
};

const getFloorBySection = (section: number) => {
    if (sectionToFloorMap[9].includes(section)) return 9;
    if (sectionToFloorMap[2].includes(section)) return 2;
    return 9; // Default to floor 9 if section is not found
};

const SeatingMap: React.FunctionComponent<ISeatingMapProps> = (props: ISeatingMapProps) => {
    const [users, setUsers] = useState<UserWithSeat[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserWithSeat | undefined>(undefined);
    const [isDialogHidden, setIsDialogHidden] = useState(true);
    const [selectedFloor, setSelectedFloor] = useState(9);
    const [highlightedUserId, setHighlightedUserId] = useState<string | null>(null);

    const employeeDesk: EmployeeDesk = {
        employeeKey: '',
        employeeDep: '',
    };

    const orgStructure = new OrgStructure();
    orgStructure.init();

    const orgStructureMap: Map<string, string> = new Map();

    orgStructure.departments.forEach(dep => {
        orgStructureMap.set(dep.departmentAAD, dep.departmentName);
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("userId");
        if (userId) {
            setHighlightedUserId(userId);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const graphClient = await props.context.msGraphClientFactory.getClient('3');
                const matchedUsers = await matchUsersWithExcelData(graphClient);
                setUsers(matchedUsers);
                console.log('Matched users:', matchedUsers);

                if (highlightedUserId) {
                    const user = matchedUsers.find(u => u.id === highlightedUserId);
                    if (user && user.section) {
                        const userSection = parseInt(user.section, 10);
                        const floor = getFloorBySection(userSection);
                        setSelectedFloor(floor);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData().catch(error => console.error("Unhandled error in fetchData:", error));
    }, [highlightedUserId]);

    const correctUserDepartmentName = (incorrectDepartmentName: MicrosoftGraph.NullableOption<string> | undefined): string => {
        if (incorrectDepartmentName === null || incorrectDepartmentName === undefined) {
            return 'No department';
        }

        const departmentValue = incorrectDepartmentName as string;

        if (departmentValue === null) {
            return 'No department';
        }

        const correctDepartment = orgStructure.departments.find(dep => dep.departmentAAD === departmentValue);

        if (correctDepartment === undefined) {
            return departmentValue;
        }

        return correctDepartment.departmentName;
    };

    users.forEach(user => {
        user.department = correctUserDepartmentName(user.department || undefined);
    });

    const handleDeskClick = (user: UserWithSeat | undefined) => {
        setSelectedUser(user);
        setIsDialogHidden(false);
    };

    return (
        <div>
            <div className={styles.floorBtnCont}>
                <PrimaryButton onClick={() => setSelectedFloor(9)} text="Floor 9" />
                <PrimaryButton onClick={() => setSelectedFloor(2)} text="Floor 2" />
            </div>

            {selectedFloor === 9 && (
                <FloorNine
                    sectionsConfig={sectionsConfig}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                    selectedFloor={selectedFloor}
                    highlightedUserId={highlightedUserId}
                />
            )}

            {selectedFloor === 2 && (
                <FloorTwo
                    sectionsConfig={sectionsConfig}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                    selectedFloor={selectedFloor}
                    highlightedUserId={highlightedUserId}
                />
            )}

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
                        <p>Internal Number(s): {selectedUser.businessPhones}</p>
                    </div>
                ) : (
                    <p>No user found for this seat.</p>
                )}
                <DialogFooter>
                    <DefaultButton onClick={() => setIsDialogHidden(true)} text="Close" />
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
