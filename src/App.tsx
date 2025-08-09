import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ParallaxProvider } from "@/components/ParallaxProvider";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import DynamicFavicon from "@/components/DynamicFavicon";
import Index from "./pages/Index";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="profile-theme">
    <ParallaxProvider>
      <QueryClientProvider client={queryClient}>
        <DynamicFavicon />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CustomCursor />
          <ScrollProgress />
          <BackToTop />
          <BrowserRouter>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ParallaxProvider>
  </ThemeProvider>
);

export default App;
