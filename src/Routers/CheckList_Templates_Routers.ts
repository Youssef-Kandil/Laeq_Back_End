import { Router } from "express";
import checkList_Templates_Controller from "../Controllers/checkList_Templates_Controller";

const router = Router();

router.post("/get_checklists_Temp", checkList_Templates_Controller.getByID);
router.post("/add_checklists_Temp", checkList_Templates_Controller.addByID);


export default router;