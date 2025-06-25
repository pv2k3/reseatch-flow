
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
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3"; 

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
          <Route path="/home" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Home3 />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THIS LINE */}
          {/* Example of a custom route */}
          {/* <Route path="/custom-route" element={<CustomComponent />} /> */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THIS LINE */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
