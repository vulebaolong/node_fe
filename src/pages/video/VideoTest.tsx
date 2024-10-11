import { Box, Card, Group, Image, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useVideoListTest } from "../../common/api/tanstack/video.tantask";
import { Avatar } from "../../common/components/avatar/Avatar";
import Loader from "../../common/components/loader/Loader";
import Nodata from "../../common/components/no-data/Nodata";
import { ROUTER } from "../../constant/router.constant";
import rootRouter from "../../routes/rootRouter";
import { TVideo } from "../../types/video-type";
import classes from "./Video.module.css";
import VideoTypeTest from "./VideoTypeTest";

export default function VideoTest() {
   const videoList = useVideoListTest();

   console.log(videoList.data);

   const handleClickCard = (video: TVideo) => {
      console.log(video);
      rootRouter.navigate(ROUTER.VIDEO.DETAIL(video.video_id));
   };

   const renderContent = () => {
      if (videoList.isLoading)
         return (
            <Group h={`100%`}>
               <Loader />
            </Group>
         );

      if (!videoList.data || videoList.data.length === 0 || videoList.isError)
         return (
            <Group h={`100%`}>
               <Nodata />
            </Group>
         );

      return (
         <Box className={classes.one}>
            {videoList.data?.map((video, i) => {
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
                           <Avatar user={video.users} />
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
         <Title>Video List Test</Title>

         <VideoTypeTest />

         <Box style={{ width: `100%`, paddingBottom: `150px` }}>{renderContent()}</Box>
      </>
   );
}
