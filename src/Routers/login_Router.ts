import { Router } from "express";
import login_Controller from "../Controllers/login_Controller";

const router = Router();

router.post("/login",login_Controller.login);

router.post("/login_with_google",login_Controller.login_with_google);

export default router;