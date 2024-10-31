import { Box, Center, Stack, Text } from "@mantine/core";
import { Logo } from "../logo/Logo";

export default function NotFound() {
   return (
      <Stack h={`80vh`} justify="center">
         <Stack
            style={{
               animation: "fadeInUp 0.5s ease 100ms forwards",
               opacity: "0",
            }}
         >
            <Center>
               <Box>
                  <Logo width="100px" />
               </Box>
            </Center>

            <Center>
               <Box>
                  <Text
                     style={{
                        fontWeight: "600",
                        textAlign: `center`,
                     }}
                  >
                     THIS SITE IS
                  </Text>
                  <Text
                     style={{
                        fontWeight: "900",
                        fontSize: `30px`,
                        textAlign: `center`,
                     }}
                  >
                     NOT FOUND
                  </Text>
               </Box>
            </Center>

            <Center>
               <Text> This page could not be found.</Text>
            </Center>
         </Stack>
      </Stack>
   );
}
