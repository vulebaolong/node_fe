import { ActionIcon, Box, Group, Switch, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconScan } from "@tabler/icons-react";
import Qr2FaModal from "../../../common/components/modals/qr-2fa/Qr2FaModal";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import classes from "./TwoFactorAuthentication.module.css";
import { useOnOff2Fa } from "../../../common/api/tanstack/auth.tanstack";
import { toast } from "react-toastify";
import { getInfo } from "../../../store/slices/user/user.slice";
import { resError } from "../../../helpers/function.helper";
import { effectText } from "../../../helpers/motion.helper";

export default function TwoFactorAuthentication() {
   const { info } = useAppSelector((state) => state.user);
   const [openedModalQr2Fa, handleModalQr2Fa] = useDisclosure(false);
   const onOff2Fa = useOnOff2Fa();
   const dispatch = useAppDispatch();

   const handleOnOff2Fa = () => {
      if (!info?.two_fa) {
         handleModalQr2Fa.open();
         return;
      }

      onOff2Fa.mutate(undefined, {
         onSuccess: (data) => {
            toast.success(data.message);
            dispatch(getInfo());
         },
         onError: (error) => {
            console.log(error);
            toast.error(resError(error, `On / Off 2FA failed`));
         },
      });
   };

   return (
      <>
         <Box className={`${classes.one}`}>
            <Group wrap="nowrap" justify="space-between">
               <Box>
                  <Title order={5}>{effectText(`Two-Factor Authentication`)}</Title>
                  <Text c={`dimmed`} size="xs" component="div">
                     {effectText(`Extra protection layers for your acount when logging in on new devices`)}
                  </Text>
               </Box>
               <Group wrap="nowrap" gap={2}>
                  <Switch
                     styles={{
                        track: {
                           cursor: `pointer`,
                        },
                     }}
                     onLabel={`ON`}
                     offLabel={`OFF`}
                     size="md"
                     checked={!!info?.two_fa?.is_2fa_enabled}
                     onClick={handleOnOff2Fa}
                  />
                  <ActionIcon size={`md`} onClick={handleModalQr2Fa.open} variant="default" radius="xl" aria-label="Settings">
                     <IconScan style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
               </Group>
            </Group>
         </Box>
         <Qr2FaModal opened={openedModalQr2Fa} close={handleModalQr2Fa.close} />
      </>
   );
}
