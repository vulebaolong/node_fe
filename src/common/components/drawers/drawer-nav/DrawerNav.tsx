import { Drawer } from "@mantine/core";
import { Nav } from "../../nav/Nav";

type TProps = {
   opened: boolean;
   close: () => void;
};

export default function DrawerNav({ opened, close }: TProps) {
   return (
      <Drawer
         opened={opened}
         onClose={close}
         overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
         withCloseButton={false}
         size={`xs`}
         styles={{
            body: {
               padding: 0,
            },
         }}
      >
         <Nav close={close} />
      </Drawer>
   );
}
