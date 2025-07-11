// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "./components/ui/provider.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "leaflet/dist/leaflet.css";
import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

// Initialize TanStack Query client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// if (import.meta.env.DEV) {
//   const { worker } = await import('./mocks/browser')
//   worker.start()
// }

reportWebVitals();
