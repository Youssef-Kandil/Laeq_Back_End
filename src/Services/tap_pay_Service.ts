import { TapPayRequestPayload } from "../types/TapPayRequestType";
import Subscriptions_Model from "../Models/Subscriptions_Model";
import admin_users_Model from "../Models/admin_users_Model";
import { UpgradeSubscripationType ,HandelSubscripationType } from "../types/handelSubscripationType";


const TESTDATA = {
  admin_id:1,
  transaction_id:"args.transaction_id",
  amount:0,
  start_date:"",
  end_date:"",
  plan_id:1,
  plan_type:"",
  max_companies:0,
  max_site:0,
  max_users:0,
  max_custom_checklists:0,
  max_Corrective_action:0,
  free_onsite_inspections:0,
  Arabic_language_support:0,
  Access_to_training_programs:0,
  Daily_monitoring_sheets:0,
}



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
        console.log("err :: ",err)
        throw new Error(err);
        }
        // console.log("res.json(hi) :: >>> ",await res.json());
        return res.json();
    }


    public async handlePaymentStatus(args: HandelSubscripationType) {
      try {
        const res = await fetch(`https://api.tap.company/v2/charges/${args.transaction_id}`, {
          headers: {
            Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        });
        console.log("CHECKK Service res >>> ",res)
    
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch payment status: ${errText}`);
        }
    
        const result = await res.json();
        console.warn("result : ", result);
    
        if (result.status === "CAPTURED") {
          switch (args.operationType) {
            case "renew":
              await admin_users_Model.renewAccountPlan(args);
              break;
            case "upgrade":
              await admin_users_Model.upgradeAccountPlan(args as UpgradeSubscripationType);
              break;
            default:
              const _exhaustiveCheck: never = args as never;
              throw new Error(`Unsupported operation type: ${_exhaustiveCheck}`);
          }
        }else{
          return null;
        }
    
        return result;
      } catch (error) {
        console.error("handlePaymentStatus error:", error);
        throw error; // ممكن ترجع error object أو ترميه حسب اللي محتاجه
      }
    }
    
}

export default new tap_pay_Service();