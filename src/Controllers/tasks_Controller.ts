

import { Request, Response } from "express";
import tasks_Service from "../Services/tasks_Service";
import { TaskType } from "../types/Tasks_Type";



class tasks_Controller {

    // == Tap Pay ==
    public async assignTask(req: Request, res: Response) {
        // code here
        try {
            const payload: TaskType[] = req.body;
            const data = await tasks_Service.handleAssignTaskToUser(payload);
            console.warn("payload :: ",data)

            res.status(200).json(data);
        } catch (err: any) {
            console.error("PAY CONTROLLER : ",err)
            res.status(500).json({ error: err.message });
        }
    }

    public async getAdminAccountTasks(req:Request, res: Response){
        try{
            const args :TaskType = req.body
            const check = await tasks_Service.handleGetAdminAccountTasks(args);
             res.status(200).json(check);

        }catch(err:any){
            console.error("PAY CHECK CONTROLLER : ",err)
            res.status(500).json({ error: err.message });

        }
    }
    
    public async getUserTasks(req:Request, res: Response){
        try{
            const args :TaskType = req.body
            const check = await tasks_Service.handleGetUserTasks(args);
             res.status(200).json(check);

        }catch(err:any){
            console.error("PAY CHECK CONTROLLER : ",err)
            res.status(500).json({ error: err.message });

        }
    }

    public async updateStatus(req:Request, res: Response){
        try{
            const args :{ task_id: number; status: string } = req.body
            const check = await tasks_Service.handleUpdateTaskStatus(args);
             res.status(200).json(check);

        }catch(err:any){
            console.error("PAY CHECK CONTROLLER : ",err)
            res.status(500).json({ error: err.message });

        }
    }



}

export default  new tasks_Controller();