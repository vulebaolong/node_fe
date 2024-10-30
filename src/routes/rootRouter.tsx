import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/admin-layout/AdminLayout";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import adminRouter from "./admin-router";
import authRouter from "./auth-router";
import ClientLayout from "../layouts/client-layout/ClientLayout";
import clientRouter from "./client-router";
import SomethingWrong from "../common/components/notifications/SomethingWrong";

const rootRouter = createBrowserRouter([
   {
      errorElement: <SomethingWrong />,
      children: [
         {
            element: <ClientLayout />,
            errorElement: <SomethingWrong />,
            children: clientRouter,
         },
         {
            element: <AuthLayout />,
            errorElement: <SomethingWrong />,
            children: authRouter,
         },
         {
            element: <AdminLayout />,
            errorElement: <SomethingWrong />,
            children: adminRouter,
         },
      ],
   },
]);

export default rootRouter;
