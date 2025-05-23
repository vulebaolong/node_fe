import { ActionIcon, Container, Group, rem, Text } from "@mantine/core";
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import rootRouter from "../../../routes/rootRouter";
import { Logo } from "../logo/Logo";
import classes from "./FooterClient.module.css";

const data = [
   {
      title: "About",
      links: [
         { label: "Features", link: "#" },
         { label: "Pricing", link: "#" },
         { label: "Support", link: "#" },
         { label: "Forums", link: "#" },
      ],
   },
   {
      title: "Project",
      links: [
         { label: "Contribute", link: "#" },
         { label: "Media assets", link: "#" },
         { label: "Changelog", link: "#" },
         { label: "Releases", link: "#" },
      ],
   },
   {
      title: "Community",
      links: [
         { label: "Join Discord", link: "#" },
         { label: "Follow on Twitter", link: "#" },
         { label: "Email newsletter", link: "#" },
         { label: "GitHub discussions", link: "login" },
      ],
   },
];

export function FooterClient() {
   const groups = data.map((group) => {
      const links = group.links.map((link, index) => (
         <Text
            key={index}
            className={classes.link}
            onClick={() => {
               rootRouter.navigate(link.link);
            }}
            style={{ cursor: `pointer` }}
         >
            {link.label}
         </Text>
      ));

      return (
         <div className={classes.wrapper} key={group.title}>
            <Text className={classes.title}>{group.title}</Text>
            {links}
         </div>
      );
   });

   return (
      <footer className={classes.footer}>
         <Container className={classes.inner}>
            <div className={classes.logo}>
               <Logo />
               <Text size="xs" c="dimmed" className={classes.description}>
                  Build fully functional accessible web applications faster than ever
               </Text>
            </div>
            <div className={classes.groups}>{groups}</div>
         </Container>
         <Container className={classes.afterFooter}>
            <Text c="dimmed" size="sm">
               © 2020 mantine.dev. All rights reserved.
            </Text>

            <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
               <ActionIcon size="lg" color="gray" variant="subtle">
                  <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
               </ActionIcon>
               <ActionIcon size="lg" color="gray" variant="subtle">
                  <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
               </ActionIcon>
               <ActionIcon size="lg" color="gray" variant="subtle">
                  <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
               </ActionIcon>
            </Group>
         </Container>
      </footer>
   );
}
