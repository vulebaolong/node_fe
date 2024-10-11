import { Box, Button, Center, Loader, Stack, Text, Textarea, Title } from "@mantine/core";
import { useIntersection, useToggle } from "@mantine/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useVideoComment, useVideoCommentFirst, useVideoCommentList } from "../../../common/api/tanstack/video.tantask";
import { Avatar } from "../../../common/components/avatar/Avatar";
import Nodata from "../../../common/components/no-data/Nodata";
import { useAppSelector } from "../../../store/store";
import { TVideoCommentRes } from "../../../types/video-type";
import classes from "../Video.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

let block = false;

export default function CommentVideo() {
   const [pagination, setPagination] = useState({
      page: 1,
      pageSize: 5,
   });

   const containerRef = useRef<HTMLDivElement>(null);
   const { ref, entry } = useIntersection({
      root: containerRef.current,
      threshold: 0,
   });

   const { videoId } = useParams();

   const [content, setContent] = useState(``);
   const { info } = useAppSelector((state) => state.user);

   const videoCommentList = useVideoCommentList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      video_id: Number(videoId) || 0,
   });
   const videoCommentFirst = useVideoCommentFirst();
   const videoComment = useVideoComment();

   const [dataComment, setDataComment] = useState<TVideoCommentRes[]>([]);

   useEffect(() => {
      if (!entry?.isIntersecting) return;
      if (block) return;
      setPagination((prev) => {
         block = true;
         return {
            ...prev,
            page: prev.page + 1,
         };
      });
   }, [entry?.isIntersecting]);

   useEffect(() => {
      if (!videoCommentList.data) return;
      if (videoCommentList.data?.items.length === 0) return;
      setDataComment((prev) => {
         block = false;
         return [...prev, ...videoCommentList.data?.items];
      });
   }, [videoCommentList.data?.items]);

   useEffect(() => {
      if (!videoCommentFirst.data) return;
      if (videoCommentFirst.isError) return;
      setDataComment((prev) => {
         block = false;
         return [videoCommentFirst.data, ...prev];
      });
   }, [videoCommentFirst.data]);

   const handleComment = () => {
      if (content.trim() === ``) return;
      videoComment.mutate(
         {
            video_id: videoId ? +videoId : 0,
            content: content.trim(),
         },
         {
            onSuccess: () => {
               setContent(``);
               toast.success(`Comment successfully`);
               videoCommentFirst.mutate(Number(videoId) || 0);
            },
         }
      );
   };

   const renderCommentList = () => {
      if (videoCommentList.isError) {
         return (
            <Box mt={100}>
               <Nodata />
            </Box>
         );
      }

      return (
         <>
            <Box
               ref={containerRef}
               style={{
                  height: `300px`,
                  overflowY: `auto`,
               }}
            >
               <Stack style={{ minHeight: `350px` }}>
                  {dataComment.map((comment, i) => {
                     return (
                        <Box
                           key={i}
                           className={classes.commentItem}
                           // ref={dataComment.length - 1 === i ? ref : null}
                        >
                           <Avatar user={comment.users} />
                           <Box>
                              <Text fz="sm" fw={700}>
                                 {comment.users.full_name}
                              </Text>
                              <Text fz="xs" c="dimmed">
                                 {dayjs.utc(comment.created_at).local().fromNow()}
                              </Text>
                           </Box>
                           <Box />
                           <TextComment text={comment.content} />
                        </Box>
                     );
                  })}
               </Stack>
               {videoCommentList.isLoading && (
                  <Center mt={20}>
                     <Loader size={`xs`} />
                  </Center>
               )}
               <Box style={{ width: `100%`, padding: `20px` }} ref={ref}></Box>
            </Box>
         </>
      );
   };

   return (
      <>
         <Title mt={20} order={3}>
            {videoCommentList.data?.totalItem} Bình luận
         </Title>

         <Box className={`${classes.commentMe}`}>
            <Avatar style={{ cursor: `pointer` }} user={info} />
            <Textarea
               onChange={(value) => {
                  setContent(value.target.value);
               }}
               value={content}
               placeholder="Viết bình luận..."
               resize="vertical"
            />
            <Box />
            <Button loading={videoComment.isPending} onClick={handleComment} w={`fit-content`}>
               Bình luận
            </Button>
         </Box>

         {renderCommentList()}
      </>
   );
}

type TTextComment = {
   text: string;
};
const TextComment = ({ text }: TTextComment) => {
   const [lineClamp, toggleLineClamp] = useToggle([3, 0]);

   return (
      <Box>
         <Text lineClamp={lineClamp}>{text}</Text>
         {(text.length || 0) > 80 && (
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
   );
};
