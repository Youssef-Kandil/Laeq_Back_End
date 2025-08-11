import Subscriptions_Model from "../Models/Subscriptions_Model";
import { SubscriptionType } from "../types/paymentsPlanTypes";
import encryption from "../Utils/encryption";
import {  Response } from "express";
import jwt from "jsonwebtoken";



// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class Subscriptions_Service {
    // == Get All Subscription ==
    public async getAllSubscriptions() {
        try {
            const res = await Subscriptions_Model.FetchSubscriptionsFromDB()
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    // == Add New Subscription ==
    public async addNewSubscription(requestData:SubscriptionType) {
        try {
            const res = await Subscriptions_Model.PostSubscriptionToDB(requestData)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }



}

export default new Subscriptions_Service();