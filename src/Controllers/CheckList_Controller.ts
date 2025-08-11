import { Request, Response } from "express";
import checklist_Services from "../Services/checklist_Services";


class checklists_Controller {


        // == Get All Check List (Parent Categories) ===
        public async get(req: Request, res: Response) {
            // code here
            console.log("HI")
           const result = await checklist_Services.getAllCheckLists()
           console.warn("Controler : ",result)
            res.json(result)
        }
        //  == Add New Checklist ===
        public async add(req: Request, res: Response) {
            // code here
            console.log("HI")
           const result = await checklist_Services.addNewCheckList(req.body)
           console.warn("Controler : ",result)
            res.json(result)
        }



}

export default  new checklists_Controller();