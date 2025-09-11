import { PrismaClient } from "@prisma/client";
import { TaskType } from "../types/Tasks_Type";


const prisma = new PrismaClient();


class tasks_Model  {

    // === Add New Task
    public async AssignTasksToUser(tasks: TaskType[]) {
      try {
        const res = await prisma.tasks.createMany({
          data: tasks.map((task) => ({
            admin_id: task.admin_id,
            user_id: task.user_id,
            template_id: task.template_id, 
            company_id: task.company_id,
            site_id: task.site_id,
            status: "Pending",
          })),
        });
    
        console.warn("Inserted tasks: ", res);
        return res;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    

    // === Get All Tasks Created By Admin
    public async FetchTasksCreatedByAdminFromDB(arg: { admin_id: number }) {
      console.log("Admin");
        try {
          const result = await prisma.tasks.findMany({
            where: {
              admin_id: arg.admin_id,
            },
            select: {
              id: true,
              status: true,
              date: true,
              // بيانات من جدول users
              users: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                },
              },
              // بيانات من جدول companies
              companies: {
                select: {
                  id: true,
                  company_name: true,
                  sector_type: true,
                },
              },
              // بيانات من جدول sites
              sites: {
                select: {
                  id: true,
                  site_name: true,
                  full_address: true,
                },
              },
              // كل بيانات templates
              templates: true,
            },
          });
      
          console.warn("Model : ", result);
          return result;
        } catch (error) {
          console.error("❌ Error fetching tasks by admin_id:", error);
          throw new Error("Failed to fetch tasks"); // ترمي error تقدر تمسكه في layer أعلى
        }
      }
      

    // === Get All User Tasks
        public async FetchTasksAssignedToUserFromDB(arg:{user_id:number}){
          console.log("EMP User");
            try {
                const result = await prisma.tasks.findMany({
                  where: {
                    user_id: arg.user_id,
                  },
                  select: {
                    id: true,
                    status: true,
                    date: true,
                    // بيانات من جدول users
                    users: {
                      select: {
                        id: true,
                        email: true,
                        role: true,
                      },
                    },
                    // بيانات من جدول companies
                    companies: {
                      select: {
                        id: true,
                        company_name: true,
                        sector_type: true,
                      },
                    },
                    // بيانات من جدول sites
                    sites: {
                      select: {
                        id: true,
                        site_name: true,
                        full_address: true,
                      },
                    },
                    // كل بيانات templates
                    templates: true,
                  },
                });
            
                console.warn("Model : ", result);
                return result;
              } catch (error) {
                console.error("❌ Error fetching tasks by admin_id:", error);
                throw new Error("Failed to fetch tasks"); // ترمي error تقدر تمسكه في layer أعلى
              }
        }

        // === Update Task Status
        public async UpdateTaskStatus(arg: { task_id: number; status: string }) {
            try {
            const result = await prisma.tasks.update({
                where: {
                id: arg.task_id,
                },
                data: {
                status: arg.status,
                },
                select: {
                id: true,
                status: true,
                date: true,
                },
            });
        
            console.log("✅ Task updated:", result);
            return result;
            } catch (error) {
            console.error("❌ Error updating task status:", error);
            throw new Error("Failed to update task status");
            }
        }
  


}

export default new tasks_Model();