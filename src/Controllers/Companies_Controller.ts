import { Request, Response } from "express";
import Companies_Service from "../Services/Companies_Service";


class Companies_Controller {

    // == Get All user Companies By User ID ==
    public async getByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Companies_Service.getAllUserCompaniesByID(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }
    //  == Add New Checklist ===
    public async addByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Companies_Service.addNewCompany(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }
}

export default  new Companies_Controller();