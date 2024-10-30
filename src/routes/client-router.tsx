import { ROUTER } from "../constant/router.constant";
import Client from "../pages/client/Client";
import RootPage from "../pages/root-page/RootPage";

const clientRouter = [
   {
      path: ROUTER.CLIENT,
      element: (
         <RootPage title="Client">
            <Client />
         </RootPage>
      ),
   },
];

export default clientRouter;
