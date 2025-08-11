import { Request, Response } from "express";
import Employees_Services from "../Services/Employees_Services";


class Employees_Controller {

    // == Get All Employees Created By Admin Use Admin ID ==
    public async getByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Employees_Services.getAll_Emps_ByAdminID(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }
    //  == Add New Employees ===
    public async addByID(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Employees_Services.addNew_Emp_ByAdminID(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }

}

export default  new Employees_Controller();