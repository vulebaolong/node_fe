import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { TRes } from "../../../types/app.type";
import { TPermissionGroupByMoudleRes } from "../../../types/permission.type";
import api from "../axios/axios";

export const usePermissionGroupByModule = (roleId: string) => {
   return useQuery({
      queryKey: [`permission-by-module`, roleId],
      queryFn: async () => {
         const { data } = await api.get<TRes<TPermissionGroupByMoudleRes>>(
            `${ENDPOINT.PERMISSION_GROUP_BY_MODULE}/${roleId}`
         );
         return data.metaData;
      },
   });
};
