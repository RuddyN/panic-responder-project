import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProviderWrapper = ({ children }: {children: any}) => (
  <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
);
