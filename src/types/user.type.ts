import { TCreateChatRes } from "./chat.type";
import { TListRoleRes } from "./role.type";

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
   google_id: string | null;
   role_id: number;
   refresh_token: string | null;
   created_at: string
   update_at: string
   roles: TListRoleRes
};

export type TUserListRes = {
   chats_chats_user_id_recipientTousers?: TCreateChatRes[];
   chats_chats_user_id_senderTousers?: TCreateChatRes[];
   lastMessage: string;
} & TUser;

export type TResetPasswordReq = {
   code: string;
   email: string;
   pass_word: string;
};

export type TSendEmailReq = {
   email: string;
};
