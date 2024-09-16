import { Avatar, Group, Menu, Text } from "@mantine/core";
import { effectText } from "../../../helpers/motion.helper";
import classes from "./Header.module.css";
import { useAppSelector } from "../../../store/store";

export default function UserControl() {
   const { info } = useAppSelector((state) => state.user);

   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>
            <Avatar
               style={{ cursor: `pointer` }}
               // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
               src={info?.avatar}
               alt="it's me"
            />
         </Menu.Target>

         <Menu.Dropdown>
            <Group gap={10} className={classes.textAvatar}>
               <Text className={classes.widthText} c="dimmed" size="xs">
                  Name
               </Text>
               <Text component="span" size="xs">
                  {effectText(info?.full_name || ``)}
               </Text>
            </Group>
            <Group gap={10} className={classes.textAvatar}>
               <Text className={classes.widthText} c="dimmed" size="xs">
                  Email
               </Text>
               <Text component="span" size="xs">
                  {effectText(info?.email || ``)}
               </Text>
            </Group>

            {/* <Menu.Divider /> */}
         </Menu.Dropdown>
      </Menu>
   );
}
