import { Accordion, Box, Text, Title } from "@mantine/core";
import { TITLE_BASE } from "../../../constant/app.constant";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import classes from "./ManageLoginDevices.module.css";

export default function ManageLoginDevices() {
   return (
      <Box className={`${classes.one}`}>
         <Box>
            <Title order={5}>Logged-in devices</Title>
            <Text c={`dimmed`} size="xs">
               Manage devices you have used to log into {TITLE_BASE}
            </Text>
         </Box>

         <Accordion chevronPosition="right" variant="contained" mt={20} multiple>
            <Accordion.Item value={`logged in`}>
               <Accordion.Control>
                  <Title order={6}>Other logged in devices</Title>
               </Accordion.Control>
               <Accordion.Panel>
                  <LoggedIn />
               </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={`logged out`}>
               <Accordion.Control>
                  <Title order={6}>Recently logged out devices</Title>
               </Accordion.Control>
               <Accordion.Panel>
                  <LoggedOut />
               </Accordion.Panel>
            </Accordion.Item>
         </Accordion>
      </Box>
   );
}
