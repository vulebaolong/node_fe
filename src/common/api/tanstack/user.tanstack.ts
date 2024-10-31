import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TRes, TResPagination } from "../../../types/app.type";
import { TUser } from "../../../types/user.type";
import api from "../axios/axios";

type TGetUseList = {
   page: number;
   pageSize: number;
   search: string;
   notMe: boolean;
};

export const useGetUserList = ({ page, pageSize, search, notMe }: TGetUseList) => {
   return useQuery({
      queryKey: [`user-list`, page, pageSize, search, notMe],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TUser[]>>(
            `${ENDPOINT.USER}?notMe=${notMe}&page=${page}&pageSize=${pageSize}&search=${search}`
         );

         return data.metaData;
      },
   });
};

export const useUploadAvatarLocal = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const { data } = await api.post<TRes<any>>(ENDPOINT.UPLOAD_AVATAR_LOCAL, payload, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         return data.metaData;
      },
   });
};

export const useUploadAvatarCloud = () => {
   return useMutation({
      mutationFn: async (payload: FormData) => {
         const { data } = await api.post<TRes<any>>(ENDPOINT.UPLOAD_AVATAR_CLOUD, payload, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         return data.metaData;
      },
   });
};
