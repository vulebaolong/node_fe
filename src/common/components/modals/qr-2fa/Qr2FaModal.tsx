import { ActionIcon, Box, Center, Image, Loader, Modal, Stack, Title } from "@mantine/core";
import { IconScan, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { getInfo } from "../../../../store/slices/user/user.slice";
import { useAppDispatch } from "../../../../store/store";
import { useGetQr2Fa } from "../../../api/tanstack/auth.tanstack";
import Nodata from "../../no-data/Nodata";

type TProps = {
   opened: boolean;
   close: () => void;
};
export default function Qr2FaModal({ opened, close }: TProps) {
   const getQr2Fa = useGetQr2Fa();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!opened) return;

      getQr2Fa.mutate(undefined, {
         onSuccess: () => {
            dispatch(getInfo());
         },
      });
   }, [opened]);

   const renderContent = () => {
      if (getQr2Fa.isPending)
         return (
            <Center h={`100%`} w={`100%`}>
               <Loader />
            </Center>
         );

      if (!getQr2Fa.data || !getQr2Fa.data.metaData.qrCode || getQr2Fa.isError) {
         return (
            <Center h={`100%`} w={`100%`}>
               <Nodata />
            </Center>
         );
      }

      return (
         <Center>
            <Image w={`80%`} radius="xl" src={getQr2Fa.data?.metaData.qrCode} />
         </Center>
      );
   };

   return (
      <Modal opened={opened} onClose={close} centered radius={`xl`} size={`xs`} withCloseButton={false}>
         <Stack>
            <Center>
               <IconScan size={30} />
            </Center>

            <Title ta={`center`} order={4}>
               Scan This QR Code
            </Title>

            <Box h={212}>{renderContent()}</Box>

            <Center w={`100%`} mt={30}>
               <ActionIcon onClick={close} variant="default" radius="xl" aria-label="Settings">
                  <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
               </ActionIcon>
            </Center>
         </Stack>
      </Modal>
   );
}
