import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TCar } from "../../../types/aar.type";
import api from "../axios/axios";


export const useCarList = () => {
   return useQuery({
      queryKey: [`car-list`],
      queryFn: async () => {
         const { data } = await api.get<TCar[]>(`${ENDPOINT.CAR}`);
         return data;
      },
   });
};
