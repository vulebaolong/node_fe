import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import clientRouter from "./clientRouter";
import Login from "../pages/auth/Login";
import { ROUTER } from "../constant/router.constant";
import Register from "../pages/auth/Register";
import RootPage from "../pages/root-page/RootPage";
import ForgotPassword from "../pages/auth/ForgotPassword";

const rootRouter = createBrowserRouter([
   {
      path: ROUTER.LOGIN,
      element: (
         <RootPage title="Login">
            <Login />
         </RootPage>
      ),
   },
   {
      path: ROUTER.REGISTER,
      element: (
         <RootPage title="Register">
            <Register />
         </RootPage>
      ),
   },
   {
      path: ROUTER.FORGOT_PASSWORD,
      element: (
         <RootPage title="Register">
            <ForgotPassword />
         </RootPage>
      ),
   },
   {
      path: "",
      element: <MainLayout />,
      children: clientRouter,
   },
]);

export default rootRouter;
