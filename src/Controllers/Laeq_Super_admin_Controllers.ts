import { Request, Response } from "express";
import Laeq_Super_admin_Service from "../Services/Laeq_Super_admin_Service";


class Laeq_Super_admin_Controllers {


    //  == Add New Checklist ===
    public async edit(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Laeq_Super_admin_Service.editSuperAdminInfo_ByID(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }

}

export default  new Laeq_Super_admin_Controllers();