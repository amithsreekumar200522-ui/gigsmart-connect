import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PostGig from "./pages/PostGig";
import BrowseWorkers from "./pages/BrowseWorkers";
import BrowseGigs from "./pages/BrowseGigs";
import WorkerProfilePage from "./pages/WorkerProfilePage";
import GigDetail from "./pages/GigDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/post-gig" element={<PostGig />} />
          <Route path="/browse-workers" element={<BrowseWorkers />} />
          <Route path="/browse-gigs" element={<BrowseGigs />} />
          <Route path="/worker/:id" element={<WorkerProfilePage />} />
          <Route path="/gig/:id" element={<GigDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
