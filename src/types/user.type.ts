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
   token?: string;
};
export type TLoginRes = {
   accessToken: string;
   refreshToken: string;
   deviceId: string;
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
   created_at: string;
   updated_at: string;
   roles: TListRoleRes;
   session_login: TSessionLogin[] | [];
   two_fa: TTwoFa | null;
};

export type TSessionLogin = {
   session_login_id: number;
   device_name: string;
   is_active: boolean;
   created_at: string;
   updated_at: string;
};

export type TTwoFa = {
   is_2fa_enabled: boolean;
   created_at: string;
   updated_at: string;
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
