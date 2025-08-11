import { Router } from "express";
import Employees_Controller from "../Controllers/Employees_Controller";

const router = Router();

router.post("/get_all_emps_created_by_admin", Employees_Controller.getByID);
router.post("/add_new_emp", Employees_Controller.addByID);


export default router;