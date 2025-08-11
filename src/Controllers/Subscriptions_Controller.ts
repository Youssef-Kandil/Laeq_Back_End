

import { Request, Response } from "express";
import Subscriptions_Services from "../Services/Subscriptions_Services";


class Subscriptions_Controller {

    // == Get All Subscriptions ==
    public async get(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Subscriptions_Services.getAllSubscriptions()
       console.warn("Controler : ",result)
        res.json(result)
    }
    //  == Add New Subscription ===
    public async add(req: Request, res: Response) {
        // code here
        console.log("HI")
       const result = await Subscriptions_Services.addNewSubscription(req.body)
       console.warn("Controler : ",result)
        res.json(result)
    }

}

export default  new Subscriptions_Controller();