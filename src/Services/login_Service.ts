import login_Model from "../Models/login_Model";
import {  Response } from "express";
import jwt from "jsonwebtoken";
import encryption from "../Utils/encryption";

// == LOGIN INTERFACES ==
interface requestDataProperties {
    email: string;
    password: string;
}
interface requestGoogleDataProperties {
    email: string;
    phone: string;
    provider: string;
}
interface response {
    id: number,
    auth_id: number,
    full_name: string,
    phone: string,
    register_with_google: number,
    date_registered: string,
    start_date: string,
    end_date: string,
    plan_type: string,
    plan_id: number,
    email: string,
    is_admin: number,
}
// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;
console.log("JWT_SECRET:", JWT_SECRET);

class login_Service {
    // == Login  Account ==
    public async handelLoginData(requestData:requestDataProperties,res:Response) {
        console.log("handelLoginData JWT_SECRET :: ",JWT_SECRET)
        try {

            // === Check type of the request data ===   
            if ( typeof requestData?.email != "string" || typeof requestData?.password?.trim() != "string") {
                return null;  
            }
            // === Check if the request data is empty after trim  ===
            if ( requestData?.email?.trim()?.length == 0 ||  requestData?.password?.trim()?.length == 0) {
                return null;  
            }
            console.log("login_Service handelLoginData requestData",requestData);

            // ===layer 2 encryption data  ===
            const hashed_Email = encryption.encryption(requestData?.email ,process.env.BACKEND_PRIVATE_KEY as string);
            const hashed_Password = encryption.encryption( requestData?.password ,process.env.BACKEND_PRIVATE_KEY as string);
            requestData.email = hashed_Email;
            requestData.password = hashed_Password;

            // === Call the model function and pass the request
            const result = await login_Model.searchForAccount(requestData);
            if (!result) {
                return null;
            }
            console.log("login_Service 3 handelLoginData result ===> >> ",result);

            const decryptedEmail = encryption.decryption(result.email ,process.env.BACKEND_PRIVATE_KEY as string);
            result.email = decryptedEmail;
            console.log("login_Service 4 handelLoginData decryptedEmail ===> >> ",decryptedEmail);


            // === GENERATE JWT TOKEN ===
            // == THIS RESPONSED DATA IS NOT FULLY DECRYPTED ==
            // == IT NEED TO BE DECRYPTED IN THE FRONT END (LAYER 2 DECRYPTION) ==
            const { email , id , is_admin } : Partial<response> = result;
            const token = jwt.sign({email,id,is_admin}, JWT_SECRET, { expiresIn: '1d' });
            console.log("login_Service handelLoginData token",token);
  
            // SENT TOKEN TO Cookie
            res.cookie('token', token, {
              httpOnly: false,
              secure: false,
              sameSite: 'lax',
              maxAge: 24 * 60 * 60 * 1000,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    // ==  Google Login  Account ==
    public async handelGooleLoginData(requestData:requestGoogleDataProperties,res:Response) {
        try {
            // === Check type of the request data ===   
            if ( typeof requestData?.email != "string" || typeof requestData?.provider?.trim() != "string" || typeof requestData?.phone?.trim() != "string") {
                return null;  
            }
            // === Check if the request data is empty after trim  ===
            if ( requestData?.email?.trim()?.length == 0 ||  requestData?.provider?.trim()?.length == 0 || requestData?.phone?.trim()?.length == 0) {
                return null;  
            }

            // ===layer 2 encryption data  ===
            const hashed_Email = encryption.encryption( requestData?.email,process.env.BACKEND_PRIVATE_KEY as string);
            const hashed_Phone = encryption.encryption( requestData?.phone,process.env.BACKEND_PRIVATE_KEY as string);
            const req_uestData : requestGoogleDataProperties = {
                email: hashed_Email,
                phone: hashed_Phone,
                provider: requestData?.provider
            } 
            // === Call the model function and pass the request
            const result = await login_Model.searchForGoogleAccount(req_uestData);
            if (!result) {
                return null;
            }


            // === GENERATE JWT TOKEN ===
            const { email, phone  } = requestData;
            const token = jwt.sign({email , phone }, JWT_SECRET, { expiresIn: '1h' });
            console.log("login_Service handelLoginData token",token);

            // SENT TOKEN TO Cookie
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default new login_Service();