import { Router } from "express";
import admin_users_Controller from "../Controllers/admin_users_Controller";

const router = Router();

router.post("/create_admin_account", admin_users_Controller.create);
router.post("/create_admin_account_with_google", admin_users_Controller.createWithGoogle);

export default router;