import { useLocation } from "react-router-dom";

export const useCheckRoute = (arrRoute: string[]) => {
   const location = useLocation();

   const arrCheck = arrRoute.map((item) => {
      return item.split(`/`)[1];
   });

   return arrCheck.includes(location.pathname.split(`/`)[1]);
};
