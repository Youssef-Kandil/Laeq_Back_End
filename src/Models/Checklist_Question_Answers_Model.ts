import { PrismaClient } from "@prisma/client";
import { Field,Answer } from "../types/checklistTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class Checklist_Question_Answers_Model  {
     // ===== Get Answers As Admin Report ======
     public async Fetch_Questions_Answers_As_Admin_Report(req: { admin_id: number }) {
        try {
          const res = await prisma.tasks.findMany({
            where: {
              admin_id: req.admin_id,
              question_answers: {
                some: {} // ده بيضمن يرجع بس التاسكات اللي ليها إجابات
              }
            },
            select: {
              id: true,
              users: { select: { email: true } },
              templates: { select: { id: true, template_title: true } },
              companies: { select: { company_name: true } },
              sites: { select: { site_name: true } },
              question_answers: {
                select: {
                  answered_at: true,
                  users: { select: { email: true } } 
                },
                orderBy: { answered_at: "desc" },
                take: 1
              }
            }
          });
      
          if (!res || res.length === 0) {
            return [];
          }
      
          return res;
        } catch (error) {
          console.error("Error in Fetch_Questions_Answers_As_Admin_Report:", error);
          throw new Error("Failed to fetch admin report data");
        }
      }
      
     // ===== Get Answers As User Report ======
     public async Fetch_Questions_Answers_As_User_Report(req: { user_id: number }) {
        try {
          const res = await prisma.tasks.findMany({
            where: {
              user_id: req.user_id,
              question_answers: { some: {} } // ✅ بس التاسكات اللي ليها إجابات
            },
            select: {
              id: true,
              users: { select: { email: true } },
              templates: { select: { id: true, template_title: true } },
              companies: { select: { company_name: true } }, // ✅ اسم الشركة
              sites: { select: { site_name: true } },        // ✅ اسم الموقع
              question_answers: {
                select: {
                  answered_at: true,
                  users: { select: { email: true } } 
                },
                orderBy: { answered_at: "desc" },
                take: 1
              }
            }
          });
      
          if (!res || res.length === 0) {
            return [];
          }
      
          // ✨ تبسيط الداتا قبل ما ترجع
          return res.map(t => ({
            task_id: t.id,
            user_name: t.users.email,
            template_title: t.templates.template_title,
            template_id: t.templates.id,
            company_name: t.companies.company_name,
            site_name: t.sites.site_name,
            answered_at: t.question_answers[0]?.answered_at ?? null
          }));
      
        } catch (error) {
          console.error("Error in Fetch_Questions_Answers_As_User_Report:", error);
          throw new Error("Failed to fetch user report data");
        }
      }
      
      
      
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
                                    users:{
                                      select:{
                                        email:true
                                      }
                                    },
                                    question_fields:{
                                      select:{
                                        question_field_options:{
                                          select:{
                                            label:true,
                                            value:true
                                          }
                                        }
                                      }
                                    },
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
                    admin_id:a.admin_id,
                    user_id: a.userID,
                    task_id:a.task_id,
                    question_id: a.questionID,
                    field_id: a.fieldID,
                    value: String(a.value),
                    type: a.type,
                }))
            });
            console.warn("Model : ",res)
            return res
        }
}

export default new Checklist_Question_Answers_Model();