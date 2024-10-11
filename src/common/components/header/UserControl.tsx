import { Group, Menu, Text } from "@mantine/core";
import { effectText } from "../../../helpers/motion.helper";
import { useAppSelector } from "../../../store/store";
import { Badge } from "../badge/Badge";
import classes from "./Header.module.css";
import { Avatar } from "../avatar/Avatar";

export default function UserControl() {
   const { info } = useAppSelector((state) => state.user);
   return (
      <Menu shadow="md" width={200}>
         <Menu.Target>{<Avatar style={{ cursor: `pointer` }} user={info} />}</Menu.Target>

         <Menu.Dropdown>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Name`)}
               </Text>
               <Text component="span" size="xs" truncate="end">
                  {info?.full_name}
               </Text>
            </Group>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Email`)}
               </Text>
               <Text span size="xs" truncate="end">
                  {info?.email}
               </Text>
            </Group>
            <Group gap={0} className={classes.textAvatar} wrap="nowrap">
               <Text className={classes.widthText} c="dimmed" size="xs" component="div">
                  {effectText(`Role`)}
               </Text>

               <Badge user={info} />
            </Group>

            {/* <Menu.Divider /> */}
         </Menu.Dropdown>
      </Menu>
   );
}
