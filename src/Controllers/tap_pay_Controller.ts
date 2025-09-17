

import { Request, Response } from "express";
import tap_pay_Service from "../Services/tap_pay_Service";
import { TapPayRequestPayload } from '../types/TapPayRequestType';
import { BaseSubscripationType } from "../types/handelSubscripationType";


class tap_pay_Controller {

    // == Tap Pay ==
    public async pay(req: Request, res: Response) {
        // code here
        try {
            const payload: TapPayRequestPayload = req.body;
            const data = await tap_pay_Service.createCheckout(payload);
            console.warn("payload :: ",data)

            res.status(200).json(data);
        } catch (err: any) {
            console.error("PAY CONTROLLER : ",err)
            res.status(500).json({ error: err.message });
        }
    }

    public async check(req:Request, res: Response){
        try{
            const args :BaseSubscripationType = req.body
            console.log("CHECKK Controler args >>> ",args)
            const check = await tap_pay_Service.handlePaymentStatus(args);
            console.log("CHECKK Controler check >>> ",check)
             res.status(200).json(check);

        }catch(err:any){
            console.error("PAY CHECK CONTROLLER : ",err)
            res.status(500).json({ error: err.message });

        }
    }



}

export default  new tap_pay_Controller();