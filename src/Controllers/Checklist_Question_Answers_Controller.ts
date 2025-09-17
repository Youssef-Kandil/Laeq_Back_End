import { Request, Response ,NextFunction} from "express";
import Checklist_Question_Answers_Services from "../Services/Checklist_Question_Answers_Services";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage:multer.memoryStorage()});


class Checklist_Question_Answers_Controller {

    // ===== getAdminReportsByID
    public async getAdminReportsController(req: Request, res: Response){
        try{
            if (!req.body) {
                res.json({msg:"Must Send Admin ID In Requested Body"})
            }
            // code here
           const result = await Checklist_Question_Answers_Services.getAdminReportsByID(req.body)
            res.json(result)

        }catch(e){
            console.error("HANDEL_ERROR : ",e)
        }
    }
    // ===== getUserReportsByID
    public async getUserReportsController(req: Request, res: Response){
        try{
            if (!req.body) {
                res.json({msg:"Must Send User ID In Requested Body"})
            }
            // code here
           const result = await Checklist_Question_Answers_Services.getUserReportsByID(req.body)
            res.json(result)

        }catch(e){
            console.error("HANDEL_ERROR : ",e)
        }
    }

    // == Get All Template Questions Answers ==
    public async getByID(req: Request, res: Response) {

        try{
            if (!req.body) {
                res.json({msg:"Must Send Template ID In Requested Body"})
            }
            // code here
           const result = await Checklist_Question_Answers_Services.getQuestionsAnswersByTemplateID(req.body)
            res.json(result)

        }catch(e){
            console.error("HANDEL_ERROR : ",e)
        }
    }

    // == Add New  Answers by Question ID ==
    public async addByID(req: Request, res: Response) {
            // === 1) نقرأ الميتا ===
            const metaRaw = req.body.meta; // جاي من formData.append("meta", JSON.stringify(metaArray))
            const meta = JSON.parse(metaRaw);

            // === 2) نقرأ الفايلات ===
            const files = req.files as Express.Multer.File[];
            
            console.log("files REQUEST :: ",files);

            meta.forEach((item: any) => {
                if (item.type === "images" || item.type === "signature") {
                  const f = files.find((f) => f.fieldname === item.value);
                  if (f) {
                    // ✨ استبدل الـ value بالـ buffer
                    item.value = f.buffer;
                  }
                }
              });

            console.log("ANSWERS REQUEST :: ",meta);
        if (req.body) {            
            // code here
           const result = await Checklist_Question_Answers_Services.addQuestionAnswersByID(meta)
           console.warn("woring")
            res.json(result)
        }
    }

}

export default  new Checklist_Question_Answers_Controller();