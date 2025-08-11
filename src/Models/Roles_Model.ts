import { PrismaClient } from "@prisma/client";
import { Full_RolePermions } from "../types/RolesTypes";


const prisma = new PrismaClient();


class Roles_Model  {
    // === Get All Roles Created By Admin
        public async FetchRolesCreatedByAdminFromDB(arg:{admin_id:number}){
            const result =  await prisma.roles.findMany({
                where:{
                    admin_id:arg.admin_id
                },
                include:{
                    role_permissions:{
                        include:{
                            permissions:true
                        }
                    }
                }
            })


            console.warn("Model : ",result)
            return result
        }

    // === Add New Role
        public async PostNewRoleByAdminID(args:Full_RolePermions){
            const res =  await prisma.roles.create({
                data:{
                    role_name:args.role_name,
                    description:args.description,
                    admin_id:args.admin_id,
                    role_permissions:{
                        create: args.permissionsIds.map((permId) => ({
                        permission_id: permId
                        }))
                    }
                },

                include:{
                    role_permissions:{
                        include:{
                            permissions:true
                        }
                    }
                }
            })
            console.warn("Model : ",res)
            return res
        }
}

export default new Roles_Model();