import { Router } from "express";
import Checklist_Question_Answers_Controller from "../Controllers/Checklist_Question_Answers_Controller";

const router = Router();

router.post("/get_temp_questions_answers", Checklist_Question_Answers_Controller.getByID);
router.post("/add_temp_questions_answers", Checklist_Question_Answers_Controller.addByID);


export default router;