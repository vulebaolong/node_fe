import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { ROUTER } from "../../../constant/router.constant";
import {
   getAccessToken,
   logOut,
   setAccessToken,
   setRefreshToken,
} from "../../../helpers/auth.helper";
import { resError } from "../../../helpers/function.helper";
import rootRouter from "../../../routes/rootRouter";
import { SET_INFO, UPDATE_IS_LOGIN } from "../../../store/slices/user/user.slice";
import { useAppDispatch } from "../../../store/store";
import { TRes } from "../../../types/app.type";
import { TLoginReq, TLoginRes, TRegisterReq, TUser } from "../../../types/user.type";
import api from "../axios/axios";
import { TLoginFacebookReq } from "../../../types/facebook.type";

export const useRegister = () => {
   return useMutation({
      mutationFn: (payload: TRegisterReq) => {
         return api.post(ENDPOINT.AUTH.REGISTER(), payload);
      },
      onSuccess: () => {
         toast.success(`Register successfully`);
         rootRouter.navigate(ROUTER.LOGIN());
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

export const useInfo = () => {
   const dispatch = useAppDispatch();
   return useMutation({
      mutationFn: async () => {
         const { data } = await api.get<TRes<TUser>>(ENDPOINT.AUTH.GET_INFO());
         return data.metaData;
      },
      onSuccess: (data) => {
         dispatch(SET_INFO(data));
      },
      onError: () => {
         console.log(`logout`);
         logOut();
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
