import { rem, Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

let timeOut: any = undefined;

export default function SwitchToggleTheme() {
   const theme = useMantineTheme();
   const { toggleColorScheme, colorScheme } = useMantineColorScheme();
   const [checked, setChecked] = useState(colorScheme === `light` ? false : true);

   useEffect(() => {
      setChecked(colorScheme === `light` ? false : true);
   }, [colorScheme]);

   const handleToggleTheme = () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
         toggleColorScheme();
      }, 150);
   };

   const sunIcon = (
      <IconSun
         style={{ width: rem(16), height: rem(16) }}
         stroke={2.5}
         color={theme.colors.yellow[4]}
      />
   );

   const moonIcon = (
      <IconMoonStars
         style={{ width: rem(16), height: rem(16) }}
         stroke={2.5}
         color={theme.colors.blue[6]}
      />
   );

   return (
      <>
         <Switch
            onChange={handleToggleTheme}
            checked={checked}
            size="md"
            color="dark.4"
            onLabel={moonIcon}
            offLabel={sunIcon}
            styles={{
               track: {
                  cursor: `pointer`,
               },
            }}
         />
      </>
   );
}
