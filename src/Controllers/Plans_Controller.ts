import { Request, Response } from "express";
import Plans_Service from "../Services/Plans_Service";


class Plans_Controller {

    // == Get All Check List (Parent Categories) ==
    public async get(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Plans_Service.getAllPaymentPlans()
       console.warn("Controler : ",result)
        res.json(result)
    }
    //  == Add New Checklist ===
    public async add(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Plans_Service.addNewPaymentPlans(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }

}

export default  new Plans_Controller();