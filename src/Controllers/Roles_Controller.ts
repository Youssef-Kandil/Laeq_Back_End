import { Request, Response } from "express";
import Roles_Service from "../Services/Roles_Service";


class Roles_Controller {

    // == Get All Roles Created By Admin Use Admin ID ==
    public async getByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Roles_Service.getAllRolesByAdminID(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }
    //  == Add New Checklist ===
    public async addByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Roles_Service.addNewRoleByAdminID(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }

}

export default  new Roles_Controller();