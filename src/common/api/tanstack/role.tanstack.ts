import { useMutation, useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TRes, TResPagination } from "../../../types/app.type";
import { TTogglePermissionReq, TListRoleRes } from "../../../types/role.type";
import api from "../axios/axios";

type TUseVideoList = {
   page: number;
   pageSize: number;
   search: string;
};

export const useListRole = ({ page, pageSize, search }: TUseVideoList) => {
   return useQuery({
      queryKey: [`list-role`, page, pageSize, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TListRoleRes[]>>(
            `${ENDPOINT.ROLE}?page=${page}&pageSize=${pageSize}&search=${search}`
         );
         return data.metaData;
      },
   });
};

export const useDetailRole = (roleId: string) => {
   return useQuery({
      queryKey: [`detail-role`, roleId],
      queryFn: async () => {
         const { data } = await api.get<TRes<TListRoleRes>>(`${ENDPOINT.ROLE}/${roleId}`);
         return data.metaData;
      },
   });
};

export const useTogglePermission = () => {
   return useMutation({
      mutationFn: async (payload: TTogglePermissionReq) => {
         const { data } = await api.post<TRes<any>>(`${ENDPOINT.TOGGLE_PERMISSION}`, payload);
         return data.metaData;
      },
   });
};
