import {WebPartContext} from '@microsoft/sp-webpart-base';
import {User} from "@microsoft/microsoft-graph-types";

export interface ISeatingMapProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    context: WebPartContext;
}


export interface UserWithSeat extends User {
    seat?: string;
    section?: string;
}
