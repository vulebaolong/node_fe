import { Box, Code, Group, Stack, Title, UnstyledButton } from "@mantine/core";
import * as Icons from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { effectText } from "../../../helpers/motion.helper";
import { Logo } from "../logo/Logo";
import classes from "./Nav.module.css";
import { ROUTER } from "../../../constant/router.constant";
import { logOut } from "../../../helpers/auth.helper";
import { TITLE_BASE } from "../../../constant/app.constant";

const LIST_NAV = [
   { link: ROUTER.HOME, label: "Home", icon: Icons.IconHome },
   { link: ROUTER.PROFILE.LIST, label: "Profile", icon: Icons.IconUserCircle },
   { link: ROUTER.VIDEO.LIST, label: "Video", icon: Icons.IconVideo },
   { link: ROUTER.CHAT.LIST, label: "Chat", icon: Icons.IconMessageCircle },
   { link: ROUTER.ROLE.LIST, label: "Role", icon: Icons.IconLicense },
   { link: ROUTER.USERS.LIST, label: "Users", icon: Icons.IconUsersGroup },
   { link: ROUTER.PAYMENT.LIST, label: "Payment", icon: Icons.IconCreditCardPay },
   { link: ROUTER.SETTING, label: "Settings", icon: Icons.IconSettings },
];

type TProps = {
   close?: () => void;
};

export function Nav({ close }: TProps) {
   return (
      <Stack px={`md`} className={classes.navbar} component="nav">
         <Box flex={1}>
            <Group className={classes.header} justify="space-between">
               <Group gap={`5px`}>
                  <Logo color="white" />
                  <Title order={4} c={`white`}>
                     {effectText(TITLE_BASE)}
                  </Title>
               </Group>
               <Code fw={700} className={classes.version}>
                  v0.0.1
               </Code>
            </Group>

            {/* list nav */}
            {LIST_NAV.map((item, i) => {
               return (
                  <NavLink
                     key={i}
                     to={item.link}
                     className={({ isActive }) => (isActive ? `${classes.buttonNav} ${classes.active}` : `${classes.buttonNav}`)}
                     onClick={() => {
                        if (close) close();
                     }}
                  >
                     <Group>
                        <item.icon className={classes.icon} stroke={1.5} />
                        <Box className={`${classes.text}`}>{effectText(item.label)}</Box>
                     </Group>
                  </NavLink>
               );
            })}
         </Box>

         <div className={classes.footer}>
            <UnstyledButton
               onClick={() => {
                  logOut();
                  if (close) close();
               }}
               className={`${classes.buttonNav}`}
            >
               <Group>
                  <Icons.IconLogout className={classes.icon} stroke={1.5} />
                  <Box className={`${classes.text}`}>{effectText(`Logout`)}</Box>
               </Group>
            </UnstyledButton>
         </div>
      </Stack>
   );
}
