import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant/app.constant";
import { ROUTER } from "../constant/router.constant";
import rootRouter from "../routes/rootRouter";
import { RESET_USER, UPDATE_IS_LOGIN } from "../store/slices/user/user.slice";
import { store } from "../store/store";

export function getAccessToken() {
   return localStorage.getItem(ACCESS_TOKEN);
}
export function setAccessToken(accesstoken: string) {
   localStorage.setItem(ACCESS_TOKEN, accesstoken);
}

export function getRefreshToken() {
   return localStorage.getItem(REFRESH_TOKEN);
}
export function setRefreshToken(Refreshtoken: string) {
   localStorage.setItem(REFRESH_TOKEN, Refreshtoken);
}

export function logOut() {
   // localStorage.clear();
   localStorage.removeItem(ACCESS_TOKEN)
   localStorage.removeItem(REFRESH_TOKEN)

   const dispatch = store.dispatch;
   dispatch(RESET_USER());
   dispatch(UPDATE_IS_LOGIN());

   rootRouter.navigate(ROUTER.LOGIN());
}
