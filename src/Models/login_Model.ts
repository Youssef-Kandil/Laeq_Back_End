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
                roll:true
              }
            })

            if (!loginResult) {
              throw new Error("❌ Invalid credentials");
            }

            // === Check If The User Is Admin Or Not To Search In Correct Table ===
             let userDetails = null;
            if (loginResult.roll === "admin") {
                userDetails = await prisma.admin_users.findFirst({
                  where: { user_id: loginResult.id },
                  select:{
                    full_name:true,
                    phone:true,
                    plan_type:true,
                    start_date:true,
                    end_date:true,
                  }
                });
              } else if (loginResult.roll === "employee") {
                userDetails = await prisma.employees.findFirst({
                  where: { user_id: loginResult.id }
                });
              }

              // ===== decription Phone ====
              if (userDetails?.phone) {            
                 userDetails.phone = encryption.decryption(userDetails.phone,process.env.BACKEND_PRIVATE_KEY as string)
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