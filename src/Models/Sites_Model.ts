
import { PrismaClient } from "@prisma/client";
import { siteType } from "../types/CompanyType";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class Sites_Model  {

    // === Add New Site
        public async PostSiteByCompanyID(args:siteType){
            const res =  await prisma.sites.create({
                data:{
                    company_id:args.company_id,
                    admin_id:args.admin_id,
                    site_name:args.site_name,
                    full_address:args.full_address,
                    post_code:args.post_code,
                    lat:args.lat,
                    long:args.long
                }
            })
            console.warn("Model : ",res)
            return res
        }
}

export default new Sites_Model();