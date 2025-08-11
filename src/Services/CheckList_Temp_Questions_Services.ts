import CheckList_Temp_Questions_Model from "../Models/CheckList_Temp_Questions_Model";
import { Question } from "../types/checklistTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class CheckList_Temp_Questions_Service {
    // == Get All Questions of Template ==
    public async getTemplatQuestionsByID(requestData:{template_id:number}) {
        try {
            if (!requestData) {
                return null
            }
            if (requestData.template_id) {                
                const res = await CheckList_Temp_Questions_Model.Fetch_Temp_Questions_BY_ID_FromDB(requestData.template_id)
                console.warn("Service : ",res)
                return res
            }
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Question To Template ==
    public async addTemplatQuestionsByID(requestData:Question) {
        try {
            if (!requestData) {
                return null
            }
            if (requestData.template_id) {                
                const res = await CheckList_Temp_Questions_Model.Post_Temp_Questions_BY_ID_FromDB(requestData.template_id,requestData.question_title,requestData.fields)
                console.warn("Service : ",res)
                return res
            }
            
        } catch (error) {
            throw error;
        }
    }



}

export default new CheckList_Temp_Questions_Service();