export interface IDepartment {
    departmentName: string;
    departmentAAD: string;
}

export class Department implements IDepartment {
    departmentName: string;
    departmentAAD: string;

    constructor(departmentName: string, departmentAAD?: string) {
        this.departmentName = departmentName;
        this.departmentAAD = departmentAAD || departmentName;
    }
}
