import { Button, Group, rem, Text } from "@mantine/core";
import * as Icons from "@tabler/icons-react";
import dayjs from "dayjs";
import { useVideoTypeTest } from "../../common/api/tanstack/video.tantask";

const LIST_VIDEO_TYPE = [
   {
      type_id: 1,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 2,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 3,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 4,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 5,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 6,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 7,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 8,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
   {
      type_id: 9,
      type_name: "None",
      icon: "IconExclamationCircle",
      created_at: `string`,
      updated_at: `string`,
   },
];

export default function VideoTypeTest() {
   const videoType = useVideoTypeTest();

   return (
      <Group gap={5}>
         <Button size="xs">All</Button>
         {(videoType.data || LIST_VIDEO_TYPE).map((item, i) => {
            const IconNav = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ style: React.CSSProperties }> | undefined;

            return (
               <Button size="xs" key={i} leftSection={IconNav && <IconNav style={{ width: rem(18), height: rem(18) }} />} variant={`default`}>
                  {item.type_name}
               </Button>
            );
         })}
      </Group>
   );
}
