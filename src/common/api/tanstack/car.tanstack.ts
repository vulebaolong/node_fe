import { useQuery } from "@tanstack/react-query";
import api from "../axios/axios";
import { TResPagination } from "../../../types/app.type";
import { TCar } from "../../../types/aar.type";
import { ENDPOINT } from "../../../constant/endpoint.constant";

type TUseCarList = {
   page: number;
   pageSize: number;
   search: string;
};

export const useCarList = ({ page, pageSize, search }: TUseCarList) => {
   return useQuery({
      queryKey: [`car-list`, page, pageSize, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TCar[]>>(`${ENDPOINT.CAR}?page=${page}&pageSize=${pageSize}&search=${search}`);
         return data.metaData;
      },
   });
};
