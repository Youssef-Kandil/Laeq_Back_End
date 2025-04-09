import { Router } from "express";
import { Request, Response } from 'express';

const router = Router();

interface AuthenticatedRequest extends Request {
    user?:  {
        email: string,
        id: number,
        is_admin: number,
        iat: number,
        exp: number,
    } | undefined |null
}

router.get("/test",(req:AuthenticatedRequest,res:Response):any=>{
    const exp_date = req?.user?.exp
    const respose_data = {
        msg:"good",     
        user_info: req?.user,
        exp_date: exp_date ? new Date(exp_date * 1000) : null
    }
   return res.json(respose_data)
});

export default router;