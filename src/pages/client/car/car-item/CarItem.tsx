import { Card, Image, Text, Group, Badge, Center, Button } from "@mantine/core";
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from "@tabler/icons-react";
import classes from "./CarItem.module.css";
import { TCar } from "../../../../types/aar.type";

type TProps = {
   car: TCar;
};

export function CarItem({ car }: TProps) {
   return (
      <Card withBorder radius="md" className={classes.card}>
         <Card.Section className={classes.imageSection}>
            <Image style={{ width: `100%`, height: `170px`, objectFit: `contain` }} src={car.image_url} alt="Tesla Model S" />
         </Card.Section>

         <Group justify="space-between" mt="md">
            <div>
               <Text fw={500}>{car.name}</Text>
               <Text fz="xs" c="dimmed">
                  {car.description}
               </Text>
            </div>
            <Badge variant="outline">{car.discount_percentage}% off</Badge>
         </Group>

         <Card.Section className={classes.section} mt="md">
            <Text fz="sm" c="dimmed" className={classes.label}>
               Basic configuration
            </Text>

            <Group gap={8} mb={-8}>
               <Center>
                  <IconUsers size="1.05rem" className={classes.icon} stroke={1.5} />
                  <Text size="xs">{car.passengers} passengers</Text>
               </Center>
               <Center>
                  <IconGauge size="1.05rem" className={classes.icon} stroke={1.5} />
                  <Text size="xs">{car.max_speed}</Text>
               </Center>
               <Center>
                  <IconManualGearbox size="1.05rem" className={classes.icon} stroke={1.5} />
                  <Text size="xs">{car.gearbox_type}</Text>
               </Center>
               <Center>
                  <IconGasStation size="1.05rem" className={classes.icon} stroke={1.5} />
                  <Text size="xs">{car.fuel_type}</Text>
               </Center>
            </Group>
         </Card.Section>

         <Card.Section className={classes.section}>
            <Group gap={30}>
               <div>
                  <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                     ${car.price_per_day}
                  </Text>
                  <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                     per day
                  </Text>
               </div>

               <Button radius="xl" style={{ flex: 1 }}>
                  View
               </Button>
            </Group>
         </Card.Section>
      </Card>
   );
}
