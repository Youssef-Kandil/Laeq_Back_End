import { Router } from "express";
import permissions_Controller from "../Controllers/permissions_Controller";

const router = Router();

router.get("/get_all_permissions",permissions_Controller.get);


export default router;