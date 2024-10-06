import dayjs from "dayjs";
import { BASE_DOMAIN_API, BASE_DOMAIN_CLOUDINARY, FOLDER_IMAGE_BE, TIMEOUT_SEND_MAIL } from "../constant/app.constant";

export const resError = (error: any, defaultMes: string) => {
   let mes = error.response?.data?.message;
   if (!mes) mes = defaultMes;
   if (Array.isArray(mes)) mes = mes[0];
   return mes;
};

export const wait = (miliseconds: number) => {
   return new Promise(function (resolve) {
      setTimeout(resolve, miliseconds);
   });
};

export const checkPathAvatar = (path: string | null | undefined) => {
   if (!path) return path;
   if (path.includes(`http`)) return path;

   if (path.includes(`local`)) {
      return `${BASE_DOMAIN_API}${FOLDER_IMAGE_BE}${path}`;
   } else {
      return `${BASE_DOMAIN_CLOUDINARY}${path}`;
   }
};

type TStartCountdown = {
   expirationTime: number;
   handler: (count: number) => void;
   end: () => void;
};
let countdownInterval: NodeJS.Timeout | undefined = undefined; // Biến để lưu trữ interval

export const startCountdown = ({ expirationTime, handler, end }: TStartCountdown) => {
   if (countdownInterval) return;

   localStorage.setItem(TIMEOUT_SEND_MAIL, `${expirationTime}`);

   countdownInterval = setInterval(() => {
      const now = dayjs().valueOf();
      const diff = expirationTime - now;
      console.log(`interval`);

      if (diff <= 0) {
         clearInterval(countdownInterval);
         countdownInterval = undefined;
         localStorage.removeItem(TIMEOUT_SEND_MAIL);
         end();
      } else {
         handler(Math.floor(diff / 1000));
      }
   }, 1000);
};
