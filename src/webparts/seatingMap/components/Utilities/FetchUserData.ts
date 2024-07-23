import { MSGraphClientV3 } from '@microsoft/sp-http';
import { User } from '@microsoft/microsoft-graph-types';

interface ExcelRow {
    nameRus: string;
    FIO: string;
    section: number;
    seat: number;
    userEmails: string;

}

export interface UserWithSeat extends User {
    seat?: string;
    section?: string;
}

const fetchExcelData = async (client: MSGraphClientV3): Promise<any[]> => {
    try {
        const response = await client
            .api(`https://graph.microsoft.com/beta/sites/eneraseg.sharepoint.com,78d24909-8203-47e2-8f6c-d52b62b39808,5cb48ff4-9da9-4b5b-8ef2-051960c7a180/drives/b!CUnSeAOC4kePbNUrYrOYCPSPtFypnVtLjvIFGWDHoYDXrKfhI9hcRIVAQOzb0i9W/items/017OOUJUBXHLJDZ7O63VD3ZHUVVJOG7BEU/workbook/worksheets('{00000000-0001-0000-0000-000000000000}')/range(address='2024!B1:M300')`)
            .get();
        const values = response?.values || [];
        return values;
        //console.log(values)
    } catch (error) {
        console.error("Error fetching Excel data:", error);
        throw error;
    }
};

const processData = (excelData: any): ExcelRow[] => {
    if (Array.isArray(excelData) && excelData.length > 0) {
        const mappedData: ExcelRow[] = excelData.map((row: any) => ({
            nameRus: row[0],
            FIO: row[1],
            userEmails: row[7],
            seat: row[10],
            section: row[11],
        }));
        return mappedData;
        //console.log('mappedData',mappedData)
    } else {
        console.log("Excel data is empty or not an array.");
        return [];
    }
};

const findUserByUsernameOrEmail = (data: ExcelRow[], user: User): ExcelRow | undefined => {
    const trimmedDisplayName = user.displayName?.trim() || '';
    const principalName = user.userPrincipalName?.split('@')[0] || '';

    return data.find((excelUser) => {
        const trimmedUserRus = excelUser.nameRus.trim();
        const trimmedUserFIO = excelUser.FIO.trim();
        const excelEmails = excelUser.userEmails.split(',').map(email => email.trim().split('@')[0]);

        return trimmedUserRus === trimmedDisplayName
            || trimmedUserFIO === trimmedDisplayName
            || excelEmails.includes(principalName);
    });
};

const matchUsersWithExcelData = async (client: MSGraphClientV3): Promise<UserWithSeat[]> => {
    try {
        const excelData = await fetchExcelData(client);
        const processedExcelData = processData(excelData);

        const response = await client
            .api('/users')
            .header('ConsistencyLevel', 'eventual')
            .select('id,displayName,department,mail,userPrincipalName,businessPhones')
            .filter("endsWith(mail, '@uzmto.com')")
            .count(true)
            .top(999)
            .get();

        const users: User[] = response.value;

        const matchedUsers: UserWithSeat[] = users.map(user => {
            const excelUser = findUserByUsernameOrEmail(processedExcelData, user);
            return {
                ...user,
                seat: excelUser?.seat.toString(),
                section: excelUser?.section.toString()
            };
        });

        return matchedUsers;
    } catch (error) {
        console.error("Error matching users with Excel data:", error);
        throw error;
    }
};

export { matchUsersWithExcelData };

export const formatUserName = (fullName: string) => {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    if (nameParts.length === 1) return nameParts[0];

    const firstName = nameParts[0];
    const initials = nameParts.slice(1).map(name => name.charAt(0) + '.').join('');

    return `${firstName} ${initials}`;
};