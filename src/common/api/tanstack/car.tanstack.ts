import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TCar } from "../../../types/aar.type";
import { TRes } from "../../../types/app.type";
import api from "../axios/axios";

export const useCarList = () => {
   return useQuery({
      queryKey: [`car-list`],
      queryFn: async () => {
         const { data } = await api.get<TRes<TCar[]>>(`${ENDPOINT.CAR}`);
         return data.metaData;
      },
   });
};

 