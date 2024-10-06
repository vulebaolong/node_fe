import { useNetwork } from "@mantine/hooks";
import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCheckRoute } from "../../common/hooks/check-route.hooks";
import { TITLE_BASE } from "../../constant/app.constant";
import { ROUTER } from "../../constant/router.constant";
import { getAccessToken } from "../../helpers/auth.helper";
import { getInfo } from "../../store/slices/user/user.slice";
import { useAppDispatch } from "../../store/store";

type TProps = {
   children: ReactNode;
   title?: string;
   meta?: ReactNode;
   protect?: boolean;
};

let idToast: number | string | undefined = undefined;

export default function RootPage({ children, title = "", meta, protect = false }: TProps) {
   const dispatch = useAppDispatch();
   const { id } = useParams();
   const isRoute = useCheckRoute([ROUTER.LOGIN, ROUTER.REGISTER]);
   const location = useLocation();

   const networkStatus = useNetwork();
   useEffect(() => {
      if (!networkStatus.online) {
         idToast = toast.info(`You are offline`, {
            autoClose: false,
            position: `bottom-right`,
            closeOnClick: false,
         });
      } else {
         toast.dismiss(idToast);
      }
   }, [networkStatus.online]);

   // useEffect(() => {
   //    if (protect)  dispatch(getInfo());
   // }, [location]);

   const renderContent = () => {
      if (isRoute) {
         if (getAccessToken()) {
            return <Navigate to={`${ROUTER.HOME}`} replace />;
         }
      }

      if (!protect) return children;

      // if (loadingPage) return <Loader />;

      return children;
   };

   return (
      <>
         <Helmet>
            <title>{`${TITLE_BASE} | ${title} ${id ? "- " + id : ""}`}</title>
            {meta}
         </Helmet>

         {renderContent()}
      </>
   );
}
