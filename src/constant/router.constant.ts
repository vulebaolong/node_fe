const BASE = "/";

export const ROUTER = {
   HOME: BASE,
   LOGIN: `${BASE}login`,
   REGISTER: `${BASE}register`,
   FORGOT_PASSWORD: `${BASE}forgot-password`,
   SETTING: `${BASE}setting`,
   VIDEO: {
      BASE: `${BASE}video`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":videoId") {
         return `${this.BASE}/${id}`;
      },
   },
   VIDEO_TEST: {
      BASE: `${BASE}video-test`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":videoId") {
         return `${this.BASE}/${id}`;
      },
   },
   ROLE: {
      BASE: `${BASE}role`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":roleId") {
         return `${this.BASE}/${id}`;
      },
   },
   CHAT: {
      BASE: `${BASE}chat`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":chatId") {
         return `${this.BASE}/${id}`;
      },
   },
   USERS: {
      BASE: `${BASE}users`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":userId") {
         return `${this.BASE}/${id}`;
      },
   },
   PAYMENT: {
      BASE: `${BASE}payment`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":paymentId") {
         return `${this.BASE}/${id}`;
      },
   },
   PROFILE: {
      BASE: `${BASE}profile`,
      LIST() {
         return this.BASE;
      },
      DETAIL(id: number | string = ":profileId") {
         return `${this.BASE}/${id}`;
      },
   },
};
