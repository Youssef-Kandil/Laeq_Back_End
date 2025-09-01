import Companies_Model from "../Models/Companies_Model";
import { fullCompanySiteTYPE } from "../types/CompanyType";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Companies_Service {
    // == Get All Companies By Admin ID ==
    public async getAllUserCompaniesByID(requestData:{admin_id:number}) {
        try {
            const res = await Companies_Model.FetchUserCompaniesByIDFromDB(requestData.admin_id)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Company  ==
    public async addNewCompany(requestData:fullCompanySiteTYPE) {
        try {
            const res = await Companies_Model.PostCompanyByUserID(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Companies_Service();