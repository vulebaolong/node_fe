import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ProviderRedux } from "react-redux";
import { store } from "../../store/store";
import GoogleProvider from "./google/GoogleProvider";
import { theme } from "./mantaine/theme.maintaine";
import ToastProvider from "./toast/ToastProvider";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: false,
         gcTime: 0,
         staleTime: 0,
      },
   },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
         <QueryClientProvider client={queryClient}>
            <ProviderRedux store={store}>
               <HelmetProvider>
                  <MantineProvider theme={theme}>
                     <ToastProvider />
                     <GoogleProvider>{children}</GoogleProvider>
                  </MantineProvider>
               </HelmetProvider>
            </ProviderRedux>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
         </QueryClientProvider>
   );
};

export default Providers;
