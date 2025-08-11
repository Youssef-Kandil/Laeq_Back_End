import { Request, Response } from "express";
import CheckList_Temp_Questions_Services from "../Services/CheckList_Temp_Questions_Services";


class CheckList_Temp_Questions_Controller {

    // == Get All Template Questions ==
    public async getByID(req: Request, res: Response) {
        // code here
       const result = await CheckList_Temp_Questions_Services.getTemplatQuestionsByID(req.body)
       console.warn("woring")
        res.json(result)
    }

    // == Add New  Questions by Template ID ==
    public async addByID(req: Request, res: Response) {
        // code here
       const result = await CheckList_Temp_Questions_Services.addTemplatQuestionsByID(req.body)
       console.warn("woring")
        res.json(result)
    }

}

export default  new CheckList_Temp_Questions_Controller();