export interface SubscriptionType{
    admin_id:number;
    plan_id:number;
    amount:number;
    transaction_id:string;
}

interface plan_features{
    feature_value:string;
    feature_id:number;
}

export interface planType{
    title:string;
    price:string;
    duration:string;
    is_yearly:number;
    plan_features:plan_features[];
}