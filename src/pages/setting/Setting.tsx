import { Stack } from "@mantine/core";
import ManageLoginDevices from "./manage-login-devices/ManageLoginDevices";
import TwoFactorAuthentication from "./two-factor-authentication/TwoFactorAuthentication";

export default function Setting() {
   return (
      <Stack>
         <TwoFactorAuthentication />
         <ManageLoginDevices />
      </Stack>
   );
}
