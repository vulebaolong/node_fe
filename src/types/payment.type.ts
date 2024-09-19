export type TMomoPayRes = {
   partnerCode: string;
   orderId: string;
   requestId: string;
   amount: number;
   responseTime: number;
   message: string;
   resultCode: number;
   payUrl: string;
   shortLink: string;
};

export type TMomoPayReq = {
   amount: number;
};
