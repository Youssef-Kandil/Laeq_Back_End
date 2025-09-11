

import { PrismaClient } from "@prisma/client";
import { SubscriptionType } from "../types/paymentsPlanTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class Subscriptions_Model  {
    // === Get All Subscription
        public async FetchSubscriptionsFromDB(){
            const result =  await prisma.subscriptions.findMany()
            console.warn("Model : ",result)
            return result
        }

    // === Add New Subscription
        public async PostSubscriptionToDB(args:SubscriptionType){
            const res =  await prisma.subscriptions.create({
                data:{
                    admin_id:args.admin_id,
                    plan_id:args.plan_id,
                    amount:args.amount,
                    transaction_id:args.transaction_id
                }
            })
            console.warn("Model : ",res)
            return res;
        }
}

export default new Subscriptions_Model();