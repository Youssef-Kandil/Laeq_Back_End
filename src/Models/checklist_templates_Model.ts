import { PrismaClient } from "@prisma/client";
import { Question } from "../types/checklistTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class checklist_templates_Model  {
    // === Get All Templates by Checklist ID
        public async FetchCheckList_Temps_BY_ID_FromDB(checklist_id:number){
            const res =  await prisma.templates.findMany({
                where:{
                    checklist_id:checklist_id
                },
                include:{
                    _count:{
                        select: {
                            questions:true
                        }
                    }
                }
            })
            console.warn("Model : ",res)
            return res
        }
    // === add New Template
    public async PostCheckList_Temps_BY_ID_FromDB(checklist_id: number,template_title: string,questions: Question[] | undefined) {
        try {
            const res = await prisma.templates.create({
                data: {
                  checklist_id,
                  template_title,
                  questions: {
                    create: questions?.map((question) => ({
                      question_title: question.question_title,
                      question_fields: {
                        create: question.fields.map((field) => ({
                          type: field.type,
                          ...(field.options?.length
                            ? {
                                question_field_options: {
                                  create: field.options.map(
                                    (opt: { label: string; value: string }) => ({
                                      label: opt.label,
                                      value: opt.value,
                                    })
                                  ),
                                },
                              }
                            : {}),
                        })),
                      },
                    })),
                  },
                },
              });
              
              
              
      
          console.warn("Model : ", res);
          return res;
        } catch (error) {
          console.error("Error in PostCheckList_Temps_BY_ID_FromDB:", error);
          throw error; // ممكن ترجع رسالة بدل ما ترمي لو عايز تتحكم
        }
      }
      
}

export default new checklist_templates_Model();