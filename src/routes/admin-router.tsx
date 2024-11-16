import NotFound from "../common/components/notifications/NotFound";
import { ROUTER } from "../constant/router.constant";
import Chat from "../pages/chat/Chat";
import Home from "../pages/home/Home";
import Payment from "../pages/payment/Payment";
import { Profile } from "../pages/profile/Profile";
import Role from "../pages/role/Role";
import RoleDetail from "../pages/role/role-detail/RoleDetail";
import RootPage from "../pages/root-page/RootPage";
import Setting from "../pages/setting/Setting";
import { Users } from "../pages/users/Users";
import Video from "../pages/video/Video";
import VideoDetail from "../pages/video/VideoDetail";

const adminRouter = [
   {
      path: ROUTER.HOME,
      element: (
         <RootPage title="Home" protect>
            <Home />
         </RootPage>
      ),
   },
   {
      path: ROUTER.VIDEO.LIST,
      element: (
         <RootPage title="Video" protect>
            <Video />
         </RootPage>
      ),
   },
   {
      path: ROUTER.VIDEO.DETAIL(),
      element: (
         <RootPage title="Video detail" protect>
            <VideoDetail />
         </RootPage>
      ),
   },
   {
      path: ROUTER.CHAT.LIST,
      element: (
         <RootPage title="Video" protect>
            <Chat />
         </RootPage>
      ),
   },
   {
      path: ROUTER.ROLE.LIST,
      element: (
         <RootPage title="Role" protect>
            <Role />
         </RootPage>
      ),
   },
   {
      path: ROUTER.ROLE.DETAIL(),
      element: (
         <RootPage title="Role detail" protect>
            <RoleDetail />
         </RootPage>
      ),
   },
   {
      path: ROUTER.USERS.LIST,
      element: (
         <RootPage title="Users" protect>
            <Users />
         </RootPage>
      ),
   },
   {
      path: ROUTER.PROFILE.LIST,
      element: (
         <RootPage title="Profile" protect>
            <Profile />
         </RootPage>
      ),
   },
   {
      path: ROUTER.PAYMENT.LIST,
      element: (
         <RootPage title="Payment" protect>
            <Payment />
         </RootPage>
      ),
   },
   {
      path: ROUTER.SETTING,
      element: (
         <RootPage title="Setting" protect>
            <Setting />
         </RootPage>
      ),
   },
   {
      path: "*",
      element: <NotFound />,
   },
];

export default adminRouter;
