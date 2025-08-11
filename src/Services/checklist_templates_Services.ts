import checklist_templates_Model from "../Models/checklist_templates_Model";
import { Template } from "../types/checklistTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;


class checklist_templates_Service {
    // == Get Checkist Temp ==
    public async getCheckListsTemplatsByID(requestData:{checklist_id:number}) {
        try {
            if (!requestData) {
                return null
            }
            if (requestData.checklist_id) {                
                const res = await checklist_templates_Model.FetchCheckList_Temps_BY_ID_FromDB(requestData.checklist_id)
                console.warn("Service : ",res)
                return res
            }
            
        } catch (error) {
            throw error;
        }
    }
    // == Add New Checklist Temp ==
    public async addCheckListsTemplatsByID(requestData:Template){
        try {
            console.warn("Service requestData : ",requestData)
            if (!requestData) {
                return null
            }
            if (requestData.checklist_id) {                
                const res = await checklist_templates_Model.PostCheckList_Temps_BY_ID_FromDB(requestData.checklist_id,requestData.template_title,requestData.questions)
                console.warn("Service : ",res)
                return res
            }
            
        } catch (error) {
            throw error;
        }
    }



}

export default new checklist_templates_Service();