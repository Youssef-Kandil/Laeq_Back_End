
export interface Field{
    question_id:number;
    type:string;
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
    answerID?:number;
    userID:number;
    questionID:number;
    fieldID:number;
    value:string;
    type:string;
    answered_at?:string|Date;
};