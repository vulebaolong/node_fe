import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../../common/components/header/Header";
import { Nav } from "../../common/components/nav/Nav";
import { MOBILE_HIDDEN_DESKTOP_VISIBLE } from "../../constant/app.constant";
import classes from "./AdminLayout.module.css";

export default function AdminLayout() {
   return (
      <>
         {/* <ErrorBoundary fallbackRender={SomethingWrong}> */}
            <Box className={classes.one}>
               <Box className={MOBILE_HIDDEN_DESKTOP_VISIBLE}>
                  <Nav />
               </Box>

               <div className={classes.two}>
                  <Outlet />
               </div>

               <Header />
            </Box>
         {/* </ErrorBoundary> */}
      </>
   );
}
