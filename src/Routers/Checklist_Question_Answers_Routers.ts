import { Router } from "express";
import Checklist_Question_Answers_Controller from "../Controllers/Checklist_Question_Answers_Controller";
import multer from "multer";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post("/get_admin_reports", Checklist_Question_Answers_Controller.getAdminReportsController);
router.post("/get_user_reports", Checklist_Question_Answers_Controller.getUserReportsController);

router.post("/get_temp_questions_answers", Checklist_Question_Answers_Controller.getByID);
router.post("/add_temp_questions_answers",upload.any(), Checklist_Question_Answers_Controller.addByID);


export default router;