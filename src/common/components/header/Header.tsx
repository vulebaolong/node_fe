import { ActionIcon, Box, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
   MOBILE_HIDDEN_DESKTOP_VISIBLE,
   MOBILE_VISIBLE_DESKTOP_HIDDEN,
} from "../../../constant/app.constant";
import { ROUTER } from "../../../constant/router.constant";
import rootRouter from "../../../routes/rootRouter";
import { useAppSelector } from "../../../store/store";
import DrawerNav from "../drawers/drawer-nav/DrawerNav";
import SwitchToggleTheme from "../toggle-theme/switch/SwitchToggleTheme";
import classes from "./Header.module.css";
import UserControl from "./UserControl";

export default function Header() {
   const [openedDrawerNav, handleDrawerNav] = useDisclosure(false);
   const { isLogin } = useAppSelector((state) => state.user);
   return (
      <>
         <Box className={classes.headerAdmin} component={`header`}>
            {/* LEFT */}
            <ActionIcon
               size="lg"
               variant="default"
               className={MOBILE_VISIBLE_DESKTOP_HIDDEN}
               component="div"
            >
               <Burger size={`xs`} opened={openedDrawerNav} onClick={handleDrawerNav.open} />
            </ActionIcon>

            <Box className={MOBILE_HIDDEN_DESKTOP_VISIBLE} />

            {/* RIGHT */}
            <Group>
               {isLogin ? (
                  <UserControl />
               ) : (
                  <Group justify="center">
                     <Button
                        variant="default"
                        onClick={() => {
                           rootRouter.navigate(ROUTER.LOGIN);
                        }}
                     >
                        Log in
                     </Button>
                     <Button
                        onClick={() => {
                           rootRouter.navigate(ROUTER.REGISTER);
                        }}
                     >
                        Register
                     </Button>
                  </Group>
               )}

               {/* <ButtonToggleTheme /> */}
               <SwitchToggleTheme />
            </Group>
         </Box>
         <DrawerNav opened={openedDrawerNav} close={handleDrawerNav.close} />
      </>
   );
}
