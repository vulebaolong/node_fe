import { Accordion, Badge, Box, Group, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { usePermissionGroupByModule } from "../../common/api/tanstack/permission.tanstack";
import { useTogglePermission, useDetailRole } from "../../common/api/tanstack/role.tanstack";
import classes from "./Role.module.css";
import { toast } from "react-toastify";
import { resError } from "../../helpers/function.helper";

export default function RoleDetail() {
   const { roleId } = useParams();
   const queryClient = useQueryClient();

   const detailRole = useDetailRole(roleId || `0`);
   const permissionGroupByModule = usePermissionGroupByModule(roleId || `0`);
   const togglePermission = useTogglePermission();

   const handleClickSwitch = (permissionId: number) => {
      if (!roleId) return;
      togglePermission.mutate(
         {
            permission_id: permissionId,
            role_id: Number(roleId),
         },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: [`permission-by-module`] });
               toast.success(`Add/remove permission successfully`);
            },
            onError: (error) => {
               console.log(error);
               toast.error(resError(error, `Add/remove permission failed`));
            },
         }
      );
   };
   return (
      <Stack>
         <Group align="center">
            <Title>{detailRole.data?.name}</Title>
            <Switch checked={detailRole.data?.is_active} onLabel={`ON`} offLabel={`OFF`} />
         </Group>
         <Text c="dimmed">{detailRole.data?.description}</Text>

         <Accordion multiple variant="contained" radius="md">
            {Object.entries(permissionGroupByModule.data || {}).map(([key, permissions], i1) => (
               <Accordion.Item key={i1} value={key}>
                  <Accordion.Control>{key}</Accordion.Control>
                  <Accordion.Panel>
                     <Box className={`${classes.moduleWrap}`}>
                        {permissions.map((permission, i2) => {
                           return (
                              <Paper shadow="xs" withBorder p="xl" radius="md" key={i2}>
                                 <Group wrap="nowrap">
                                       <Switch
                                          onClick={() => {
                                             handleClickSwitch(permission.permission_id);
                                          }}
                                          onLabel={`ON`}
                                          offLabel={`OFF`}
                                          checked={!_.isEmpty(permission.role_permissions)}
                                       />
                                    <Stack>
                                       <Title px={10} order={5}>
                                          {permission.name}
                                       </Title>

                                       <Group>
                                          <Badge
                                             size="lg"
                                             variant="light"
                                             color={(() => {
                                                if (permission.method === `POST`) return `yellow`;
                                                if (permission.method === `PUT`) return `blue`;
                                                if (permission.method === `PATCH`) return `violet`;
                                                if (permission.method === `DELETE`) return `red`;
                                                return `green`;
                                             })()}
                                          >
                                             {permission.method}
                                          </Badge>

                                          <Text c="dimmed" fs="italic" w={`fit-content`} px={10}>
                                             {permission.endpoint}
                                          </Text>
                                       </Group>
                                    </Stack>
                                 </Group>
                              </Paper>
                           );
                        })}
                     </Box>
                  </Accordion.Panel>
               </Accordion.Item>
            ))}
         </Accordion>
      </Stack>
   );
}
