import { PrismaClient } from "@prisma/client";
import { Field } from "../types/checklistTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class CheckList_Temp_Questions_Model  {
    // === Get All Questions of one Temp 
        public async Fetch_Temp_Questions_BY_ID_FromDB(template_id:number){
            const res =  await prisma.templates.findFirst({
                where:{
                    id:template_id
                },
                include:{
                    questions:{
                        include:{
                            question_fields:{
                                select:{
                                    id:true,
                                    type:true
                                }
                            }
                        }
                    }
                }
            })
            console.warn("Model : ",res)
            return res
        }
    // === Add new Question in temp by temp id
        public async Post_Temp_Questions_BY_ID_FromDB(template_id:number,question_title:string,question_fields:Field[]){
            const res =  await prisma.questions.create({
                data:{
                    template_id,
                    question_title,
                    question_fields: {
                        create: question_fields,
                    },
                }
            })
            console.warn("Model : ",res)
            return res
        }
}

export default new CheckList_Temp_Questions_Model();