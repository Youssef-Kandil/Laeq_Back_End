import { Request, Response } from "express";
import login_Service from "../Services/login_Service";



class login_Controller {

    // == Login  ==
    public  async login(req: Request, res: Response) {
        let checkResult :boolean = true
        // === Check if the request body is empty ===
        if (!req.body) {
              res.status(400).json({
                message: "Content can not be empty!"
            });
            checkResult = false
        }
        if (req.body?.email == undefined || req.body?.password == undefined) {
            res.status(400).json({
                message: "email or password can not be empty!"
            });
            checkResult = false
        }

        //  === Call the service function and pass the request body to it ===
        if(checkResult){
            const result = await login_Service.handelLoginData(req.body,res)
            console.log("login_Controller login result",result);
            res.json(result)
        }
    }

    // == Login With Google  ==
    public  async login_with_google(req: Request, res: Response) {
        let checkResult :boolean = true
        console.log("login_Controller login",req.body);
        // === Check if the request body is empty ===
        if (!req.body) {
            res.status(400).json({
                message: "Content can not be empty!"
            });
            checkResult = false
        }
        if (req.body?.email == undefined || req.body?.provider == undefined) {
            res.status(400).json({
                message: "email or provider can not be empty!"
            });
            checkResult = false
        }

        //  === Call the service function and pass the request body to it ===
        if(checkResult){
            const result = await login_Service.handelGooleLoginData(req.body,res)
            console.log("login_Controller login result",result);
            res.json(result)
        }
    }

}

export default  new login_Controller();