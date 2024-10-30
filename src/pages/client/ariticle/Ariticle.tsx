import { Box, Container } from "@mantine/core";
import { ArticleCard } from "./ariticle-card/AriticleCard";

export default function Ariticle() {
   return (
      <Container size="lg">
         <Box style={{ display: `grid`, gridTemplateColumns: `1fr 1fr`, gap: `50px` }}>
            {Array.from({ length: 4 }, () => ``).map((_, i) => {
               return <ArticleCard key={i}/>;
            })}
         </Box>
      </Container>
   );
}
