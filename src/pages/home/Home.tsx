import { Box, Center, Stack, Title } from "@mantine/core";
import { Logo } from "../../common/components/logo/Logo";
import { TITLE_BASE } from "../../constant/app.constant";
import { effectText } from "../../helpers/motion.helper";

export default function Home() {
   return (
      <Box
         style={{
            width: `100%`,
            height: `100%`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
         }}
      >
         <Stack
            style={{
               animation: "fadeInUp 0.5s",
            }}
         >
            <Center>
               <Logo width="100px" />
            </Center>
            <Title order={1}>{effectText(TITLE_BASE)}</Title>
         </Stack>
      </Box>
   );
}
