import { PrismaClient } from "@prisma/client";
import { planType } from "../types/paymentsPlanTypes";
import encryption_RSA from "../Utils/encryption_RSA";

const prisma = new PrismaClient();


class Plans_Model  {
    // === Get All CheckLists (Parent Categories)
        public async FetchPaymentsPlansFromDB(){
            const plans =  await prisma.plans.findMany({
                include:{
                    plan_features:{
                        select:{
                            feature_id:true,
                            feature_value:true,
                            features:{
                                select:{
                                    feature_name:true,
                                    type:true
                                }
                            }
                        }
                    }
                }
            })

        const result = plans.map(plan => ({
            ...plan,
            plan_features: plan.plan_features.map(pf => ({
                feature_id: pf.feature_id,
                feature_value: pf.feature_value,
                feature_name: pf.features?.feature_name,
                type: pf.features?.type
            }))
        }));
            console.warn("Model : ",result)
            return result
        }

    // === Add New CheckLists (Parent Categories)
        public async PostPaymentPlanToDB(args:planType){
            const res =  await prisma.plans.create({
                data:{
                    title:args.title,
                    price:args.price,
                    duration:args.duration,
                    is_yearly:args.is_yearly,
                    plan_features:{
                        create:args.plan_features
                    }
                }
            })
            console.warn("Model : ",res)
            return res
        }
}

export default new Plans_Model();