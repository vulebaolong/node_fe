import { Box, Container, Stack, Text } from "@mantine/core";
import { Logo } from "../logo/Logo";

export default function NotFound() {
   return (
      <Container maw={`--container-size-md`}>
         <Stack
            style={{
               width: "100%",
               alignItems: "center",
               position: "relative",
               paddingTop: "150px",
               paddingBottom: `80px`,
               animation: "fadeInUp 0.5s",
               gap: "20px",
               filter: "drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.2))",
               flexDirection: `column`,
            }}
         >
            <Box>
               <Logo />
            </Box>

            <Stack
               style={{
                  width: "100%",
                  alignItems: "center",
                  flexDirection: `column`,
               }}
            >
               <Text
                  style={{
                     fontWeight: "600",
                     animation: "fadeInUp 0.5s ease 100ms forwards",
                     position: "relative",
                     opacity: "0",
                     width: `max-content`,
                  }}
               >
                  THIS SITE IS
               </Text>
               <Text
                  style={{
                     fontWeight: "900",
                     fontSize: `30px`,
                     animation: "fadeInUp 0.5s ease 200ms forwards",
                     position: "relative",
                     opacity: "0",
                     width: `max-content`,
                  }}
               >
                  NOT FOUND
               </Text>
               <Text
                  style={{
                     fontWeight: "400",
                     animation: "fadeInUp 0.5s ease 300ms forwards",
                     position: "relative",
                     opacity: "0",
                     width: `max-content`,
                  }}
               >
                  This page could not be found.
               </Text>
            </Stack>
         </Stack>
      </Container>
   );
}
