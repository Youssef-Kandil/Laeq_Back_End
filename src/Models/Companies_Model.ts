import { PrismaClient } from "@prisma/client";
import { fullCompanySiteTYPE  } from "../types/CompanyType";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class Companies_Model  {
    // === Get All CheckLists (Parent Categories)
        public async FetchUserCompaniesByIDFromDB(admin_id:number){
            const res =  await prisma.companies.findMany({
                where:{
                    admin_id:admin_id
                },
                include:{
                    sites:true
                }
            })
            console.warn("Model : ",res)
            return res
        }

    // === Add New Company
        public async PostCompanyByUserID(requestData:fullCompanySiteTYPE){
            const result =  await prisma.$transaction(async (tx) =>{
                const company = await tx.companies.create({
                    data: {
                        admin_id: requestData.admin_id,
                        company_name: requestData.company_name,
                        sector_type: requestData.sector_type,
                        company_email: requestData.company_email
                    }
                });
                    // 2) أنشئ الموقع الرئيسي للشركة
                const site = await tx.sites.create({
                    data: {
                        admin_id: requestData.admin_id, 
                        site_name: requestData.site_name ?? "",
                        full_address: requestData.full_address ?? "",
                        post_code: requestData.post_code ?? "",
                        lat: requestData.lat ?? "",
                        long: requestData.long ?? "",
                        company_id: company.id
                    }
                });

                // 3) عدّل الشركة وضع main_site_id
                const updatedCompany = await tx.companies.update({
                    where: { id: company.id },
                    data: { main_site_id: site.id },
                    include: { sites: true }
                });

                return updatedCompany;
            })

            console.warn("Model : ",result)
            return result
        }
}

export default new Companies_Model();