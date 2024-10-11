import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../axios/axios";
import { TVideo, TVideoCommentReq, TVideoCommentRes, TVideoGetLikeRes, TVideoLikeReq, TVideoType } from "../../../types/video-type";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TRes, TResPagination } from "../../../types/app.type";
import { wait } from "../../../helpers/function.helper";

type TUseVideoList = {
   page: number;
   pageSize: number;
   typeId: number;
   search: string;
};

export const useVideoList = ({ page, pageSize, typeId, search }: TUseVideoList) => {
   return useQuery({
      queryKey: [`video-list`, page, pageSize, typeId, search],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TVideo[]>>(
            `${ENDPOINT.VIDEO.VIDEO_LIST}?page=${page}&pageSize=${pageSize}&type_id=${typeId}&search=${search}`
         );
         return data.metaData;
      },
   });
};



export const useVideoType = () => {
   return useQuery({
      queryKey: [`video-type`],
      queryFn: async () => {
         const { data } = await api.get<TRes<TVideoType[]>>(ENDPOINT.VIDEO.VIDEO_TYPE);
         return data.metaData;
      },
   });
};

export const useVideoDetail = (video_id: number) => {
   return useQuery({
      queryKey: [`video-detail`, video_id],
      queryFn: async () => {
         const { data } = await api.get<TRes<TVideo>>(`${ENDPOINT.VIDEO.VIDEO_DETAIL}/${video_id}`);
         return data.metaData;
      },
   });
};

export const useVideoComment = () => {
   return useMutation({
      mutationFn: async (payload: TVideoCommentReq) => {
         const { data } = await api.post<TRes<TVideoCommentRes>>(`${ENDPOINT.VIDEO.VIDEO_COMMENT}`, payload);
         return data.metaData;
      },
   });
};

type TUseVideoCommentList = {
   page: number;
   pageSize: number;
   video_id: number;
};
export const useVideoCommentList = ({ page, pageSize, video_id }: TUseVideoCommentList) => {
   return useQuery({
      queryKey: [`video-comment-list`, page],
      queryFn: async () => {
         const { data } = await api.get<TResPagination<TVideoCommentRes[]>>(
            `${ENDPOINT.VIDEO.VIDEO_COMMENT_LIST}/${video_id}?page=${page}&pageSize=${pageSize}`
         );
         await wait(1000);
         return data.metaData;
      },
   });
};

export const useVideoCommentFirst = () => {
   return useMutation({
      mutationFn: async (video_id: number) => {
         const { data } = await api.get<TResPagination<TVideoCommentRes[]>>(
            `${ENDPOINT.VIDEO.VIDEO_COMMENT_LIST}/${video_id}?page=${1}&pageSize=${1}`
         );
         return data.metaData.items[0];
      },
   });
};

export const useVideoLike = () => {
   return useMutation({
      mutationFn: async (payload: TVideoLikeReq) => {
         const { data } = await api.post<TRes<TVideoCommentRes>>(`${ENDPOINT.VIDEO.VIDEO_LIKE}`, payload);
         return data.metaData;
      },
   });
};

export const useVideoDisLike = () => {
   return useMutation({
      mutationFn: async (payload: TVideoLikeReq) => {
         const { data } = await api.post<TRes<TVideoCommentRes>>(`${ENDPOINT.VIDEO.VIDEO_DISLIKE}`, payload);
         return data.metaData;
      },
   });
};

export const useVideoGetLike = (video_id: number) => {
   return useQuery({
      queryKey: [`video-get-like`, video_id],
      queryFn: async () => {
         const { data } = await api.get<TRes<TVideoGetLikeRes>>(`${ENDPOINT.VIDEO.VIDEO_GET_LIKE}/${video_id}`);
         return data.metaData;
      },
   });
};

export const useGetTotalLike = (video_id: number) => {
   return useQuery({
      queryKey: [`video-get-total-like`, video_id],
      queryFn: async () => {
         const { data } = await api.get<TRes<number>>(`${ENDPOINT.VIDEO.VIDEO_GET_TOAL_LIKE}/${video_id}`);
         return data.metaData;
      },
   });
};



export const useVideoListTest = () => {
   return useQuery({
      queryKey: [`video-list-test`],
      queryFn: async () => {
         const { data } = await api.get<TVideo[]>(`${ENDPOINT.VIDEO.VIDEO_LIST_TEST}`);
         return data;
      },
   });
};

export const useVideoTypeTest = () => {
   return useQuery({
      queryKey: [`video-type-test`],
      queryFn: async () => {
         const { data } = await api.get<TVideoType[]>(ENDPOINT.VIDEO.VIDEO_TYPE_TEST);
         return data;
      },
   });
};