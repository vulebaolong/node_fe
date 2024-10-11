import { TUser } from "./user.type";

export type TVideoType = {
   type_name: string;
   icon: string;
   type_id: number;
   created_at: string;
   updated_at: string;
};

export type TVideo = {
   video_id: number;
   video_name: string;
   thumbnail: string;
   description: string;
   views: number;
   source: string;
   user_id: number;
   type_id: number;
   created_at: string;
   updated_at: string;
   users: TUser;
};

export type TVideoCommentReq = {
   video_id: number;
   content: string;
};

export type TVideoCommentRes = {
   comment_id: number;
   users: TUser;
   video: TVideo;
   content: string;
   created_at: string;
   updated_at: string;
};

export type TVideoLikeReq = {
   video_id: number;
};

export type TVideoGetLikeRes = {
   like_id: number;
   user_id: number;
   video_id: number;
   is_like: boolean;
   dis_like: boolean;
   created_at: string;
   updated_at: string;
};
