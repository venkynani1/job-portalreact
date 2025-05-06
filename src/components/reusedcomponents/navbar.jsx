import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"; // External enterprise-grade styling

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(setUser({ user: {} }));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm fixed-top w-100">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        {/* Branding */}
        <Link to="/" className="navbar-brand custom-brand text-primary fw-bold fs-4">
          Career Crafter
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav d-flex flex-row align-items-center gap-3">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link custom-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link custom-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/coursemanagement" className="nav-link custom-link">Courses</Link>
          </li>
          <li className="nav-item">
            <Link to="/enrollments" className="nav-link custom-link">Enrolled Users</Link>
          </li>
         
          <li className="nav-item">
            <Link to="/reviews" className="nav-link custom-link">Reviews</Link>
          </li>
        </ul>

        {/* User Info */}
        <div className="d-flex align-items-center user-info">
          <span className="user-name me-3 text-secondary fw-semibold">
            {user?.firstName || "Loading..."}
          </span>
          <img
            src={`http://localhost:8081/api/instructor/uploads/${user?.profileImagePath}`}
            
            alt="User"
            className="user-image me-3"
          />
          <button onClick={logout} className="btn btn-sm logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
