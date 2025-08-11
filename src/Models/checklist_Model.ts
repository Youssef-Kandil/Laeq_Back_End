import { PrismaClient } from "@prisma/client";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class checklist_Model  {
    // === Get All CheckLists (Parent Categories)
        public async FetchCheckListFromDB(){
            const res =  await prisma.checklists.findMany()
            console.warn("Model : ",res)
            return res
        }

    // === Add New CheckLists (Parent Categories)
        public async PostCheckListFromDB(checklist_title:string,admin_id:number){
            const res =  await prisma.checklists.create(
                {
                    data:{
                        checklist_title,
                        admin_id,
                    }
                }
            )
            console.warn("Model : ",res)
            return res
        }
}

export default new checklist_Model();