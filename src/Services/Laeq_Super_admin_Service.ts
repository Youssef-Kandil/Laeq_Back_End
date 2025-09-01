import Laeq_Super_admin_Model from "../Models/Laeq_Super_admin_Model";
import { laeq_user } from "../types/UsersTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Laeq_Super_admin_Service {


    // == Add New Suber Laeq User Account  ==
    public async createAccount(requestData:laeq_user) {
        try {
            // === encryption data  ===
            const hashed_Password : string = encryption.encryption( requestData?.password, process.env.BACKEND_PRIVATE_KEY as string);
            // === Asign The Encrypted Data To The Request Data ===
            requestData.password = hashed_Password;
            const result = await Laeq_Super_admin_Model.createSuperLaeqAccount(requestData)
            if (!result) {
                console.log("❌ Error: Failed to create account");
                return {message: "Failed to create account"};
            }
            console.warn("Service : ",result)
            // return res
            
        } catch (error) {
            throw error;
        }
    }
    // == Edit Super Account  ==
    public async editSuperAdminInfo_ByID(requestData:laeq_user) {
        try {
            const res = await Laeq_Super_admin_Model.editSuperAdminInfo_ByID(requestData)
            console.warn("Service : ",res)
            // return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Laeq_Super_admin_Service();