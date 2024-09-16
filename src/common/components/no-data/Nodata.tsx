import { Box, Text } from "@mantine/core";
import IconEmpty from "../icons/IconEmty";

export default function Nodata() {
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
         <Box
            style={{
               display: `flex`,
               flexDirection: `column`,
               alignItems: `center`,
               justifyContent: `center`,
            }}
         >
            <IconEmpty />
            <Text>No data</Text>
         </Box>
      </Box>
   );
}
