import Checklist_Question_Answers_Model from "../Models/Checklist_Question_Answers_Model";
import { Answer } from "../types/checklistTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Checklist_Question_Answers_Services {
    // == Get All Questions of Template ==/*+++RETORN - ALL QUESTIONS AND ANSWERS OF ONE TEMPLATE +++*/
    public async getQuestionsAnswersByTemplateID(requestData:{template_id:number}) {
        try {
            if (!requestData) {
                return null
            }
            if (requestData?.template_id) {                
                const res = await Checklist_Question_Answers_Model.Fetch_Questions_Answers_BY_Template_ID_FromDB(requestData.template_id)
                console.warn("Service : ",res)
                return res
            }
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Question To Template ==/*+++ADD ANSWERS To ONE OR More Question +++*/
    public async addQuestionAnswersByID(requestData:Answer[]) {
        try {
            if (!requestData) {
                return null
            }
            if (requestData.length === 0) {
                return null
            }
            if (!requestData[0]?.questionID) {
                return null
            }
            const res = await Checklist_Question_Answers_Model.Post_Question_Answers_BY_ID_FromDB(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        };
    }



}

export default new Checklist_Question_Answers_Services();