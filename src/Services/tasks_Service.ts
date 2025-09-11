import { TaskType } from "../types/Tasks_Type";

import tasks_Model from "../Models/tasks_Model";


class tasks_Service {

     public async handleAssignTaskToUser(payload: TaskType[]) {
        try {
            const res = await tasks_Model.AssignTasksToUser(payload)
            console.warn("Service : ", res)
            return res
        } catch (error) {
            throw error;
        }
    }


     public async handleGetAdminAccountTasks(payload: TaskType) {
        try {
            const res = await tasks_Model.FetchTasksCreatedByAdminFromDB(payload)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }


     public async handleGetUserTasks(payload: TaskType) {
        try {
            const res = await tasks_Model.FetchTasksAssignedToUserFromDB(payload)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

     public async handleUpdateTaskStatus(payload:  { task_id: number; status: string }) {
        try {
            const res = await tasks_Model.UpdateTaskStatus(payload)
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }

    
}

export default new tasks_Service();