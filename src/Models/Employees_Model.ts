import { PrismaClient } from "@prisma/client";
import { employeeType } from "../types/UsersTypes";


const prisma = new PrismaClient();


class Employees_Model  {
    // === Get All EMPS Created By Admin
        public async FetchEmployeesCreatedByAdminFromDB(arg:{admin_id:number}){
            const result =  await prisma.employees.findMany({
                where:{
                    admin_id:arg.admin_id
                },
                include:{
                    sites:{
                        select:{
                            site_name:true
                        }
                    },
                    users:{
                        select:{
                            email:true
                        }
                    },
                    roles:{
                        select:{
                            id:true,
                            role_name:true,
                        }
                    }
                }
            })


            console.warn("Model : ",result)
            return result
        }

    // === Add New Emp
        public async PostNewEmployeeByAdminID(args:employeeType){
            const res =  await prisma.users.create({
                data:{
                    email:args.email,
                    password:args.password,
                    role:"employee",

                    employees:{
                        create:{
                            admin_id:args.admin_id,
                            full_name:args.full_name,
                            phone:args.phone,
                            job_title:args.job_title,
                            is_active:args.is_active,
                            company_id:args.company_id,
                            site_id:args.site_id,
                            role_id:args.role_id
                        }
                    }

                }
            })
            console.warn("Model : ",res)
            return res
        }
}

export default new Employees_Model();