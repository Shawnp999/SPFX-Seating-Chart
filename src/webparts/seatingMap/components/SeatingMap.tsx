import * as React from 'react';
import { ISeatingMapProps } from './ISeatingMapProps';
import FloorNine from "./Floor9/FloorNine";
import FloorTwo from "./FloorTwo/FloorTwo";
import { matchUsersWithExcelData } from './Utilities/FetchUserData';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useState } from 'react';
import { sectionsConfig } from './Utilities/sectionsConfig';

interface EmployeeDesk {
    employeeKey: string;
    employeeDep: string;
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
    const [selectedFloor, setSelectedFloor] = useState(1);

    const employeeDesk: EmployeeDesk = {
        employeeKey: '11',
        employeeDep: '6',
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

    React.useEffect(() => {
        console.log('Users state updated:', users);
    }, [users]);

    const handleDeskClick = (user: UserWithSeat | undefined) => {
        setSelectedUser(user);
        setIsDialogHidden(false);
    };

    return (
        <div>
            <div>
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
                />
            )}

            {selectedFloor === 2 && (
                <FloorTwo
                    sectionsConfig={sectionsConfig}
                    employeeDesk={employeeDesk}
                    users={users}
                    onDeskClick={handleDeskClick}
                    selectedFloor={selectedFloor}
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
