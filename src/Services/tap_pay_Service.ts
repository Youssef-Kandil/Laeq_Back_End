import { TapPayRequestPayload } from "../types/TapPayRequestType";
import Subscriptions_Model from "../Models/Subscriptions_Model";
import admin_users_Model from "../Models/admin_users_Model";


class tap_pay_Service {
    // == PAy == 
     public async createCheckout(payload: TapPayRequestPayload) {
        console.error("process.env.TAP_PUBLIC_KEY :: ",process.env.TAP_SECRET_LIVE_KEY);
        payload.amount = 1
        console.error("charges :: ",payload);
        const res = await fetch("https://api.tap.company/v2/charges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.TAP_SECRET_KEY}`, 
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
        }
        // console.log("res.json(hi) :: >>> ",await res.json());
        return res.json();
    }

    public async handlePaymentStatus(transaction_id:string,operationType: "renew" | "upgrade"){
        const res = await fetch(`https://api.tap.company/v2/charges/${transaction_id}`, {
            headers: {
              Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`, 
              "Content-Type": "application/json",
            },
          });

        if (!res.ok) {
          throw new Error("Failed to fetch payment status");
        }

        const  result = await res.json();
        console.warn("result : ",result);
        if (result.status === "CAPTURED") {
          console.warn("status");
            if (operationType ==  "renew") {
              console.warn("renew");
                  const  subscriptionResult =  await Subscriptions_Model.PostSubscriptionToDB({amount:result.amount,admin_id:1,plan_id:1});
                  const updateAdminAccountPlanResult = await admin_users_Model.updateAccountPlan({admin_id:1,start_date:"",end_date:"",plan_id:1,plan_type:""});
                  

            }
        }
        return result
    }


}

export default new tap_pay_Service();