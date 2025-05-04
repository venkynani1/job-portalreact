import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../reusedcomponents/navbar";
import "./dashboardins.css"; // External CSS file

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const totalCourses = useSelector((state) => state.Dashboard.totalCourses);
  const totalEnrolledUsers = useSelector((state) => state.Dashboard.totalEnrolledUsers);

  return (
    <div className="dashboard-wrapper" >
      <Navbar />

      <div className="container-fluid px-5 py-5">
        {/* Welcome Card */}
        <div className="welcome-card shadow-sm p-4 mb-5 text-white rounded">
          <h2 className="mb-1 fw-semibold">Welcome back, {user?.firstName || "Instructor"}!</h2>
          <p className="lead mb-0">Here's a quick overview of your stats.</p>
        </div>

        {/* Stat Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="stat-card shadow-sm p-4 rounded">
              <h6 className="text-muted mb-2">Total Courses</h6>
              <p className="fs-2 fw-bold text-primary mb-0">{totalCourses}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stat-card shadow-sm p-4 rounded">
              <h6 className="text-muted mb-2">Total Users</h6>
              <p className="fs-2 fw-bold text-success mb-0">{totalEnrolledUsers}</p>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="text-end">
          <Link to="/addcourse" className="btn btn-primary btn-lg shadow-sm custom-btn">
            + Add New Course
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer text-center text-muted py-4 mt-auto">
        © 2025 Career Crafter. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
