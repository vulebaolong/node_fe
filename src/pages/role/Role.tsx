import {
   ActionIcon,
   Badge,
   Box,
   Group,
   Indicator,
   Loader,
   Pagination,
   rem,
   Select,
   Stack,
   Text,
   TextInput,
   Loader as LoaderMantine,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useListRole } from "../../common/api/tanstack/role.tanstack";
import Nodata from "../../common/components/no-data/Nodata";
import { theme } from "../../common/provider/mantaine/theme.maintaine";
import { ROUTER } from "../../constant/router.constant";
import { effectText } from "../../helpers/motion.helper";
import rootRouter from "../../routes/rootRouter";
import classes from "./Role.module.css";

let totalPage = 0;

export default function Role() {
   const [pagination, setPagination] = useState({
      page: 1,
      pageSize: 5,
   });

   const [search, setSearch] = useState(``);
   const handleSearch = useDebouncedCallback(async (query: string) => {
      setSearch(query);
   }, 500);
   const listRole = useListRole({
      page: pagination.page,
      pageSize: pagination.pageSize,
      search,
   });
   totalPage = listRole.data?.totalPage || totalPage;

   const renderContent = () => {
      if (listRole.isLoading)
         return (
            <Box mt={100}>
               <Loader />
            </Box>
         );

      if (!listRole.data?.items || listRole.data.items.length === 0 || listRole.isError)
         return (
            <Box mt={100}>
               <Nodata />
            </Box>
         );

      return (
         <Box className={classes.one}>
            {listRole.data?.items.map((role, i) => {
               return (
                  <Indicator key={i} inline processing color={role.is_active ? `green` : `red`} size={12} offset={10}>
                     <Stack
                        onClick={() => {
                           rootRouter.navigate(ROUTER.ROLE.DETAIL(role.role_id));
                        }}
                        className={`${classes.two}`}
                        style={{ cursor: `pointer` }}
                     >
                        <Group justify="space-between">
                           <Badge variant="light">
                              <Text component="span" size="xs">
                                 {effectText(role.name || ``)}
                              </Text>
                           </Badge>
                        </Group>
                        <Text component="span" size="xs">
                           {effectText(role.description || ``)}
                        </Text>
                     </Stack>
                  </Indicator>
               );
            })}
         </Box>
      );
   };

   return (
      <Box>
         <TextInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               const value = event.currentTarget.value;
               handleSearch(value);
            }}
            radius="xl"
            size="md"
            my={20}
            placeholder="Search videos"
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
               listRole.isLoading ? (
                  <LoaderMantine size={20} />
               ) : (
                  <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                     <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                  </ActionIcon>
               )
            }
         />
         {renderContent()}

         <Box
            className={`wrapPagination`}
            style={{
               display: "flex",
               justifyContent: "end",
               alignItems: "center",
               gap: `10px`,
            }}
         >
            <Box style={{ width: `65px` }}>
               <Select
                  size="xs"
                  value={`${pagination.pageSize}`}
                  onChange={(value) => {
                     if (value === null) return;
                     setPagination((prev) => {
                        return {
                           ...prev,
                           page: 1,
                           pageSize: +value,
                        };
                     });
                  }}
                  data={["5", "10", "15", "20"]}
               />
            </Box>

            <Pagination
               radius={`md`}
               size={`sm`}
               disabled={listRole.isLoading}
               value={pagination.page}
               total={totalPage}
               onChange={(page) => {
                  setPagination((prev) => {
                     return { ...prev, page };
                  });
               }}
            />
         </Box>
      </Box>
   );
}
