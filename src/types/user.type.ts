import { TCreateChatRes } from "./chat.type";

export type TRegisterReq = {
   full_name: string;
   email: string;
   pass_word: string;
};

export type TLoginReq = {
   email: string;
   pass_word: string;
};
export type TLoginRes = {
   accessToken: string;
   refreshToken: string;
};

export type TUser = {
   user_id: number;
   full_name: string;
   email: string;
   avatar: string | null;
   face_app_id: string | null;
   role: string | null;
   refresh_token: string | null;
};

export type TUserListRes = {
   chats_chats_user_id_recipientTousers?: TCreateChatRes[];
   chats_chats_user_id_senderTousers?: TCreateChatRes[];
   lastMessage: string
} & TUser;
