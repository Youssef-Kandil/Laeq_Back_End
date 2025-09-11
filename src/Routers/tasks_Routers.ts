import { Router } from "express";
import tasks_Controller from "../Controllers/tasks_Controller";

const router = Router();

router.post("/assignTaskToUserByAdminID", tasks_Controller.assignTask);
router.post("/getTaskByAdminID", tasks_Controller.getAdminAccountTasks);
router.post("/getTaskByUSERID", tasks_Controller.getUserTasks);
router.put("/updateTaskStatusByID", tasks_Controller.updateStatus);


export default router;