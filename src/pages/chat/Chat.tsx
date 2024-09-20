import { ActionIcon, Box, Center, Group, Loader, rem, Stack, Text, TextInput, Transition } from "@mantine/core";
import { getHotkeyHandler, useDebouncedCallback } from "@mantine/hooks";
import { IconArrowNarrowLeft, IconSearch, IconSend2 } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useCreateChat } from "../../common/api/tanstack/chat.tanstack";
import { useGetUserList } from "../../common/api/tanstack/user.tanstack";
import { Avatar } from "../../common/components/avatar/Avatar";
import Nodata from "../../common/components/no-data/Nodata";
import { useIsMobile } from "../../common/hooks/is-mobile.hooks";
import { BASE_DOMAIN_API, isProduction } from "../../constant/app.constant";
import { useAppSelector } from "../../store/store";
import { TListChatRes } from "../../types/chat.type";
import { TUserListRes } from "../../types/user.type";
import classes from "./Chat.module.css";

export default function Chat() {
   const bottomRef = useRef<HTMLDivElement>(null);
   const socketRef = useRef<any>(null);
   const isMobile = useIsMobile();

   const { info } = useAppSelector((state) => state.user);
   const [pagination] = useState({
      page: 1,
      pageSize: 100,
   });
   const [search, setSearch] = useState(``);
   const [step, setStep] = useState<1 | 2>(1);
   const [userSelected, setUserSelected] = useState<TUserListRes | null>(null);

   const createChat = useCreateChat();
   const queryClient = useQueryClient();
   const userList = useGetUserList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      search,
   });
   const [listMessage, setListMessage] = useState<TListChatRes[] | null>(null);

   const [value, setValue] = useState("");

   const handleSearch = useDebouncedCallback(async (query: string) => {
      setSearch(query);
   }, 500);

   useEffect(() => {
      if (listMessage === null) return;
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
      queryClient.invalidateQueries({ queryKey: [`user-list`] });
   }, [listMessage]);

   const handleScroll = useDebouncedCallback(async () => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
   }, 500);
   useEffect(() => {
      if (step === 1 && isMobile) return;
      handleScroll();
   }, [step, isMobile]);

   useEffect(() => {
      if (!socketRef.current && info?.user_id) {
         console.log(info?.user_id);

         socketRef.current = io(BASE_DOMAIN_API, {
            query: { user_id: info?.user_id },
            transports: ["websocket", "polling"],
            rejectUnauthorized: false,
            secure: isProduction,
         });

         socketRef.current.on("connect", () => {
            console.log(socketRef.current.id);
         });

         // Lắng nghe tin nhắn từ server
         socketRef.current.on("receive-message", (data: any) => {
            setListMessage((prev) => {
               if (prev === null) return null;
               return [...prev, data];
            });
            // console.log(data);
         });

         // socketRef.current.on("new-message", (data: any) => {
         //    console.log(data);
         //    queryClient.invalidateQueries({ queryKey: [`user-list`] });
         // });

         // socketRef.current.on("message", (data: any) => {
         //    // console.log(data);
         // });

         socketRef.current.on("get-list-message", (data: any) => {
            setListMessage(data);
         });

         socketRef.current.on("disconnect", () => {
            console.log(socketRef.current.id);
         });
      }

      // Clean up khi component unmount
      return () => {
         if (socketRef.current) {
            socketRef.current.disconnect();
         }
      };
   }, [info?.user_id]);

   const handleSubmit = () => {
      if (!userSelected || !info) return;

      socketRef.current.emit("send-message", {
         message: value,
         user_id_sender: info.user_id,
         user_id_recipient: userSelected.user_id,
      });
      console.log(`handleSubmit`);
      setValue(``);
   };

   const renderContentUser = () => {
      if (userList.isLoading) {
         return (
            <Center>
               <Loader size={`md`} mt={50} />
            </Center>
         );
      }

      if (userList.isError || !userList.data || userList.data?.items.length === 0) {
         return <Nodata />;
      }

      return userList.data.items.map((user, i) => {
         return (
            <Group
               onClick={() => {
                  setUserSelected(user);
                  setStep(2);
                  socketRef.current.emit("join-room", {
                     user_id_sender: info?.user_id,
                     user_id_recipient: user.user_id,
                  });
                  socketRef.current.emit("get-list-message", {
                     user_id_sender: info?.user_id,
                     user_id_recipient: user.user_id,
                  });
               }}
               className={`${classes.itemUser}`}
               key={i}
            >
               <Avatar user={user} />
               <Box>
                  <Text fz="sm" fw={700}>
                     {user.full_name}
                  </Text>
                  <Text fz="xs" c="dimmed">
                     {user.lastMessage}
                  </Text>
               </Box>
            </Group>
         );
      });
   };

   const renderContentMessage = () => {
      // if (listChat.isLoading) {
      //    return <Loader size={`md`} mt={50} />;
      // }

      if (!listMessage) {
         return <Nodata />;
      }

      return (
         <>
            {listMessage.map((mes, i) => {
               return (
                  <Box className={mes.user_id_sender === info?.user_id ? `${classes.mesRightWrap}` : `${classes.mesLeftWrap}`} key={i}>
                     <Text className={`${classes.mes}`}>{mes.message}</Text>
                  </Box>
               );
            })}
            <Box ref={bottomRef} />
         </>
      );
   };

   return (
      <Box className={classes.wrap}>
         {/* left */}
         <Transition enterDelay={400} mounted={isMobile ? step === 1 : true} transition="slide-right" duration={400} timingFunction="ease">
            {(styles) => (
               <div style={styles}>
                  <Stack className={classes.left}>
                     {/* header */}
                     <Box className={`${classes.header}`}>
                        <TextInput
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const value = event.currentTarget.value;
                              // if (value.trim() === ``) return;
                              handleSearch(value);
                           }}
                           radius="xl"
                           size="md"
                           styles={{ root: { width: `100%` } }}
                           placeholder="Search users"
                           leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                        />
                     </Box>

                     {/* list user */}
                     <Stack style={{ flex: `1`, overflowY: `auto` }} px={`10px`}>
                        {renderContentUser()}
                     </Stack>
                  </Stack>
               </div>
            )}
         </Transition>

         {/* right */}
         <Transition enterDelay={400} mounted={isMobile ? step === 2 : true} transition="slide-right" duration={400} timingFunction="ease">
            {(styles) => (
               <div style={styles}>
                  <Stack className={classes.right}>
                     {/* header */}
                     <Box className={`${classes.header}`}>
                        {isMobile && (
                           <ActionIcon
                              onClick={() => {
                                 setStep(1);
                              }}
                              size={`xl`}
                              variant="subtle"
                              radius={`100%`}
                              color="dark"
                           >
                              <IconArrowNarrowLeft color="var(--mantine-color-dark-1)" style={{ width: rem(24), height: rem(24) }} />
                           </ActionIcon>
                        )}
                        {userSelected && (
                           <Group>
                              <Avatar user={userSelected} />
                              <Text fz="sm" fw={700}>
                                 {userSelected.full_name}
                              </Text>
                           </Group>
                        )}
                     </Box>

                     {/* list chat */}
                     <Stack style={{ flex: `1`, overflowY: `auto` }} px={`10px`}>
                        {renderContentMessage()}
                     </Stack>

                     {/* input chat */}
                     <Group p={`10px`}>
                        <TextInput
                           onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
                           placeholder="Aa"
                           size="sm"
                           style={{ flex: `1` }}
                           radius="xl"
                           value={value}
                           onChange={(event) => setValue(event.target.value)}
                        />
                        {createChat.isPending ? (
                           <Loader size={`sm`} />
                        ) : (
                           <ActionIcon onClick={handleSubmit} variant="subtle" size={`lg`} style={{ borderRadius: `100%` }}>
                              <IconSend2 />
                           </ActionIcon>
                        )}
                     </Group>
                  </Stack>
               </div>
            )}
         </Transition>
      </Box>
   );
}
