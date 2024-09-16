import { useParams } from "react-router-dom";

export default function VideoType() {
   const { type_id } = useParams();
   console.log(type_id);
   return <div>VideoType</div>;
}
