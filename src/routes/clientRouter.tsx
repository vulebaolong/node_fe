import NotFound from "../common/components/notifications/NotFound";
import { ROUTER } from "../constant/router.constant";
import Chat from "../pages/chat/Chat";
import Home from "../pages/home/Home";
import RootPage from "../pages/root-page/RootPage";
import Setting from "../pages/setting/Setting";
import Video from "../pages/video/Video";
import VideoDetail from "../pages/video/VideoDetail";

const clientRouter = [
   {
      path: ROUTER.HOME(),
      element: (
         <RootPage title="Home" protect>
            <Home />
         </RootPage>
      ),
   },
   {
      path: ROUTER.VIDEO.VIDEO_LIST(),
      element: (
         <RootPage title="Video" protect>
            <Video />
         </RootPage>
      ),
   },
   {
      path: ROUTER.VIDEO.VIDEO_DETAIL(),
      element: (
         <RootPage title="Video" protect>
            <VideoDetail />
         </RootPage>
      ),
   },
   {
      path: ROUTER.CHAT,
      element: (
         <RootPage title="Video" protect>
            <Chat />
         </RootPage>
      ),
   },
   {
      path: ROUTER.SETTING(),
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

export default clientRouter;
