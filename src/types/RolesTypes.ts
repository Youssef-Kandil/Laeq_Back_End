


export interface permissionType{
     permission_name:string;
     permission_type:string;
}


export interface RoleType{
     admin_id:number;
     role_name:string;
     description:string;

     department_id?:number;
}

export interface Full_RolePermions{
     admin_id:number;
     role_name:string;
     description:string;
     department_id?:number;

     permissionsIds:number[],
}