export const ROUTER = {
   BASE: `/`,
   HOME: () => `${ROUTER.BASE}`,
   LOGIN: () => `${ROUTER.BASE}login`,
   REGISTER: () => `${ROUTER.BASE}register`,
   FORGOT_PASSWORD: () => `${ROUTER.BASE}forgot-password`,
   VIDEO: {
      VIDEO_LIST: () => `${ROUTER.BASE}video`,
      VIDEO_DETAIL: (videoId?: number) => `${ROUTER.BASE}video/${videoId || `:videoId`}`,
   },
   CHAT: `chat`,
   SETTING: () => `${ROUTER.BASE}setting`,
};
