import { Box, Center, Stack, Title } from "@mantine/core";
import { Logo } from "../../common/components/logo/Logo";

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
            <Title order={1}>JSM Media</Title>
         </Stack>
      </Box>
   );
}
