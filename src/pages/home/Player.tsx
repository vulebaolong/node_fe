import ReactPlayer from "react-player";
import { TVideo } from "../../types/video-type";

export default function Player({ video }: { video: TVideo }) {
   return (
      <ReactPlayer
         height={`100%`}
         width={`100%`}
         url={video.source}
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
}
