import Roles_Model from "../Models/Roles_Model";
import { Full_RolePermions } from "../types/RolesTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Roles_Service {
    // == Get All Checklist ==
    public async getAllRolesByAdminID(requestData:{admin_id:number}) {
        try {
            const res = await Roles_Model.FetchRolesCreatedByAdminFromDB(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Checklist ==
    public async addNewRoleByAdminID(requestData:Full_RolePermions) {
        try {
            const res = await Roles_Model.PostNewRoleByAdminID(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Roles_Service();