import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "@/modules/auth/provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import Modal from "react-modal";

const queryClient = new QueryClient();

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster position="top-right" richColors />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </>,
);
