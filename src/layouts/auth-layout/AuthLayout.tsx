import { Stack } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import SomethingWrong from "../../common/components/notifications/SomethingWrong";

export default function AuthLayout() {
   return (
      <ErrorBoundary fallbackRender={SomethingWrong}>
         <Stack h={`100dvh`} justify="center" align="center">
            <Outlet />
         </Stack>
      </ErrorBoundary>
   );
}
