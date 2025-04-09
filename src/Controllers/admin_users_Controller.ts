import { Request, Response } from "express";
import admin_users_Service from "../Services/admin_users_Service";


class admin_users_Controller {

    // == Create New Admin Account ==
    public async create(req: Request, res: Response) {
        // code here
       const result = await admin_users_Service.registerAdmin(req.body,res)
        res.json(result)
    }


    // == Create New Admin Account With Google ==
    public async createWithGoogle(req: Request, res: Response) {
        // code here
        console.log("hi")
        console.log("req.body :",req.body)
       const result = await admin_users_Service.registerAdminWithGoogle(req.body)
        res.json(result)
    }



}

export default  new admin_users_Controller();