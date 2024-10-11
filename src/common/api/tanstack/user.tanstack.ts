import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TRes, TResPagination } from "../../../types/app.type";
import { TUserListRes } from "../../../types/user.type";
import api from "../axios/axios";

type TGetUseList = {
   page: number;
   pageSize: number;
   search: string;
};

export const useGetUserList = ({ page, pageSize, search }: TGetUseList) => {
   return useQuery({
      queryKey: [`user-list`, page, pageSize, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TUserListRes[]>>(`${ENDPOINT.USER}?notMe=true&page=${page}&pageSize=${pageSize}&search=${search}`);

         data.metaData.items = data.metaData.items.map((user) => {
            // Gom hai mảng lại và chọn updated_at mới nhất
            const combinedChats = _.concat(user.chats_chats_user_id_recipientTousers, user.chats_chats_user_id_senderTousers);

            // Tìm tin nhắn có updated_at mới nhất
            const lastMessage = _.maxBy(combinedChats, "updated_at");
            delete user.chats_chats_user_id_recipientTousers;
            delete user.chats_chats_user_id_senderTousers;
            return {
               ...user,
               lastMessage: lastMessage?.message || ``,
            };
         });
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
