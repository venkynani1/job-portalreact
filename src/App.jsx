import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Login from "./components/auth/Login";
import InstructorSignUp from "./components/auth/instructorsignup"
import InstructorDashboard from "./components/dashboard/dashboardIns";
import EnrolledUsersPage from "./components/enrollments/enrolledusers";
import CourseReviewsPage from "./components/reviews/coursereviews";
import CourseManagement from "./components/coursemanagement/coursemanagement";
import AddCoursePage from "./components/coursemanagement/addcourse";
import ProfilePage from "./components/profile/profile";
import  fetchDashboard  from "./store/actions/dashboardaction";
import  fetchInstructorDetails  from "./store/actions/userSliceAction";
import "../src/App.css";
import EditCoursePage from "./components/coursemanagement/editcourse";
import CourseModulesPage from "./components/coursemanagement/coursemodules";
import EditCourseModulePage from "./components/coursemanagement/editcoursemodule";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchInstructorDetails());
  }, [dispatch]);

  return (
    <Routes>
     <Route path="/" element={<Login />} />
      <Route path="/auth/instructorSignup" element={<InstructorSignUp />} />

      {/* Protected Routes (Instructor Dashboard and Related Pages) */}
      <Route path="/dashboard" element={<InstructorDashboard />} />
      <Route path="/enrollments" element={<EnrolledUsersPage />} />
      <Route path="/reviews" element={<CourseReviewsPage />} />
      <Route path="/coursemanagement" element={<CourseManagement />} />
      <Route path="/addcourse" element={<AddCoursePage />} />
      <Route path="/editcourse/:courseId" element={<EditCoursePage />} />
      <Route path="/coursemodules/:courseId" element={<CourseModulesPage />} />
      <Route path="/edit/:moduleId" element={<EditCourseModulePage />} />
    
      
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
