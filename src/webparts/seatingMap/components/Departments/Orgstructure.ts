import {Department} from "./department";

export class OrgStructure {


    departments: Department[] = [];


    public init() {

        this.departments = []

        const projectControlDep = new Department("Департамент проектного контроля", "")
        ;
        this.departments.push(projectControlDep);



        const itDep = new Department("Департамент информационных технологий", "")

        this.departments.push(itDep);



        const PeronManagmentdep = new Department("Департамент управления персоналом", "")
        this.departments.push(PeronManagmentdep);



        const Constructiondep = new Department("Департамент строительства", "")
        this.departments.push(Constructiondep);



        const Auditordep = new Department("Департамент внутреннего аудита, организационного развития и стратегии", "Департамент внутреннего аудита, организационного развития и стра" )

        this.departments.push(Auditordep);



        const desmanagmentdep = new Department("Департамент управления проектированием", "")
        this.departments.push(desmanagmentdep);



        const financecondep = new Department("Департамент экономики и финансов", "")

        this.departments.push(financecondep);




        const admindep = new Department("Административно-хозяйственный департамент", "")

        this.departments.push(admindep);




        const ESGdep = new Department("Департамент экологического, социального и корпоративного управления", "Департамент экологического, социального и корпоративного управле")

        this.departments.push(ESGdep);



        const legaldep = new Department("Департамент корпоративно-правовой работы", "")

        this.departments.push(legaldep);



        const matprocurement = new Department("Департамент закупок оборудования и материалов", "")

        this.departments.push(matprocurement);



        const pubrelationsdep = new Department("Департамент связей с общественностью", "")

        this.departments.push(pubrelationsdep);



        const secuiritydep = new Department("Департамент безопасности и корпоративного регулирования", "")

        this.departments.push(secuiritydep);



        const laborprotdep = new Department("Департамент охраны труда, промышленной безопасности и охраны окружающей среды", "") //, "HSES"

        this.departments.push(laborprotdep);


        const businessanalytics = new Department("Департамент аналитики и развития бизнеса", "")

        this.departments.push(businessanalytics);



        const marketdep = new Department( "Департамент маркетинга", "")

        this.departments.push(marketdep);



        const managementdep = new Department("Менеджмент", "")

        this.departments.push(managementdep);


    }


}



