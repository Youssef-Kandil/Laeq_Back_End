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
            console.warn("hi",requestData.admin_id)
            const result =  await prisma.$transaction(async (tx) =>{
                const company = await tx.companies.create({
                    data: {
                        admin_id: requestData.admin_id,
                        company_name: requestData.company_name,
                        sector_type: requestData.sector_type,
                        company_email: requestData.company_email,
                    }
                });
                    // 2) أنشئ الموقع الرئيسي للشركة
                const sites = await tx.sites.createMany({
                data: requestData.sites.map(site => ({
                    admin_id: requestData.admin_id,
                    site_name: site.site_name ?? "",
                    full_address: site.full_address ?? "",
                    post_code: site.post_code ?? "",
                    lat: site.lat ?? "",
                    long: site.long ?? "",
                    company_id: company.id,
                }))
                });

                const firstSite = await tx.sites.findFirst({
                    where: { company_id: company.id },
                    orderBy: { id: "asc" }
                });

                // اربط الشركة بالموقع الرئيسي
                const updatedCompany = await tx.companies.update({
                where: { id: company.id },
                data: { main_site_id: firstSite?.id },
                include: { sites: true }
                });

                return updatedCompany;
            })

            console.warn("Model : ",result)
            return result
        }
}

export default new Companies_Model();