"use client";

import React, { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const isDevelopment = process.env.NODE_ENV === "development";

/*
 * QueryProvider is used to provide the query client to the application
 * It also provides the hydration component to hydrate the cache
 * It also provides the devtools component to debug the cache
 */
function QueryProvider({ children }: React.PropsWithChildren<{}>) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {/* Hide the devtools in production */}
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export { QueryProvider };
