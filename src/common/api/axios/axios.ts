import axios from "axios";
import { BASE_DOMAIN_API } from "../../../constant/app.constant";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { getAccessToken, getDeviceId, getRefreshToken, logOut, setAccessToken, setRefreshToken } from "../../../helpers/auth.helper";

const api = axios.create({
   baseURL: BASE_DOMAIN_API,
   headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
   },
});

const apiRefreshToken = axios.create({
   baseURL: BASE_DOMAIN_API,
   headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
   },
});

api.interceptors.request.use(
   function (config) {
      config.url = `${api.defaults.baseURL}${config.url}`;

      const accessToken = getAccessToken();
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

      const deviceId = getDeviceId();
      if (deviceId) config.headers[`device-id`] = `${deviceId}`;

      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
   failedQueue.forEach((prom) => {
      if (error) {
         prom.reject(error);
      } else {
         prom.resolve(token);
      }
   });

   failedQueue = [];
   failedQueue.length = 0;
};

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401) {
         logOut();
         return Promise.reject(error);
      }

      if (error.response?.status === 403 && !originalRequest._retry) {
         if (isRefreshing) {
            return new Promise((resolve, reject) => {
               failedQueue.push({ resolve, reject });
            })
               .then((token) => {
                  originalRequest.headers["Authorization"] = "Bearer " + token;
                  return axios(originalRequest);
               })
               .catch((err) => Promise.reject(err));
         }

         originalRequest._retry = true;
         isRefreshing = true;

         try {
            const refreshToken = getRefreshToken();
            const accessToken = getAccessToken();

            const { data } = await apiRefreshToken.post(
               `${ENDPOINT.AUTH.REFRESH_TOKEN}`,
               {},
               {
                  headers: {
                     "x-access-token": accessToken,
                     "Authorization": `Bearer ${refreshToken}`,
                  },
               }
            );

            setRefreshToken(data.metaData.refreshToken);
            setAccessToken(data.metaData.accessToken);

            processQueue(null, data.metaData.accessToken);

            originalRequest.headers["Authorization"] = "Bearer " + data.metaData.accessToken;
            return axios(originalRequest);
         } catch (err) {
            processQueue(err, null);
            logOut();
            return Promise.reject(err);
         } finally {
            isRefreshing = false;
         }
      }

      return Promise.reject(error);
   }
);

export default api;
