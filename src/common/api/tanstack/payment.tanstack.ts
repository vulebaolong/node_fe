import { useMutation } from "@tanstack/react-query";
import api from "../axios/axios";
import { TRes } from "../../../types/app.type";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TMomoPayReq, TMomoPayRes } from "../../../types/payment.type";

export const usePayMomo = () => {
   return useMutation({
      mutationFn: async (payload: TMomoPayReq) => {
         const { data } = await api.post<TRes<TMomoPayRes>>(ENDPOINT.PAYMENT_MOMO, payload);

         return data.metaData;
      },
   });
};
