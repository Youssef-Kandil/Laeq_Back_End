import { Router } from "express";
import Plans_Controller from "../Controllers/Plans_Controller";

const router = Router();

router.get("/get_all_plans", Plans_Controller.get);
router.post("/add_new_plan", Plans_Controller.add);


export default router;