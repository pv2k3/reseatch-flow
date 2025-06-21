
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewPaper from "./pages/NewPaper";
import PaperEditor from "./pages/PaperEditor";
import NotFound from "./pages/NotFound";
import Sign_in from "./pages/Sign_in";
import Signup from "./pages/Sign_up";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-paper" element={<NewPaper />} />
          <Route path="/editor" element={<PaperEditor />} />
          <Route path="/sign-in" element={<Sign_in />} />
          <Route path="/sign-up" element={<Signup />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
