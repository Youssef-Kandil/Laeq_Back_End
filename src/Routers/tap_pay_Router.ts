import { Router } from "express";
import tap_pay_Controller from "../Controllers/tap_pay_Controller";

const router = Router();

router.post("/pay_check", tap_pay_Controller.check);
router.post("/pay_checkout", tap_pay_Controller.pay);


export default router;