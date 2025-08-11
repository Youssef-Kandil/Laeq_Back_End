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

router.get("/isAuthenticated",(req:AuthenticatedRequest,res:Response):any=>{
    const user_info = req?.user?.id
    if (user_info) {
        return res.json({isAuthenticated:true})
    }else{
        return res.json({isAuthenticated:false})
    }


});

export default router;