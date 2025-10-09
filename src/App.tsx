import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";
import MySpace from "./pages/MySpace";
import CourseDetail from "./pages/CourseDetail";
import ChapterDetail from "./pages/ChapterDetail";
import ViewSpace from "./pages/ViewSpace";
import DiscoverPage from "./pages/DiscoverPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/my-space" element={<MySpace />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route
                path="/courses/:courseId/chapters/:chapterId"
                element={<ChapterDetail />}
              />

              {/* ✅ NEW ROUTE FOR PUBLIC VIEW PAGE */}
              <Route path="/view/:id" element={<ViewSpace />} />

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
