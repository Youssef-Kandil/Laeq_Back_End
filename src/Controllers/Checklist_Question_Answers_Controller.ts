import { Request, Response ,NextFunction} from "express";
import Checklist_Question_Answers_Services from "../Services/Checklist_Question_Answers_Services";


class Checklist_Question_Answers_Controller {

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
        if (req.body) {            
            // code here
           const result = await Checklist_Question_Answers_Services.addQuestionAnswersByID(req.body)
           console.warn("woring")
            res.json(result)
        }
    }

}

export default  new Checklist_Question_Answers_Controller();