import { Box, Button, Divider, Group, Pagination, Select, Stack, Text } from "@mantine/core";
import { IconDevices, IconDevicesCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import { useLogOutDevice, useSessionLoginListIN } from "../../../common/api/tanstack/session-login.tanstack";
import Loader from "../../../common/components/loader/Loader";
import Nodata from "../../../common/components/no-data/Nodata";
import { useAppSelector } from "../../../store/store";
import classes from "./ManageLoginDevices.module.css";

let totalPage = 0;

export default function LoggedIn() {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const sessionLoginList = useSessionLoginListIN({
      page: page,
      pageSize: pageSize,
   });
   const { info } = useAppSelector((state) => state.user);
   const logoutDevice = useLogOutDevice();
   const queryClient = useQueryClient();

   totalPage = sessionLoginList.data?.totalPage || totalPage;

   const handleLogoutDevice = (session_login_id: number) => {
      console.log(session_login_id);
      logoutDevice.mutate(session_login_id, {
         onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: [`session-login-list-out`] });
            queryClient.invalidateQueries({ queryKey: [`session-login-list-in`] });
         },
      });
   };

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
                     <Group wrap="nowrap" justify="space-between">
                        <Group
                           wrap="nowrap"
                           style={{
                              opacity: "0",
                              animation: "fadeInUp 0.5s forwards",
                              animationDelay: `${50 * i}ms`,
                           }}
                        >
                           {sessionLogin.session_login_id === info?.session_login?.[0]?.session_login_id ? (
                              <IconDevicesCheck color="green" className={`${classes.iconDevice}`} />
                           ) : (
                              <IconDevices className={`${classes.iconDevice}`} />
                           )}
                           <Box>
                              <Text className={`${classes.textDeviceName}`} truncate>
                                 {sessionLogin.device_name}
                              </Text>
                              <Text className={`${classes.textUpdatedAt}`} truncate c={`dimmed`}>
                                 {dayjs.utc(sessionLogin.updated_at).local().fromNow()}
                              </Text>
                           </Box>
                        </Group>
                        <Button
                           onClick={() => {
                              handleLogoutDevice(sessionLogin.session_login_id);
                           }}
                           disabled={sessionLogin.session_login_id === info?.session_login?.[0]?.session_login_id}
                           size="xs"
                           variant="outline"
                           color={`red`}
                           style={{ flexShrink: `0` }}
                        >
                           {sessionLogin.session_login_id === info?.session_login?.[0]?.session_login_id ? `This Device` : `Logout`}
                        </Button>
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
