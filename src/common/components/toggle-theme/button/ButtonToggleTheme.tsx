import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ButtonToggleTheme() {
   const { toggleColorScheme } = useMantineColorScheme();

   return (
      <>
         <ActionIcon onClick={toggleColorScheme} variant="default" size="lg" lightHidden>
            <IconSun stroke={1.5} size={20} />
         </ActionIcon>
         <ActionIcon onClick={toggleColorScheme} variant="default" size="lg" darkHidden>
            <IconMoon stroke={1.5} size={20} />
         </ActionIcon>
      </>
   );
}
