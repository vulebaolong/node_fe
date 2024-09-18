import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { ROUTER } from "../../../constant/router.constant";
import {
   getAccessToken
} from "../../../helpers/auth.helper";
import { resError } from "../../../helpers/function.helper";
import rootRouter from "../../../routes/rootRouter";
import { TRes } from "../../../types/app.type";
import { TLoginFacebookReq } from "../../../types/facebook.type";
import {
   TLoginReq,
   TLoginRes,
   TRegisterReq,
   TResetPasswordReq,
   TSendEmailReq
} from "../../../types/user.type";
import api from "../axios/axios";

export const useRegister = () => {
   return useMutation({
      mutationFn: (payload: TRegisterReq) => {
         return api.post(ENDPOINT.AUTH.REGISTER(), payload);
      },
      onSuccess: () => {
         toast.success(`Register successfully`);
         rootRouter.navigate(ROUTER.LOGIN);
      },
      onError: (error) => {
         console.log(error);
         toast.error(resError(error, `Register failed`));
      },
   });
};

export const useLogin = () => {
   return useMutation({
      mutationFn: async (payload: TLoginReq) => {
         const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.LOGIN(), payload);
         return data;
      },
   });
};

export const useRefreshToken = () => {
   return useMutation({
      mutationFn: async () => {
         return await api.get(ENDPOINT.AUTH.REFRESH_TOKEN());
      },
      onSuccess: (data) => {
         console.log(`refreshToken`, data);
      },
   });
};

export const useIsLogin = () => {
   return useQuery({
      queryKey: [`is-login`],
      queryFn: () => {
         return !!getAccessToken();
      },
   });
};

export const useLoginFacebook = () => {
   return useMutation({
      mutationFn: async (payload: TLoginFacebookReq) => {
         const { data } = await api.post<TRes<TLoginRes>>(ENDPOINT.AUTH.FACEBOOK_LOGIN(), payload);
         return data;
      },
   });
};

export const useLoginGoolge = () => {
   return useMutation({
      mutationFn: async (payload: { code: string }) => {
         const { data } = await api.post<TRes<any>>(ENDPOINT.AUTH.GOOGLE_LOGIN(), payload);
         return data;
      },
   });
};

export const useResetPassword = () => {
   return useMutation({
      mutationFn: async (payload: TResetPasswordReq) => {
         const { data } = await api.post<TRes<any>>(ENDPOINT.AUTH.RESET_PASSWORD(), payload);
         return data;
      },
   });
};

export const useSendEmail = () => {
   return useMutation({
      mutationFn: async (payload: TSendEmailReq) => {
         const { data } = await api.post<TRes<any>>(ENDPOINT.AUTH.SEND_EMAIL(), payload);
         return data;
      },
   });
};
