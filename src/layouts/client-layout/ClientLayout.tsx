import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { FooterClient } from "../../common/components/footer-client/FooterClient";
import { HeaderClient } from "../../common/components/header-client/HeaderClient";
import SomethingWrong from "../../common/components/notifications/SomethingWrong";
import classes from "./ClientLayout.module.css";

export default function ClientLayout() {
   return (
      <ErrorBoundary fallbackRender={SomethingWrong}>
         <HeaderClient />
         <main className={`${classes.main}`}>
            <div className={`${classes[`home-page`]}`}>
               <Outlet />
            </div>
            <div>
               <div className={`${classes[`footer-spacer`]}`}></div>
               <div className={`${classes[`footer-wraper`]}`}>
                  <FooterClient />
               </div>
            </div>
         </main>
      </ErrorBoundary>
   );
}
