import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import PersonalTasks from "./pages/PersonalTasks";
import PlannedTasks from "./pages/PlannedTasks";
import WorkTasks from "./pages/WorkTasks";
import ShoppingTasks from "./pages/ShoppingTasks";
import TodayTasks from "./pages/TodayTasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/today" element={<TodayTasks />} />
          <Route path="/planned" element={<PlannedTasks />} />
          <Route path="/personal" element={<PersonalTasks />} />
          <Route path="/work" element={<WorkTasks />} />
          <Route path="/shopping" element={<ShoppingTasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
