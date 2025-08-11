import { Router } from "express";
import Companies_Controller from "../Controllers/Companies_Controller";

const router = Router();

router.post("/get_all_user_companies", Companies_Controller.getByID);
router.post("/add_new_company", Companies_Controller.addByID);


export default router;