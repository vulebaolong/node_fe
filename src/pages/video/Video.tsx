import {
   ActionIcon,
   Avatar,
   Box,
   Button,
   Card,
   Group,
   Image,
   Pagination,
   rem,
   Select,
   Text,
   TextInput,
   Title,
   Loader as LoaderMantine,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useVideoList } from "../../common/api/tanstack/video.tantask";
import Loader from "../../common/components/loader/Loader";
import Nodata from "../../common/components/no-data/Nodata";
import { TVideo } from "../../types/video-type";
import classes from "./Video.module.css";
import VideoType from "./VideoType";
import rootRouter from "../../routes/rootRouter";
import { ROUTER } from "../../constant/router.constant";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { theme } from "../../common/provider/mantaine/theme.maintaine";
import { useDebouncedCallback } from "@mantine/hooks";

let totalPage = 0;

export default function Video() {
   const [pagination, setPagination] = useState({
      page: 1,
      pageSize: 5,
   });
   const [typeId, setTypeId] = useState(0);
   const [search, setSearch] = useState(``);
   const [loadingSearch, setLoadingSearch] = useState(false);

   const handleSearch = useDebouncedCallback(async (query: string) => {
      setLoadingSearch(true)
      setSearch(query);
   }, 500);

   const videoList = useVideoList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      typeId,
      search,
   });

   useEffect(() => {
      if(!videoList.data) return
      setLoadingSearch(false);
   }, [videoList.data?.items]);

   totalPage = videoList.data?.totalPage || totalPage;

   const handleClickCard = (video: TVideo) => {
      console.log(video);
      rootRouter.navigate(ROUTER.VIDEO.VIDEO_DETAIL(video.video_id));
   };

   const renderContent = () => {
      if (videoList.isLoading)
         return (
            <Box mt={100}>
               <Loader />
            </Box>
         );

      if (!videoList.data?.items || videoList.data.items.length === 0 || videoList.isError)
         return (
            <Box mt={100}>
               <Nodata />
            </Box>
         );

      return (
         <Box className={classes.one}>
            {videoList.data?.items.map((video, i) => {
               return (
                  <Card
                     onClick={() => {
                        handleClickCard(video);
                     }}
                     key={i}
                     withBorder
                     radius="md"
                     p="md"
                     className={classes.card}
                     style={{
                        opacity: "0",
                        animation: "fadeInUp 0.5s forwards",
                        animationDelay: `${50 * i}ms`,
                     }}
                  >
                     <Card.Section>
                        <Image src={video.thumbnail} alt={`title`} height={180} />
                     </Card.Section>

                     <Card.Section className={classes.section} mt="md">
                        <Box className={classes.two}>
                           <Avatar src={video.users.avatar} />
                           <Text fz="lg" fw={500} truncate="end">
                              {video.video_name}
                           </Text>
                           <Box />
                           <Text fz="sm" mt="xs" truncate="end">
                              {video.description}
                           </Text>
                        </Box>
                     </Card.Section>
                  </Card>
               );
            })}
         </Box>
      );
   };

   return (
      <>
         <Title>Video List</Title>

         <VideoType
            onChange={(id) => {
               setPagination((prev) => {
                  return {
                     ...prev,
                     page: 1,
                  };
               });
               setTypeId(id);
            }}
            typeId={typeId}
         />

         <TextInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               const value = event.currentTarget.value;
               if (value.trim() === ``) return;
               handleSearch(event.currentTarget.value);
            }}
            radius="xl"
            size="md"
            my={20}
            placeholder="Search videos"
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
               loadingSearch ? (
                  <LoaderMantine size={20} />
               ) : (
                  <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                     <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                  </ActionIcon>
               )
            }
         />

         <Box style={{ width: `100%`, paddingBottom: `150px` }}>{renderContent()}</Box>

         <Box
            className={`wrapPagination`}
            style={{
               display: "flex",
               justifyContent: "end",
               alignItems: "center",
               gap: `10px`,
            }}
         >
            <Box style={{ width: `80px` }}>
               <Select
                  value={`${pagination.pageSize}`}
                  onChange={(value) => {
                     if (value === null) return;
                     setPagination((prev) => {
                        return {
                           ...prev,
                           page: 1,
                           pageSize: +value,
                        };
                     });
                  }}
                  data={["5", "10", "15", "20"]}
               />
            </Box>

            <Pagination
               disabled={videoList.isLoading}
               value={pagination.page}
               total={totalPage}
               onChange={(page) => {
                  setPagination((prev) => {
                     return { ...prev, page };
                  });
               }}
            />
         </Box>
      </>
   );
}
