import { Router } from "express";
import Roles_Controller from "../Controllers/Roles_Controller";

const router = Router();

router.post("/get_all_roles_created_by_admin", Roles_Controller.getByID);
router.post("/add_new_role", Roles_Controller.addByID);


export default router;