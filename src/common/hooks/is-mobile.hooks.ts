import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useIsMobile = () => useMediaQuery(`(max-width: ${useMantineTheme().breakpoints.md})`);
