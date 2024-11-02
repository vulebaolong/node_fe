import { createSlice } from "@reduxjs/toolkit";
import api from "../../../common/api/axios/axios";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { getAccessToken, logOut } from "../../../helpers/auth.helper";
import { TRes } from "../../../types/app.type";
import { TUser } from "../../../types/user.type";
import { AppDispatch } from "../../store";

type TInitialState = {
   info: TUser | null;
   isLogin: boolean;
};

const initialState: TInitialState = {
   info: null,
   isLogin: !!getAccessToken(),
};

const userSlice = createSlice({
   name: "userSlice",
   initialState,
   reducers: {
      SET_INFO: (state, { payload }) => {
         state.info = payload;
      },
      UPDATE_IS_LOGIN: (state) => {
         state.isLogin = !!getAccessToken();
      },

      RESET_USER: () => initialState,
   },
});

export const { RESET_USER, SET_INFO, UPDATE_IS_LOGIN } = userSlice.actions;

export default userSlice.reducer;

export const getInfo = () => {
   return async (dispatch: AppDispatch) => {
      api.get<TRes<TUser>>(ENDPOINT.AUTH.GET_INFO)
         .then(({ data }) => {
            dispatch(SET_INFO(data.metaData));
         })
         .catch(() => {
            logOut();
         });
   };
};
