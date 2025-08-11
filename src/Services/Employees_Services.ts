import Employees_Model from "../Models/Employees_Model";

import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";
import { employeeType } from '../types/UsersTypes';



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Employees_Services {
    // == Get All Checklist ==
    public async getAll_Emps_ByAdminID(requestData:{admin_id:number}) {
        try {
            const res = await Employees_Model.FetchEmployeesCreatedByAdminFromDB(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Checklist ==
    public async addNew_Emp_ByAdminID(requestData:employeeType) {
        try {
            const res = await Employees_Model.PostNewEmployeeByAdminID(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Employees_Services();