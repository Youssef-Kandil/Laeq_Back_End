import { Router } from "express";
import CheckList_Controller from "../Controllers/CheckList_Controller";

const router = Router();

router.post("/get_checklists", CheckList_Controller.getByAdminID);
router.post("/add_checklists", CheckList_Controller.add);


export default router;