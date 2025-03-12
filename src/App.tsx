
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import LogViewer from "./pages/LogViewer";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import AuctionDetails from "./pages/AuctionDetails";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ExploreAuctions from "./pages/ExploreAuctions";
import HowItWorksPage from "./pages/HowItWorksPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
          <Route path="/logs" element={<LogViewer />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/auction/:id" element={<AuctionDetails />} />
          <Route path="/explore" element={<ExploreAuctions />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
