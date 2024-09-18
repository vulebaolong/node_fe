import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../axios/axios";
import { ROUTER } from "../../../constant/router.constant";
import { TCreateChatReq, TCreateChatRes, TListChatRes } from "../../../types/chat.type";
import { TRes } from "../../../types/app.type";
import { TUser } from "../../../types/user.type";
import { ENDPOINT } from "../../../constant/endpoint.constant";

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
