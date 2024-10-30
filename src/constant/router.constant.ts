export const ROUTER = {
   CLIENT: "/",
   HOME: "/home",
   LOGIN: `/login`,
   REGISTER: `/register`,
   FORGOT_PASSWORD: `/forgot-password`,
   SETTING: `/setting`,
   VIDEO: {
      LIST: `/video`,
      DETAIL: (id: number | string = ":videoId") => `/video/${id}`,
   },
   VIDEO_TEST: {
      LIST: `/video-test`,
      DETAIL: (id: number | string = ":videoId") => `/video-test/${id}`,
   },
   ROLE: {
      LIST: `/role`,
      DETAIL: (id: number | string = ":roleId") => `/role/${id}`,
   },
   CHAT: {
      LIST: `/chat`,
      DETAIL: (id: number | string = ":chatId") => `/chat/${id}`,
   },
   USERS: {
      LIST: `/users`,
      DETAIL: (id: number | string = ":userId") => `/users/${id}`,
   },
   PAYMENT: {
      LIST: `/payment`,
      DETAIL: (id: number | string = ":paymentId") => `/payment/${id}`,
   },
   PROFILE: {
      LIST: `/profile`,
      DETAIL: (id: number | string = ":profileId") => `/profile/${id}`,
   },
};
