import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TRes, TResPagination } from "../../../types/app.type";
import { TUser, TUserListRes } from "../../../types/user.type";
import api from "../axios/axios";
import _ from "lodash";

type TGetUseList = {
   page: number;
   pageSize: number;
   search: string;
};

export const useGetUserList = ({ page, pageSize, search }: TGetUseList) => {
   return useQuery({
      queryKey: [`user-list`, page, pageSize, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TUserListRes[]>>(
            `${ENDPOINT.USER}?notMe=true&page=${page}&pageSize=${pageSize}&search=${search}`
         );

         data.metaData.items = data.metaData.items.map((user) => {
            // Gom hai mảng lại và chọn update_at mới nhất
            const combinedChats = _.concat(
               user.chats_chats_user_id_recipientTousers,
               user.chats_chats_user_id_senderTousers
            );

            // Tìm tin nhắn có update_at mới nhất
            const lastMessage = _.maxBy(combinedChats, "update_at");
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
