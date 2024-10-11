export type TPermission = {
   permission_id: number;
   name: string;
   endpoint: string;
   method: string;
   module: string;
   created_at: string;
   updated_at: string;
};

export type TPermissionGroupByMoudleRes = {
   [key: string]: (TPermission & { role_permissions: TRolePermission })[];
};

export type TRolePermission = {
   role_permissions_id: number;
   role_id: number;
   permission_id: number;
   created_at: string;
   updated_at: string;
};
