import { Box, Loader as MantineLoader } from "@mantine/core";

export default function Loader() {
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
         <MantineLoader />
      </Box>
   );
}
