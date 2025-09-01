export interface TapPayRequestPayload{
  amount: number;
  currency?: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  description?: string;
  source:{
    type:string
  };
  charges: [
    {
      description: string
      amount: number
    }
  ];
}