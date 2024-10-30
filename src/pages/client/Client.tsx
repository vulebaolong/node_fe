import { Stack } from "@mantine/core";
import Ariticle from "./ariticle/Ariticle";
import CarList from "./car/car-list/CarList";
import { Faq } from "./faq/Faq";
import { Feature } from "./feature/Feature";
import { Hero } from "./hero/Hero";

export default function Client() {
   return (
      <Stack gap={150}>
         <Hero />
         <CarList />
         <Feature />
         <Ariticle />
         <Faq />
      </Stack>
   );
}
