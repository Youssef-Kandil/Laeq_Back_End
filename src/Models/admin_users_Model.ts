import { PrismaClient } from "@prisma/client";
import { adminType } from "../types/UsersTypes";


const prisma = new PrismaClient();

class admin_users_Model  {
    // == Create New Admin Account ==
    public async createAccount(args:adminType) {

        try{
            
            const result = await prisma.users.create({
                data:{
                    email:args.email,
                    password:args.password,
                    roll:args.role,
                    admin_users:{
                        create:{
                            full_name:args.full_name,
                            phone:args.phone,
                            register_with_google:0,
                            plan_id:args.plan_id,
                            plan_type:args.plan_type,
                            start_date:args.start_date,
                            end_date:args.end_date
                        }
                    }
                }
            })


            return result
        }catch(error){
            console.error("❌ Error creating admin:", error);
        }
    }

    // == Create New Admin Account With Google ==
    public async createAccountWithGoogle(requestData:any) {

        try{
            const result = await prisma.$transaction(async (tx)=>{
                // === Auth Table ===
                const authUser = await tx.auth.create({
                    data:{
                        email:requestData.hashed_Email,
                        provider:requestData.provider,
                        is_admin:1,
                    }
                })           
                // === Admin Users Table ===
                const adminUser = await tx.admin_users.create({
                    data: {
                        full_name:requestData.full_name,
                        user_id:requestData.userID,
                        phone:requestData.hashed_Phone,
                        register_with_google:requestData.register_with_google,
                        // === Plan ===
                         start_date: new Date()+"",
                         end_date:requestData.end_date,
                         plan_id:requestData.plan_id,
                         plan_type:requestData.plan_type,
                    }
                });
                // === Return Data ===
                return { authUser, adminUser };
            });
            return result
        }catch(error){
            console.error("❌ Error creating admin:", error);
        }
    }

}

export default new admin_users_Model();