import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import PersonalTasks from "./pages/PersonalTasks";
import PlannedTasks from "./pages/PlannedTasks";
import WorkTasks from "./pages/WorkTasks";
import ShoppingTasks from "./pages/ShoppingTasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planned" element={<PlannedTasks />} />
            <Route path="/personal" element={<PersonalTasks />} />
            <Route path="/work" element={<WorkTasks />} />
            <Route path="/shopping" element={<ShoppingTasks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
