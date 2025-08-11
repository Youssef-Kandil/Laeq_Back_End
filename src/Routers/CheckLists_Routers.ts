import { Router } from "express";
import CheckList_Controller from "../Controllers/CheckList_Controller";

const router = Router();

router.get("/get_checklists", CheckList_Controller.get);
router.post("/add_checklists", CheckList_Controller.add);


export default router;