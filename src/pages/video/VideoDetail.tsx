import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconThumbDown, IconThumbDownFilled, IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetTotalLike, useVideoDetail, useVideoDisLike, useVideoGetLike, useVideoLike } from "../../common/api/tanstack/video.tantask";
import { Avatar } from "../../common/components/avatar/Avatar";
import Loader from "../../common/components/loader/Loader";
import Nodata from "../../common/components/no-data/Nodata";
import classes from "./Video.module.css";
import CommentVideo from "./comment/CommentVideo";

export default function VideoDetail() {
   const [lineClamp, toggleLineClamp] = useToggle([3, 0]);
   const { videoId } = useParams();
   const videoDetail = useVideoDetail(Number(videoId) || 0);
   const videoGetLike = useVideoGetLike(Number(videoId) || 0);
   const getTotalLike = useGetTotalLike(Number(videoId) || 0);

   const videoLike = useVideoLike();
   const videoDisLike = useVideoDisLike();
   const queryClient = useQueryClient();

   const handleLike = () => {
      videoLike.mutate(
         { video_id: Number(videoId) || 0 },
         {
            onSuccess: () => {
               toast.success(`Like video successfully`);
               queryClient.invalidateQueries({ queryKey: [`video-get-like`] });
               queryClient.invalidateQueries({ queryKey: [`video-get-total-like`] });
            },
         }
      );
   };

   const handleDisLike = () => {
      videoDisLike.mutate(
         { video_id: Number(videoId) || 0 },
         {
            onSuccess: () => {
               toast.success(`Like video successfully`);
               queryClient.invalidateQueries({ queryKey: [`video-get-like`] });
               queryClient.invalidateQueries({ queryKey: [`video-get-total-like`] });
            },
         }
      );
   };

   const renderContent = () => {
      if (videoDetail.isLoading) {
         return (
            <Box mt={100}>
               <Loader />
            </Box>
         );
      }

      if (!videoDetail.data || videoDetail.isError) {
         return (
            <Box mt={100}>
               <Nodata />
            </Box>
         );
      }

      return (
         <ReactPlayer
            width={`100%`}
            height={`60vh`}
            url={videoDetail.data.source}
            controls
            config={{
               youtube: {
                  playerVars: {
                     origin: "https://localhost:5173/home",
                  },
               },
            }}
         />
      );
   };

   return (
      <Box>
         {renderContent()}

         <Stack mt={20}>
            <Title order={2}>
               <Text inherit truncate>
                  {videoDetail.data?.video_name}
               </Text>
            </Title>

            <Group>
               <Avatar user={videoDetail.data?.users} />
               <Text fz="lg" fw={500} truncate="end">
                  {videoDetail.data?.users.full_name}
               </Text>
               <Button.Group>
                  <Button onClick={handleLike} leftSection={videoGetLike.data?.is_like ? <IconThumbUpFilled /> : <IconThumbUp />} variant="default">
                     {getTotalLike.data || 0}
                  </Button>
                  <Button onClick={handleDisLike} variant="default">
                     {videoGetLike.data?.dis_like ? <IconThumbDownFilled /> : <IconThumbDown />}
                  </Button>
               </Button.Group>
            </Group>

            <Box className={`${classes.description}`}>
               <Text lineClamp={lineClamp}>{videoDetail.data?.description}</Text>
               {(videoDetail.data?.description.length || 0) > 80 && (
                  <>
                     {lineClamp === 0 ? (
                        <Text
                           onClick={() => {
                              toggleLineClamp();
                           }}
                           span
                           fw={700}
                           style={{ cursor: `pointer` }}
                        >
                           Ẩn bớt
                        </Text>
                     ) : (
                        <Text
                           onClick={() => {
                              toggleLineClamp();
                           }}
                           span
                           fw={700}
                           style={{ cursor: `pointer` }}
                        >
                           Thêm
                        </Text>
                     )}
                  </>
               )}
            </Box>

            <CommentVideo />
         </Stack>
      </Box>
   );
}
