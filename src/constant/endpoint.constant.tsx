export const ENDPOINT = {
   AUTH: {
      BASE: `auth`,
      LOGIN: () => `${ENDPOINT.AUTH.BASE}/login`,
      REGISTER: () => `${ENDPOINT.AUTH.BASE}/register`,
      REFRESH_TOKEN: () => `${ENDPOINT.AUTH.BASE}/refresh-token`,
      GET_INFO: () => `${ENDPOINT.AUTH.BASE}/get-info`,
      FACEBOOK_LOGIN: () => `${ENDPOINT.AUTH.BASE}/facebook-login`,
   },
   VIDEO: {
      BASE: `video`,
      VIDEO_LIST: () => `${ENDPOINT.VIDEO.BASE}/video-list`,
      VIDEO_TYPE: () => `${ENDPOINT.VIDEO.BASE}/video-type`,
      VIDEO_DETAIL: () => `${ENDPOINT.VIDEO.BASE}/video-detail`,
      VIDEO_COMMENT: () => `${ENDPOINT.VIDEO.BASE}/video-comment`,
      VIDEO_COMMENT_LIST: () => `${ENDPOINT.VIDEO.BASE}/video-comment-list`,
      VIDEO_LIKE: () => `${ENDPOINT.VIDEO.BASE}/video-like`,
      VIDEO_DISLIKE: () => `${ENDPOINT.VIDEO.BASE}/video-dislike`,
      VIDEO_GET_LIKE: () => `${ENDPOINT.VIDEO.BASE}/video-like`,
      VIDEO_GET_TOAL_LIKE: () => `${ENDPOINT.VIDEO.BASE}/video-total-like`,
   },
   USER: `user`,
};
