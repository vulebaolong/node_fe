import { Badge, Box, Center, Container, Group, Pagination, Select, Skeleton, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useCarList } from "../../../../common/api/tanstack/car.tanstack";
import Nodata from "../../../../common/components/no-data/Nodata";
import { CarItem } from "../car-item/CarItem";
import classes from "./CarList.module.css";

let totalPage = 0;

export default function CarList() {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(9);

   const carList = useCarList({ page, pageSize });
   totalPage = carList.data?.totalPage || totalPage;

   const renderContent = () => {
      if (carList.isLoading)
         return (
            <Box className={`${classes[`box-1`]}`}>
               {Array.from({ length: pageSize }, () => "").map((_, i) => {
                  return (
                     <div key={i}>
                        <Skeleton styles={{ root: { width: `356px`, height: `420px` } }} />
                     </div>
                  );
               })}
            </Box>
         );

      if (!carList.data?.items || carList.data.items.length === 0 || carList.isError)
         return (
            <Group h={`100%`}>
               <Nodata />
            </Group>
         );

      return (
         <div className={`${classes[`box-1`]}`}>
            {carList.data?.items.map((car, i) => {
               return <CarItem key={i} car={car} />;
            })}
         </div>
      );
   };

   return (
      <Container size={`lg`}>
         <Group justify="center">
            <Badge variant="filled" size="lg">
               Best company ever
            </Badge>
         </Group>

         <Title order={2} className={classes.title} ta="center" mt="sm">
            Choose Your Ideal Electric Car with Ease
         </Title>

         <Text c="dimmed" className={classes.description} ta="center" mt="md">
            Drive Into the Future with Our Top Electric Models. Unbeatable Electric Car Deals for Your Next Trip.
         </Text>

         {renderContent()}

         <Center mt={50}>
            <Group>
               <Box style={{ width: `55px` }}>
                  <Select
                     size="xs"
                     value={`${pageSize}`}
                     onChange={(value) => {
                        if (value === null) return;
                        setPageSize(Number(value));
                        setPage(1);
                     }}
                     data={["3", "6", "9", "18"]}
                  />
               </Box>

               <Pagination radius={`md`} size={`sm`} disabled={carList.isLoading} value={page} total={totalPage} onChange={setPage} />
            </Group>
         </Center>
      </Container>
   );
}
