import { Router } from "express";
import Laeq_Super_admin_Controllers from "../Controllers/Laeq_Super_admin_Controllers";

const router = Router();

router.put("/update_laeq_admin_info", Laeq_Super_admin_Controllers.edit);


export default router;