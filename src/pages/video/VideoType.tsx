import { Button, Group, rem } from "@mantine/core";
import * as Icons from "@tabler/icons-react";
import { useVideoType } from "../../common/api/tanstack/video.tantask";

const LIST_VIDEO_TYPE = [
   {
      type_id: 1,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 2,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 3,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 4,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 5,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 6,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 7,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 8,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
   {
      type_id: 9,
      type_name: "None",
      icon: "IconExclamationCircle",
   },
];

type TProps = {
   onChange: (type_id: number) => void;
   typeId: number;
};

export default function VideoType({ onChange, typeId }: TProps) {
   const videoType = useVideoType();
   return (
      <Group gap={5}>
         <Button
            size="xs"
            variant={typeId === 0 ? `filled` : `default`}
            onClick={() => {
               onChange(0);
            }}
         >
            All
         </Button>
         {(videoType.data || LIST_VIDEO_TYPE).map((item, i) => {
            const IconNav = Icons[item.icon as keyof typeof Icons] as
               | React.ComponentType<{ style: React.CSSProperties }>
               | undefined;

            return (
               <Button
                  size="xs"
                  key={i}
                  leftSection={IconNav && <IconNav style={{ width: rem(18), height: rem(18) }} />}
                  variant={typeId === item.type_id ? `filled` : `default`}
                  onClick={() => {
                     onChange(item.type_id);
                  }}
               >
                  {item.type_name}
               </Button>
            );
         })}
      </Group>
   );
}
