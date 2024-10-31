import { useMutation, useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { ROUTER } from "../../../constant/router.constant";
import { TRes, TResPagination } from "../../../types/app.type";
import { TCreateChatReq, TCreateChatRes, TListChatRes } from "../../../types/chat.type";
import { TListUserChatRes, TUser } from "../../../types/user.type";
import api from "../axios/axios";
import _ from "lodash"

export const useCreateChat = () => {
   return useMutation({
      mutationFn: async (payload: TCreateChatReq) => {
         const { data } = await api.post<TRes<TCreateChatRes>>(ENDPOINT.CHAT.BASE(), payload);
         return data;
      },
   });
};

type TUseListChat = {
   userSelected: TUser | null;
};
export const useListChat = ({ userSelected }: TUseListChat) => {
   return useQuery({
      queryKey: [`list-chat`, userSelected],
      queryFn: async () => {
         const { data } = await api.get<TRes<TListChatRes[]>>(`${ROUTER.CHAT}?userIdRecipient=${userSelected?.user_id}`);
         return data.metaData;
      },
      enabled: !!userSelected,
   });
};

type TListUserChat = {
   page: number;
   pageSize: number;
   search: string;
   notMe: boolean
};

export const useListUserChat = ({ page, pageSize, search, notMe }: TListUserChat) => {
   return useQuery({
      queryKey: [`user-list`, page, pageSize, search, notMe],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TListUserChatRes[]>>(`${ENDPOINT.CHAT.LIST_USER_CHAT}?notMe=${notMe}&page=${page}&pageSize=${pageSize}&search=${search}`);

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