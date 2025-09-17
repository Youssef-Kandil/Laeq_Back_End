import { Request, Response } from "express";
import checklist_templates_Services from "../Services/checklist_templates_Services";


class checklists_templates_Controller {

    // == Get All CheckList Templates  ==
    public async getByID(req: Request, res: Response) {
        // code here
       const result = await checklist_templates_Services.getCheckListsTemplatsByID(req.body)
        res.json(result)
    }

    // == ADDl CheckList Templates  ==
    public async addByID(req: Request, res: Response) {
        try{
            // code here
            const result = await checklist_templates_Services.addCheckListsTemplatsByID(req.body)
            res.json(result)

        }catch(e){
            res.status(404).json({MSG:e})  
        }
    }

}

export default  new checklists_templates_Controller();