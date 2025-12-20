// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { initGTM } from "./lib/gtm";
import { useGtmEvents } from "./hooks/useGtmEvents";
import OrderConfirmation from "./pages/OrderConfirmation";

const queryClient = new QueryClient();

const App = () => {
  // ✅ GTM init on app load
  useEffect(() => {
    initGTM();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Page view auto tracking */}
          <PageTrackerWrapper />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Add all other custom routes above */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Wrapper to auto-track page views using your custom hook
const PageTrackerWrapper = () => {
  useGtmEvents(); // 🔹 auto page_view tracking
  return null;
};

export default App;
