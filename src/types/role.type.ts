import { TPermission } from "./permission.type";

export type TListRoleRes = {
   role_id: number;
   name: string;
   description: string;
   is_active: boolean;
   created_at: string;
   updated_at: string;
};

export type Permissions = {
   [key: string]: TPermission[];
};

export type TTogglePermissionReq = {
   role_id: number;
   permission_id: number;
};
