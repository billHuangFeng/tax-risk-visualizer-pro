
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicInfoProvider } from "./contexts/BasicInfoContext";
import Index from "./pages/Index";
import VatCalculator from "./pages/VatCalculator";
import NotFound from "./pages/NotFound";
import FloatingContactButton from "./components/TaxCalculator/FloatingContactButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BasicInfoProvider>
        <FloatingContactButton />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vat" element={<VatCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BasicInfoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
