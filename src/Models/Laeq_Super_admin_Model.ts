import { PrismaClient } from "@prisma/client";
import { adminType ,laeq_user} from "../types/UsersTypes";
import encryption from "../Utils/encryption";


const prisma = new PrismaClient();



class Laeq_Super_admin_Model  {
    // == Create New Leeq Super Admin Account ==
    public async createSuperLaeqAccount(args:laeq_user) {

        try{
            
            const result = await prisma.users.create({
                data:{
                    email:args.email,
                    password:args.password,
                    roll:args.role,
                    super_admins:{
                        create:{
                            full_name:args.full_name,
                        }
                    }
                }
            })


            return result
        }catch(error){
            console.error("❌ Error creating admin:", error);
        }
    };

    // == Search For An Account in DataBase ==
    public async editSuperAdminInfo_ByID(args: laeq_user) {
        try {
            const result = await prisma.super_admins.update({
                where: {
                    id: args.id
                },
                data:{
                    full_name:args.full_name
                }
            });
            return result;
        } catch (error) {
            console.error("❌ Error updating super admin info:", error);
        }
    };

    
}

export default new Laeq_Super_admin_Model();