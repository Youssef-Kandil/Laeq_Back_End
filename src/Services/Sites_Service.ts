
import Sites_Model from "../Models/Sites_Model"
import { siteType } from "../types/CompanyType";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Sites_Service {


    // == Add New Site ==
    public async addNewSite(requestData:siteType) {
        try {
            const res = await Sites_Model.PostSiteByCompanyID(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Sites_Service();