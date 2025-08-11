import Plans_Model from "../Models/Plans_Model";
import { planType } from "../types/paymentsPlanTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Plans_Service {
    // == Get All Checklist ==
    public async getAllPaymentPlans() {
        try {
            const res = await Plans_Model.FetchPaymentsPlansFromDB()
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Checklist ==
    public async addNewPaymentPlans(requestData:planType) {
        try {
            const res = await Plans_Model.PostPaymentPlanToDB(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Plans_Service();