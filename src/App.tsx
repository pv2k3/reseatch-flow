
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewPaper from "./pages/NewPaper";
import PaperEditor from "./pages/PaperEditor";
import NotFound from "./pages/NotFound";
import Sign_in from "./pages/Sign_in";
import Signup from "./pages/Sign_up";
// import HeroCarousel from "./pages/HeroCarousel"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/your-papers" element={<Dashboard />} />
          <Route path="/new-paper" element={<NewPaper />} />
          <Route path="/editor" element={<PaperEditor />} />
          <Route path="/sign-in" element={<Sign_in />} />
          <Route path="/sign-up" element={<Signup />} />
          {/* <Route path="/Slide1" element={<Slide1 />} />
          <Route path="/Slide2" element={<Slide2 />} />
          <Route path="/Slide3" element={<Slide3 />} />
          <Route path="/hero-carousel" element={<HeroCarousel />} /> */}
       

          {/* ADD ALL CUSTOM ROUTES BELOW THIS LINE */}

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
