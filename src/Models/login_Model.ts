import { PrismaClient } from "@prisma/client";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();



class login_Model  {
    // == Search For An Account in DataBase ==
    public async searchForAccount(requestData:any) {

        try{
            // === Check if email and password are correct ===
            const userAuth = await prisma.auth.findFirst({
                where: {
                    email:requestData?.email,
                    password:requestData?.password
                },
                select: { id: true, is_admin: true ,email:true},
              });
              if (!userAuth) {
                console.log("❌ المستخدم غير موجود أو كلمة المرور خاطئة!");
                return null;
              }
              console.log("✅ مستخدم موجود في auth:", userAuth);

                // === Check If The User Is Admin Or Not To Search In Correct Table ===
                let userDetails = null;
                if (userAuth.is_admin === 1 ) {
                  userDetails = await prisma.admin_users.findFirst({
                    where: { auth_id: userAuth.id },
                  });
                } else if (userAuth.is_admin === 0 ) {
                  userDetails = await prisma.employees.findFirst({
                    where: { auth_id: userAuth.id },
                  });
                }
                //=== Add Custome User Details To The Response ===
                let userData: Record<string, any> ={}
                if (userDetails) {
                    userData = userDetails;
                }
                // === Layer1 Decrypt The Data ===
                userData.email = userAuth.email
                userData.is_admin = userAuth.is_admin
                

                if (!userDetails) {
                    console.log("⚠️ لا يوجد مستخدم مرتبط بهذا الحساب في الجدول المناسب!");
                    return null;
                  }


                // === Return The User Details ===
                  return userData;
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
                let userDetails = null;
                if (userAuth.is_admin === 1 ) {
                  userDetails = await prisma.admin_users.findFirst({
                    where: { auth_id: userAuth.id ,phone:requestData?.phone },
                  });
                } else if (userAuth.is_admin === 0 ) {
                  userDetails = await prisma.employees.findFirst({
                    where: { auth_id: userAuth.id , phone:requestData?.phone },
                  });
                }

                if (!userDetails) {
                    console.log("⚠️ لا يوجد مستخدم مرتبط بهذا الحساب !");
                    return null;
                  }



                // === Return The User Details ===
                  console.log("✅ بيانات المستخدم:", userDetails);
                  return userDetails;
        }catch(error){
            console.error("❌ Error finding user:", error);
        }
    }

    // == Get Admin Account Details ==
    
}

export default new login_Model();