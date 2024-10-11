export type TCreateChatReq = {
   userIdRecipient: number;
   message: string;
};

export type TCreateChatRes = {
   chat_id: number;
   message: string;
   user_id_sender: number;
   user_id_recipient: number;
   created_at: string;
   updated_at: string;
};

export type TListChatRes = TCreateChatRes
