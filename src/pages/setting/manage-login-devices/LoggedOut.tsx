import { Box, Divider, Group, Pagination, Select, Stack, Text } from "@mantine/core";
import { IconDevicesOff } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useSessionLoginListOUT } from "../../../common/api/tanstack/session-login.tanstack";
import Loader from "../../../common/components/loader/Loader";
import Nodata from "../../../common/components/no-data/Nodata";
import classes from "./ManageLoginDevices.module.css";

let totalPage = 0;

export default function LoggedOut() {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const sessionLoginList = useSessionLoginListOUT({
      page: page,
      pageSize: pageSize,
   });

   totalPage = sessionLoginList.data?.totalPage || totalPage;

   const renderContent = () => {
      if (sessionLoginList.isLoading)
         return (
            <Group h={`100%`}>
               <Loader />
            </Group>
         );

      if (!sessionLoginList.data || !sessionLoginList.data.items || sessionLoginList.isError || sessionLoginList.data.items.length === 0) {
         return (
            <Group h={`100%`}>
               <Nodata />
            </Group>
         );
      }

      return (
         <>
            {sessionLoginList.data?.items.map((sessionLogin, i) => {
               return (
                  <Fragment key={sessionLogin.session_login_id}>
                     {i > 0 && <Divider />}
                     <Group
                        style={{
                           opacity: "0",
                           animation: "fadeInUp 0.5s forwards",
                           animationDelay: `${50 * i}ms`,
                        }}
                     >
                        <IconDevicesOff className={`${classes.iconDevice}`} />
                        <Box>
                           <Text className={`${classes.textDeviceName}`} truncate>
                              {sessionLogin.device_name}
                           </Text>
                           <Text className={`${classes.textUpdatedAt}`} truncate c={`dimmed`}>
                              {dayjs.utc(sessionLogin.updated_at).local().fromNow()}
                           </Text>
                        </Box>
                     </Group>
                  </Fragment>
               );
            })}
         </>
      );
   };

   return (
      <Box>
         {/* content */}
         <Stack mt={15} h={396}>
            {renderContent()}
         </Stack>

         {/* pagination */}
         <Group justify="end" mt={30}>
            <Box style={{ width: `65px` }}>
               <Select
                  size="xs"
                  value={`${pageSize}`}
                  onChange={(value) => {
                     if (value === null) return;
                     setPage(1);
                     setPageSize(+value);
                  }}
                  data={["5", "10", "15", "20"]}
               />
            </Box>
            <Pagination
               radius={`md`}
               size={`sm`}
               disabled={sessionLoginList.isLoading}
               value={page}
               total={totalPage}
               onChange={(page) => {
                  setPage(page);
               }}
            />
         </Group>
      </Box>
   );
}
