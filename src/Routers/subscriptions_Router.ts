import { Router } from "express";
import Subscriptions_Controller from "../Controllers/Subscriptions_Controller";

const router = Router();

router.get("/get_all_subscriptions", Subscriptions_Controller.get);
router.post("/add_new_subscription", Subscriptions_Controller.add); 


export default router; 