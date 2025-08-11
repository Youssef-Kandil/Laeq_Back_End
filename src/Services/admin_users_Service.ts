import admin_users_Model from "../Models/admin_users_Model";
import { adminType } from "../types/UsersTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class admin_users_Service {
    // == Create New Admin Account ==
    public async registerAdmin(requestData:adminType,res:Response) {
        try {
            // === Check data is not empty ===
            if (!requestData) {
                return null;
            }
            // === Check Required Fields ===
            const requiredFields = (
                requestData?.full_name  == undefined 
                || requestData?.email == undefined 
                ||  requestData?.password == undefined 
                || requestData?.phone == undefined 
                || requestData?.register_with_google == undefined 
                || requestData?.end_date == undefined 
                || requestData?.plan_id == undefined 
                || requestData?.plan_type == undefined) ;

                if (requiredFields) {
                    console.log("❌ Error: Missing required fields");
                    return {message: "Missing required fields"};
                } ;

            // === Check Fields Types ===
            const fieldsTypes = (typeof requestData?.full_name !== "string"
                || typeof requestData?.email !== "string"
                || typeof requestData?.password !== "string"
                || typeof requestData?.phone !== "string"
                || typeof requestData?.register_with_google !== "number"
                || typeof requestData?.end_date !== "string"
                || typeof requestData?.plan_id !== "number"
                || typeof requestData?.plan_type !== "string") ;

                if (fieldsTypes) {
                    console.log("❌ Error: Invalid data types");
                    return {message: "Invalid data types"};
                }




            // === encryption data  ===
            const hashed_Password : string = encryption.encryption( requestData?.password, process.env.BACKEND_PRIVATE_KEY as string);
            const hashed_Phone : string = encryption.encryption(requestData?.phone , process.env.BACKEND_PRIVATE_KEY as string);
            // === Asign The Encrypted Data To The Request Data ===
            requestData.password = hashed_Password;
            requestData.phone = hashed_Phone;
      
            // === call the model function and pass the request data to it ===
            const result = await admin_users_Model.createAccount(requestData);

            if (!result) {
                console.log("❌ Error: Failed to create account");
                return {message: "Failed to create account"};
            }
            
            // === GENERATE JWT TOKEN ===
            // == THIS RESPONSED DATA IS NOT FULLY DECRYPTED ==
            // == IT NEED TO BE DECRYPTED IN THE FRONT END (LAYER 2 DECRYPTION) ==
            const token = jwt.sign(
                {
                    id:result.id,
                    email:result.email,
                    is_admin:true
                }, JWT_SECRET, { expiresIn: '1d' });
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

    // == Create New Admin Account With Googlr ==
    public async registerAdminWithGoogle(requestData:any) {
        try {
            // === Check data is not empty or undefined ===
            if (!requestData) {
                return null;
            }
    
            if (requestData?.full_name  == undefined || requestData?.email == undefined ||  requestData?.password == undefined || requestData?.phone == undefined || requestData?.Gtoken == undefined || requestData?.register_with_google == undefined) {
                return null;   
            }
            // === layer 2  encryption data  ===
            const hashed_Email : string = encryption.encryption( requestData?.email ,process.env.BACKEND_PRIVATE_KEY as string);
            const hashed_Phone : string = encryption.encryption(requestData?.phone , process.env.BACKEND_PRIVATE_KEY as string);
            // === Asign The Encrypted Data To The Request Data ===
            requestData.hashed_Email = hashed_Email;
            requestData.hashed_Phone = hashed_Phone;
      
            // === call the model function and pass the request data to it ===
            const result = await admin_users_Model.createAccount(requestData);

            if (!result) {
                return null;
            }
            return result;
        } catch (error) {
            throw error;
        }
    }


}

export default new admin_users_Service();