import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

// Auth pages
import Login from "./pages/Login";

// Faculty pages
import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyCourses from "./pages/faculty/Courses";
import CourseDetails from "./pages/faculty/CourseDetails";
import CreateCourse from "./pages/faculty/CreateCourse";
import CreateAssignment from "./pages/faculty/CreateAssignment";
import ManageAssignments from "./pages/faculty/ManageAssignments";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import BrowseCourses from "./pages/student/BrowseCourses";
import MyCourses from "./pages/student/MyCourses";
import StudentCourseDetails from "./pages/student/CourseDetails";
import AssignmentDetails from "./pages/student/AssignmentDetails";
import Assignments from "./pages/student/Assignments";

// Other pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" />} />
              
              {/* Faculty Routes */}
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty/courses" element={<FacultyCourses />} />
              <Route path="/faculty/course/:courseId" element={<CourseDetails />} />
              <Route path="/faculty/create-course" element={<CreateCourse />} />
              <Route path="/faculty/course/:courseId/assignments/create" element={<CreateAssignment />} />
              <Route path="/faculty/assignments" element={<ManageAssignments />} />
              
              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/courses" element={<MyCourses />} />
              <Route path="/student/browse-courses" element={<BrowseCourses />} />
              <Route path="/student/course/:courseId" element={<StudentCourseDetails />} />
              <Route path="/student/assignment/:assignmentId" element={<AssignmentDetails />} />
              <Route path="/student/assignments" element={<Assignments />} />
              
              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
