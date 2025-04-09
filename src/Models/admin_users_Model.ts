import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

class admin_users_Model  {
    // == Create New Admin Account ==
    public async createAccount(requestData:any) {

        try{
            const result = await prisma.$transaction(async (tx)=>{
                // === Auth Table ===
                const authUser = await tx.auth.create({
                    data:{
                        email:requestData.hashed_Email,
                        password:requestData.hashed_Password,
                        is_admin:1,
                    }
                })           
                // === Admin Users Table ===
                const adminUser = await tx.admin_users.create({
                    data: {
                        full_name:requestData.full_name,
                        auth_id:authUser.id,
                        phone:requestData.hashed_Phone,
                        register_with_google:requestData.register_with_google,
                        // === Plan ===
                        start_date:  Date.now()+"",
                        end_date:requestData.end_date,
                        plan_id:requestData.plan_id,
                        plan_type:requestData.plan_type,
                    }
                });
                // === Return Data ===
                return {  authUser, adminUser };
            });
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
                        auth_id:authUser.id,
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