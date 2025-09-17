import checklist_Model from "../Models/checklist_Model";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class checklist_Service {
    // == Get All Checklist ==
    public async getAllCheckLists(admin_id:number) {
        try {
            const res = await checklist_Model.FetchCheckListFromDB(admin_id)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Checklist ==
    public async addNewCheckList(requestData:{checklist_title:string,admin_id:number,owner:string}) {
        try {
            const res = await checklist_Model.PostCheckListFromDB(requestData.checklist_title,requestData.admin_id,requestData.owner)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new checklist_Service();