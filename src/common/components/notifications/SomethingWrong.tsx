import { Box, Button, Center, Stack, Text } from "@mantine/core";
import { Logo } from "../logo/Logo";

export default function SomethingWrong() {
   // console.log("SomethingWrong", error);

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
               <Text
                  style={{
                     fontWeight: "900",
                     fontSize: `30px`,
                     position: "relative",
                     width: `max-content`,
                  }}
               >
                  SOMETHING WENT WRONG
               </Text>
            </Center>

            <Center>
               <Button>Try again</Button>
            </Center>
         </Stack>
      </Stack>
   );
}
