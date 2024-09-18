import { Avatar, Badge, Group, Menu, Text } from "@mantine/core";
import { effectText } from "../../../helpers/motion.helper";
import classes from "./Header.module.css";
import { useAppSelector } from "../../../store/store";
import { checkPathAvatar } from "../../../helpers/function.helper";

export default function UserControl() {
   const { info } = useAppSelector((state) => state.user);

   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>
            <Avatar style={{ cursor: `pointer` }} src={checkPathAvatar(info?.avatar)} alt="it's me" />
         </Menu.Target>

         <Menu.Dropdown>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs">
                  Name
               </Text>
               <Text component="span" size="xs">
                  {effectText(info?.full_name || ``)}
               </Text>
            </Group>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs">
                  Email
               </Text>
               <Text span size="xs" truncate="end">
                  {effectText(info?.email || ``)}
               </Text>
            </Group>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs">
                  Role
               </Text>

               <Badge variant="outline" color={info?.role_id === 2 ? `red` : `blue`}>
                  {effectText(info?.roles.name || ``)}
               </Badge>
            </Group>

            {/* <Menu.Divider /> */}
         </Menu.Dropdown>
      </Menu>
   );
}
