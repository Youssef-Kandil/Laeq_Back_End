import { Request, Response } from "express";
import permissions_Service from "../Services/permissions_Service";


class permissions_Controller {

    // == Get All Permissions ==
    public async get(req:Request,res: Response) {
        // code here
        console.log("HI")
       const result = await permissions_Service.getAllPermissions()
       console.warn("Controler : ",result)
        res.json(result)
    }


}

export default  new permissions_Controller();