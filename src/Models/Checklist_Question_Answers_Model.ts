import { PrismaClient } from "@prisma/client";
import { Field,Answer } from "../types/checklistTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class Checklist_Question_Answers_Model  {
    // === Get All Questions And Answers of one Temp  by template ID 
        public async Fetch_Questions_Answers_BY_Template_ID_FromDB(template_id:number){
            const res =  await prisma.templates.findFirst({
                where:{
                    id:template_id
                },
                include:{
                    questions:{
                        select:{
                            id:true,
                            question_title:true,
                            question_answers:{
                                select:{
                                    user_id:true,
                                    question_id:true,
                                    field_id:true,
    
                                    value:true,
                                    type:true,

                                    answered_at:true
                                }
                            }
                        }
                    }
                }
            })
            console.warn("Model : ",res)
            return res
        }
    // === Add new Question Answers by Question id
        public async Post_Question_Answers_BY_ID_FromDB(args:Answer[]){
            const res = await prisma.question_answers.createMany({
                data: args.map(a => ({
                    user_id: a.userID,
                    question_id: a.questionID,
                    field_id: a.fieldID,
                    value: a.value,
                    type: a.type,
                }))
            });
            console.warn("Model : ",res)
            return res
        }
}

export default new Checklist_Question_Answers_Model();