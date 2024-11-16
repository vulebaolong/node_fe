import { Badge, Box, Group, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import { useGetUserList } from "../../common/api/tanstack/user.tanstack";
import { Avatar } from "../../common/components/avatar/Avatar";

// const data = [
//    {
//       avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
//       name: "Robert Wolfkisser",
//       job: "Engineer",
//       email: "rob_wolf@gmail.com",
//       role: "Collaborator",
//       lastActive: "2 days ago",
//       active: true,
//    },
//    {
//       avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
//       name: "Jill Jailbreaker",
//       job: "Engineer",
//       email: "jj@breaker.com",
//       role: "Collaborator",
//       lastActive: "6 days ago",
//       active: true,
//    },
//    {
//       avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
//       name: "Henry Silkeater",
//       job: "Designer",
//       email: "henry@silkeater.io",
//       role: "Contractor",
//       lastActive: "2 days ago",
//       active: false,
//    },
//    {
//       avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
//       name: "Bill Horsefighter",
//       job: "Designer",
//       email: "bhorsefighter@gmail.com",
//       role: "Contractor",
//       lastActive: "5 days ago",
//       active: true,
//    },
//    {
//       avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
//       name: "Jeremy Footviewer",
//       job: "Manager",
//       email: "jeremy@foot.dev",
//       role: "Manager",
//       lastActive: "3 days ago",
//       active: false,
//    },
// ];

let totalPage = 0;

// const rolesData = ["Manager", "Collaborator", "Contractor"];

export function Users() {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(5);

   const userList = useGetUserList({
      page: page,
      pageSize: pageSize,
      search: "",
      notMe: false,
   });
   totalPage = userList.data?.totalPage || totalPage;

   return (
      <Stack>
         <Box style={{ width: `100%`, paddingBottom: `150px` }}>
            <Table.ScrollContainer minWidth={800} h={`500px`}>
               <Table verticalSpacing="sm" stickyHeader>
                  <Table.Thead>
                     <Table.Tr>
                        <Table.Th w={300}>User</Table.Th>
                        <Table.Th>Role</Table.Th>
                     </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                     {userList.data?.items.map((user, i) => {
                        return (
                           <Table.Tr
                              key={user.user_id}
                              style={{
                                 opacity: "0",
                                 animation: "fadeInUp 0.5s forwards",
                                 animationDelay: `${50 * i}ms`,
                              }}
                           >
                              <Table.Td>
                                 <Group gap="sm">
                                    <Avatar user={user} />
                                    <div>
                                       <Text fz="sm" fw={500}>
                                          {user.full_name}
                                       </Text>
                                       <Text fz="xs" c="dimmed">
                                          {user.email}
                                       </Text>
                                    </div>
                                 </Group>
                              </Table.Td>

                              <Table.Td>
                                 <Badge color={user.roles.role_id === 1 ? `red` : ``} variant="light">
                                    {user.roles.name}
                                 </Badge>
                              </Table.Td>
                           </Table.Tr>
                        );
                     })}
                  </Table.Tbody>
               </Table>
            </Table.ScrollContainer>
         </Box>

         <Box
            className={`wrapPagination`}
            style={{
               display: "flex",
               justifyContent: "end",
               alignItems: "center",
               gap: `10px`,
            }}
         >
            <Box style={{ width: `55px` }}>
               <Select
                  size="xs"
                  value={`${pageSize}`}
                  onChange={(value) => {
                     if (value === null) return;
                     setPageSize(Number(value));
                     setPage(1);
                  }}
                  data={Array.from({ length: 5 }, (_, i) => `${5 * (i + 1)}`)}
               />
            </Box>

            <Pagination radius={`md`} size={`sm`} disabled={userList.isLoading} value={page} total={totalPage} onChange={setPage} />
         </Box>
      </Stack>
   );
}
