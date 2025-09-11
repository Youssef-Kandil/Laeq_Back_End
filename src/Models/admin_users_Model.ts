import { PrismaClient } from "@prisma/client";
import { adminType } from "../types/UsersTypes";
import { RenewSubscripationType,UpgradeSubscripationType } from "../types/handelSubscripationType";


const prisma = new PrismaClient();

class admin_users_Model  {
    // == Create New Admin Account ==
    public async createAccount(args:adminType) {

        try{
            
            const result = await prisma.users.create({
                data:{
                    email:args.email,
                    password:args.password,
                    role:args.role,
                    admin_users:{
                        create:{
                            full_name:args.full_name,
                            phone:args.phone,
                            register_with_google:0,
                            plan_id:args.plan_id,
                            plan_type:args.plan_type,
                            start_date:args.start_date,
                            end_date:args.end_date,
                            admin_account_limits:{
                                create:{
                                    max_branches:1,
                                    max_users:1,
                                    max_custom_checklists:0,
                                    max_Corrective_action:0,
                                    free_onsite_inspections:0,
                                    Arabic_language_support:0,
                                    Access_to_training_programs:0,
                                    Daily_monitoring_sheets:0,
                                }
                            }
                        }
                    },
                    
                }
            })

            console.warn(result)
            return result
        }catch(error){
            console.error("❌ Error creating admin:", error);
        }
    }

    // === update Admin Account
    public async renewAccountPlan(args:RenewSubscripationType) {
        console.warn(" renewAccountPlan args :",args)

        try{
            
            const result = await prisma.admin_users.update({
                where:{
                    id:args.admin_id
                },
                data:{
                    start_date:args.start_date,
                    end_date:args.end_date,
                    subscriptions:{
                        create:{
                            plan_id:args.plan_id,
                            amount:Number(args.amount),
                            transaction_id:args.transaction_id
                        }
                    },
                }
            })

            console.warn(result)
            return result
        }catch(error){
            console.error("❌ Error creating admin:", error);
        }
    }
    public async upgradeAccountPlan(args:UpgradeSubscripationType) {
        console.warn(" upgradeAccountPlan args :",args)

        try{
            
            const result = await prisma.admin_users.update({
                where:{
                    id:args.admin_id
                },
                data:{
                    start_date:args.start_date,
                    end_date:args.end_date,
                    plan_id:args.plan_id,
                    plan_type:args.plan_type,
                    subscriptions:{
                        create:{
                            plan_id:args.plan_id,
                            amount:Number(args.amount),
                            transaction_id:args.transaction_id
                        }
                    },
                    admin_account_limits:{
                        update : {
                            where:{
                                admin_id:args.admin_id
                            },
                            data: {
                                    max_branches:args.max_branches,
                                    max_users:args.max_users,
                                    max_custom_checklists:args.max_custom_checklists,
                                    max_Corrective_action:args.max_Corrective_action,
                                    free_onsite_inspections:args.free_onsite_inspections,
                                    Arabic_language_support:args.Arabic_language_support,
                                    Access_to_training_programs:args.Access_to_training_programs,
                                    Daily_monitoring_sheets:args.Daily_monitoring_sheets,
                            }
                        },
                    }
                },
                include:{
                    admin_account_limits:true
                }
            })

            console.warn(result)
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