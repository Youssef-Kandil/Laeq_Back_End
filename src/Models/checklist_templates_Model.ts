import { PrismaClient } from "@prisma/client";
import { Question } from "../types/checklistTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class checklist_templates_Model  {
    // === Get All CheckLists (Parent Categories)
        public async FetchCheckList_Temps_BY_ID_FromDB(checklist_id:number){
            const res =  await prisma.templates.findFirst({
                where:{
                    checklist_id:checklist_id
                }
            })
            console.warn("Model : ",res)
            return res
        }
    // === Get All CheckLists (Parent Categories)
        public async PostCheckList_Temps_BY_ID_FromDB(checklist_id:number,template_title:string,questions:Question[]|undefined){
            const res =  await prisma.templates.create({
                data:{
                    /* == ADD TEMP DATA == */
                    checklist_id,
                    template_title,
                    /* == ADD Questions DATA == */
                    questions:{
                        create:questions?.map((question)=>({
                            question_title:question.question_title,
                        /* == ADD Question Fields DATA == */    
                            question_fields:{
                                create:question.fields.map((field)=>({
                                    type:field.type
                                }))
                            }
                        }))
                    }
                },
                include: {
                  questions: {
                    include: {
                        question_fields: true
                    }
                  }
                }
            })
            console.warn("Model : ",res)
            return res
        }
}

export default new checklist_templates_Model();