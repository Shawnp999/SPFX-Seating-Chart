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
            .api(`https://graph.microsoft.com/beta/sites/eneraseg.sharepoint.com,78d24909-8203-47e2-8f6c-d52b62b39808,5cb48ff4-9da9-4b5b-8ef2-051960c7a180/drives/b!CUnSeAOC4kePbNUrYrOYCPSPtFypnVtLjvIFGWDHoYDXrKfhI9hcRIVAQOzb0i9W/items/017OOUJUBXHLJDZ7O63VD3ZHUVVJOG7BEU/workbook/worksheets('{517B3F23-7EC3-40AE-8DCF-0C986B6D5233}')/range(address='B1:M220')`)
            .get();
        const values = response?.values || [];
        console.log('values', values)
        return values;
    } catch (error) {
        console.error("Error fetching Excel data:", error);
        throw error;
    }
};

const processData = (excelData: any): ExcelRow[] => {
    if (Array.isArray(excelData) && excelData.length > 0) {
        const mappedData: ExcelRow[] = excelData.map((row: any) => ({
            nameRus: row[0] || '',
            FIO: row[1] || '',
            userEmails: row[8] || '',
            seat: row[6],
            section: row[7],
        }));
        return mappedData;
    } else {
        console.log("Excel data is empty or not an array.");
        return [];
    }
};

const findUserByUsernameOrEmail = (data: ExcelRow[], user: User): ExcelRow | undefined => {
    const trimmedDisplayName = user.displayName?.trim() || '';
    const userEmail = user.mail?.toLowerCase() || '';

    return data.find((excelUser) => {
        const trimmedUserRus = excelUser.nameRus?.trim() || '';
        const trimmedUserFIO = excelUser.FIO?.trim() || '';
        const excelEmail = (excelUser.userEmails || '').toString().toLowerCase();

        // Match by name or email
        return trimmedUserRus === trimmedDisplayName ||
            trimmedUserFIO === trimmedDisplayName ||
            excelEmail === userEmail;
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
                seat: excelUser?.seat?.toString(),
                section: excelUser?.section?.toString()
            };
        });

        return matchedUsers;

        console.log(matchedUsers, 'matchedUsers')
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