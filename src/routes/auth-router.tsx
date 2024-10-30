import { ROUTER } from "../constant/router.constant";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RootPage from "../pages/root-page/RootPage";

const authRouter = [
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
];

export default authRouter;
