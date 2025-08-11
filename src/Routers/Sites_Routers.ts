import { Router } from "express";
import Sites_Controller from "../Controllers/Sites_Controller";

const router = Router();

router.post("/add_new_site", Sites_Controller.addByID);


export default router;