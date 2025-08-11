import { Request, Response } from "express";
import Sites_Service from "../Services/Sites_Service";


class Sites_Controller {


    //  == Add New Site ===
    public async addByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Sites_Service.addNewSite(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }

}

export default  new Sites_Controller();