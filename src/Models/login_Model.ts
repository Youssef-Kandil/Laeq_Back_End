import { PrismaClient } from "@prisma/client";
import { adminType ,employeeType} from "../types/UsersTypes";
import encryption from "../Utils/encryption";


const prisma = new PrismaClient();



class login_Model  {
    // == Search For An Account in DataBase ==
    public async searchForAccount(requestData:{email:string , password:string}) {

        try{

            // === Check if email and password are correct ===
            const loginResult = await prisma.users.findFirst({
              where:{
                email:requestData.email,
                password:requestData.password,
              },
              select:{
                id:true,
                email:true,
                role:true
              }
            })

            if (!loginResult) {
              throw new Error("❌ Invalid credentials");
            }

            // === Check If The User Is Admin Or Not To Search In Correct Table ===
             let userDetails = null;
            if (loginResult.role === "admin") {
                userDetails = await prisma.admin_users.findFirst({
                  where: { user_id: loginResult.id },
                  select:{
                    id:true,
                    full_name:true,
                    phone:true,
                    plan_id:true,
                    plan_type:true,
                    start_date:true,
                    end_date:true,
                    admin_account_limits:{
                      select:{
                        max_companies:true,
                        max_site:true,
                        max_users:true,
                        max_custom_checklists:true,
                        max_Corrective_action:true,
                        free_onsite_inspections:true,
                        Arabic_language_support:true,
                        Access_to_training_programs:true,
                        Daily_monitoring_sheets:true,
                      }
                    }
                  }
                });
              } else if (loginResult.role === "employee") {
                userDetails = await prisma.employees.findFirst({
                  where: { user_id: loginResult.id }
                });
              } else if (loginResult.role === "laeq") {
                userDetails = await prisma.super_admins.findFirst({
                  where: { user_id: loginResult.id },
                  select:{
                    full_name:true
                  }
                });
              }

              // ===== decription Phone ====
              if (userDetails && "phone" in userDetails && userDetails.phone) {            
                 userDetails.phone = encryption.decryption(String(userDetails?.phone), process.env.BACKEND_PRIVATE_KEY as string)
              }
               
                // === Return The User Details ===
                 return {
                    ...loginResult,
                    userDetails
                };
        }catch(error){
            console.error("❌ Error finding user:", error);
        }
    }

    // == Search For An Goolge Account in DataBase ==
    public async searchForGoogleAccount(requestData:any) {

      
      try{
              console.log("requestData:",requestData)
            // === Chexk if email and password are correct ===
            const userAuth = await prisma.auth.findFirst({
                where: {
                    email:requestData?.email,
                    provider:requestData?.provider,
                },
                select: { id: true, is_admin: true ,email:true},
              });
              if (!userAuth) {
                console.log("❌ المستخدم غير موجود!");
                return null;
              }
              console.log("✅ مستخدم موجود في auth:", userAuth);

                // === Check If The User Is Admin Or Not To Search In Correct Table ===


 


                // === Return The User Details ===

                  return [];
        }catch(error){
            console.error("❌ Error finding user:", error);
        }
    }

    // == Get Admin Account Details ==
    
}

export default new login_Model();