import Checklist_Question_Answers_Model from "../Models/Checklist_Question_Answers_Model";
import { Answer } from "../types/checklistTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";
import { deleteFileFromGCS, getSignedUrl, uploadFileToGCS } from "../Utils/gcsUploader";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Checklist_Question_Answers_Services {


    // ==== getAdminReportsByID
    public async getAdminReportsByID(requestData:{admin_id:number}){
            try{
                if (!requestData) {
                    return null
                }
                if (requestData?.admin_id) {                
                    const res = await Checklist_Question_Answers_Model.Fetch_Questions_Answers_As_Admin_Report(requestData)
                    if (!res) return null;
                    console.warn("Service : ",res)
                    return res.map((t: any) => ({
                        task_id: t.id,
                        assigned_to_user: t.users?.email ?? "Unknown",       // اليوزر المسند ليه التاسك
                        answered_by_user: t.question_answers[0]?.users?.email ?? "Unknown", // اليوزر اللي جاوب
                        template_title: t.templates?.template_title ?? "Unknown",
                        template_id: t.templates?.id ?? null,
                        company_name: t.companies?.company_name ?? "Unknown",
                        site_name: t.sites?.site_name ?? "Unknown",
                        answered_at: t.question_answers[0]?.answered_at ?? null
                      }));
                }
            }catch (error) {
                throw error;  
            }
    }


    // ==== getAdminReportsByID
    public async getUserReportsByID(requestData:{user_id:number}){
            try{
                if (!requestData) {
                    return null
                }
                if (requestData?.user_id) {                
                    const res = await Checklist_Question_Answers_Model.Fetch_Questions_Answers_As_User_Report(requestData)
                    if (!res) return null;
                    console.warn("Service : ", res);
                    return res.map((t: any) => ({
                        task_id: t.id,
                        user_name: t.users?.email ?? "Unknown",
                        template_title: t.templates?.template_title ?? "Unknown",
                        template_id: t.templates?.id ?? null,
                        company_name: t.companies?.company_name ?? "Unknown",
                        site_name: t.sites?.site_name ?? "Unknown",
                        answered_at: t.question_answers[0]?.answered_at ?? null
                    }));
                }
            }catch (error) {
                throw error;  
            }
    }


    // == Get All Questions of Template ==/*+++RETORN - ALL QUESTIONS AND ANSWERS OF ONE TEMPLATE +++*/
    public async getQuestionsAnswersByTemplateID(requestData:{template_id:number}) {
        try {
            if (!requestData) {
                return null;
            }
            if (requestData?.template_id) {                
                const res = await Checklist_Question_Answers_Model.Fetch_Questions_Answers_BY_Template_ID_FromDB(requestData.template_id)
                if (!res) return null;

                // ✨ loop على كل سؤال → كل إجابة
                for (const question of res.questions) {
                  for (const answer of question.question_answers) {
                    if ((answer.type === "images" || answer.type === "signature") && answer.value) {
                      // generate signed url
                      const signedUrl = await getSignedUrl(answer.value, "checklist-files-laeq365");
                      answer.value = signedUrl; // replace file path with signed url
                    }
                  }
                }
              
                console.warn("Service : ",res)
                return res;
            }
            
        } catch (error) {
            throw error;  
        }
    };


    


      

   // == Add New Question To Template ==/*+++ADD ANSWERS To ONE OR More Question +++*/
   public async addQuestionAnswersByID(requestData: Answer[]) {
    try {
      if (!requestData || requestData.length === 0 || !requestData[0]?.questionID) {
        return null;
      }
  
      for (const item of requestData) {
        if ((item.type === "images" || item.type === "signature") && item.value instanceof Buffer) {
          // اسم فريد للفايل
          const ext = item.type === "signature" ? "webp" : "pdf";
          const uniqueName = item.type === "signature" 
                    ?`signatureField/user_${item.userID}-questionID_${item.questionID}-fieldID_${item.fieldID}_${Date.now()}.${ext}`
                    :`PDFS/user_${item.userID}-questionID_${item.questionID}-fieldID_${item.fieldID}_${Date.now()}.${ext}`;
  
          // رفع على GCS
          const mimeType = item.type === "signature" ? "image/webp" : "application/pdf";
        //   const bucketName = item.type === "images" ?  "checklist-files-laeq365" :  "laeq-files";
          const publicUrl = await uploadFileToGCS(item.value, uniqueName, mimeType, "checklist-files-laeq365");
  
          // ✨ استبدل البفر باللينك (أو بالاسم فقط حسب التصميم)
          item.value = uniqueName;
  
          // تخلص من الحقول الزيادة لو جاية من multer
          delete (item as any).mimetype;
          delete (item as any).filename;
        }
      }
  
      console.warn("Service : ", requestData);
  
      const res = await Checklist_Question_Answers_Model.Post_Question_Answers_BY_ID_FromDB(requestData);
      return res;
    } catch (error) {
      throw error;
    }
  }
  
    // public async addQuestionAnswersByID(requestData:Answer[]) {
    //     try {
    //         if (!requestData) {
    //             return null
    //         }
    //         if (requestData.length === 0) {
    //             return null
    //         }
    //         if (!requestData[0]?.questionID) {
    //             return null
    //         }
    //               // ✨ loop على كل إجابة
    //             for (const item of requestData) {
    //                 if (item.type === "images" && item.value instanceof Buffer) {
    //                 // اسم فريد للفايل عشان ما يتكتبش فوق بعض
    //                 const uniqueName = `userIDـ${item.userID}/questionID_${item.questionID}/fieldID_${item.fieldID}_${Date.now()}`;

    //                 // رفع على GCS
    //                 const publicUrl = await uploadFileToGCS(
    //                     item.value,       // buffer
    //                     uniqueName,       // اسم الملف
    //                     "application/pdf"    // نوع الملف
    //                 );

    //                 // ✨ استبدل البفر باللينك
    //                 item.value = uniqueName;

    //                 // تخلص من الحقول الزيادة
    //                 delete (item as any).mimetype;
    //                 delete (item as any).filename;
    //                 }
    //             }
    //             console.warn("Service : ",requestData)
    //         const res = await Checklist_Question_Answers_Model.Post_Question_Answers_BY_ID_FromDB(requestData)
    //         return res
            
    //     } catch (error) {
    //         throw error;
    //     };
    // }



}

export default new Checklist_Question_Answers_Services();