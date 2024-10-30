import { ActionIcon, Burger, Center, Container, Group, Menu, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrightnessDown, IconChevronDown, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Logo } from "../logo/Logo";
import classes from "./HeaderClient.module.css";

const links = [
   { link: "/about", label: "Features" },
   {
      link: "#1",
      label: "Learn",
      links: [
         { link: "/docs", label: "Documentation" },
         { link: "/resources", label: "Resources" },
         { link: "/community", label: "Community" },
         { link: "/blog", label: "Blog" },
      ],
   },
   { link: "/about", label: "About" },
   { link: "/pricing", label: "Pricing" },
   {
      link: "#2",
      label: "Support",
      links: [
         { link: "/faq", label: "FAQ" },
         { link: "/demo", label: "Book a demo" },
         { link: "/forums", label: "Forums" },
      ],
   },
];

export function HeaderClient() {
   const [opened, { toggle }] = useDisclosure(false);
   const { toggleColorScheme, colorScheme } = useMantineColorScheme();
   const [checked, setChecked] = useState(colorScheme === `light` ? false : true);

   useEffect(() => {
      setChecked(colorScheme === `light` ? false : true);
   }, [colorScheme]);

   const items = links.map((link) => {
      const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

      if (menuItems) {
         return (
            <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
               <Menu.Target>
                  <a href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
                     <Center>
                        <span className={classes.linkLabel}>{link.label}</span>
                        <IconChevronDown size="0.9rem" stroke={1.5} />
                     </Center>
                  </a>
               </Menu.Target>
               <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
         );
      }

      return (
         <a key={link.label} href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
            {link.label}
         </a>
      );
   });

   return (
      <header className={classes.header}>
         <Container size="md">
            <Group h={`var(--height-header)`} justify="space-between">
               <Logo />

               <Group>
                  <Group gap={5} visibleFrom="sm">
                     {items}
                  </Group>
                  <ActionIcon onClick={toggleColorScheme} variant="default" radius="md">
                     {checked ? (
                        <IconBrightnessDown style={{ width: "70%", height: "70%" }} stroke={1.5} />
                     ) : (
                        <IconMoon style={{ width: "70%", height: "70%" }} stroke={1.5} />
                     )}
                  </ActionIcon>
                  <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
               </Group>
            </Group>
         </Container>
      </header>
   );
}
