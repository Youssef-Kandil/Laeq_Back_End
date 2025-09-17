import { PrismaClient } from "@prisma/client";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class checklist_Model  {
    // === Get All CheckLists (Parent Categories)
        public async FetchCheckListFromDB(admin_id:number){
            const res =  await prisma.checklists.findMany({
                where:{
                    OR: [
                        { owner: "laeq" },
                        { admin_id: admin_id }
                      ]
                }
            })
            console.warn("Model : ",res)
            return res
        }

    // === Add New CheckLists (Parent Categories)
        public async PostCheckListFromDB(checklist_title:string,admin_id:number,owner:string){
            const res =  await prisma.checklists.create(
                {
                    data:{
                        checklist_title,
                        admin_id,
                        owner,
                    }
                }
            )
            console.warn("Model : ",res)
            return res
        }
}

export default new checklist_Model();