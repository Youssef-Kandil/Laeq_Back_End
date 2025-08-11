import { Router } from "express";
import CheckList_Temp_Questions_Controller from "../Controllers/CheckList_Temp_Questions_Controller";

const router = Router();

router.post("/get_checklists_temp_questions", CheckList_Temp_Questions_Controller.getByID);
router.post("/add_checklists_temp_questions", CheckList_Temp_Questions_Controller.addByID);


export default router;