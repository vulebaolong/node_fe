import forge from "node-forge";
import { ACCESS_TOKEN, DEVICE_ID, PUBLIC_KEY, REFRESH_TOKEN } from "../constant/app.constant";
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

export function setDeviceId(deviceId: string) {
   localStorage.setItem(DEVICE_ID, deviceId);
}
export function getDeviceId() {
   return localStorage.getItem(DEVICE_ID);
}

export function logOut() {
   // localStorage.clear();
   localStorage.removeItem(ACCESS_TOKEN);
   localStorage.removeItem(REFRESH_TOKEN);

   const dispatch = store.dispatch;
   dispatch(RESET_USER());
   dispatch(UPDATE_IS_LOGIN());

   rootRouter.navigate(ROUTER.LOGIN);
}

export function encryptPassword(password: string) {
   // Chuyển đổi PEM thành đối tượng khóa công khai
   const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);

   // Mã hóa thông điệp
   const encrypted = publicKey.encrypt(forge.util.encodeUtf8(password));

   // Chuyển đổi kết quả mã hóa sang định dạng base64 để dễ dàng truyền tải
   const encryptedMessage = forge.util.encode64(encrypted);

   return encryptedMessage;
}
