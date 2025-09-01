import { PrismaClient } from "@prisma/client";
import { planType } from "../types/paymentsPlanTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class permissions_Model  {
    // === Get All Permissions
        public async FetchPermissionsFromDB(){
            const permissions =  await prisma.permissions.findMany({
                select:{
                    id:true,
                    permission_name:true
                }
            })
            console.warn("Model : ",permissions)
            return permissions
        }

}

export default new permissions_Model();