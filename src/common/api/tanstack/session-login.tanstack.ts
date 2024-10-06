import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../axios/axios";
import { TRes, TResPagination } from "../../../types/app.type";
import { TSessionLogin } from "../../../types/session-login.type";
import { ENDPOINT } from "../../../constant/endpoint.constant";

type TUseSessionLoginListIN = {
   page: number;
   pageSize: number;
   search?: string;
};

export const useSessionLoginListIN = ({ page, pageSize, search = `` }: TUseSessionLoginListIN) => {
   return useQuery({
      queryKey: [`session-login-list-in`, page, pageSize, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TSessionLogin[]>>(
            `${ENDPOINT.SESSION_LOGIN.LIST}?page=${page}&pageSize=${pageSize}&is_active=true&search=${search}`
         );
         return data.metaData;
      },
   });
};
type TUseSessionLoginListOUT = {
   page: number;
   pageSize: number;
   search?: string;
};

export const useSessionLoginListOUT = ({ page, pageSize, search = `` }: TUseSessionLoginListOUT) => {
   return useQuery({
      queryKey: [`session-login-list-out`, page, pageSize, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TSessionLogin[]>>(
            `${ENDPOINT.SESSION_LOGIN.LIST}?page=${page}&pageSize=${pageSize}&is_active=false&search=${search}`
         );
         return data.metaData;
      },
   });
};

export const useLogOutDevice = () => {
   return useMutation({
      mutationFn: async (session_login_id: number) => {
         const { data } = await api.patch<TRes<any>>(`${ENDPOINT.SESSION_LOGIN.LOGOUT_DEVICE}/${session_login_id}`);
         return data;
      },
   });
};
