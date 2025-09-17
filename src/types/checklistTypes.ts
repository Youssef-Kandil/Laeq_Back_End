interface options{
    label:string;
    value:string;
}
export interface Field{
    question_id:number;
    type:string;
    options?:[];
};

export interface Question{
    template_id:number;
    question_title:string;
    fields:Field[]
};

export interface Template{
    checklist_id:number;
    template_title:string;
    questions?:Question[]
}; 


export interface Answer{
    admin_id:number;
    answerID?:number;
    userID:number;
    task_id:number;
    questionID:number;
    fieldID:number;
    value:string | Blob | Buffer;
    type:string;
    answered_at?:string|Date; 
};