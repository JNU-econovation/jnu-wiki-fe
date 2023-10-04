import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "@/components/common/layout/Loader.jsx";
import { CookiesProvider } from "react-cookie";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
