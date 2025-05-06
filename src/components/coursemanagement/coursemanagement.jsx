import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../reusedcomponents/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./coursemanagementpage.css";

function CourseManagementPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = () => {
    axios
      .get(
        `http://localhost:8081/api/course/getAll?page=${
          currentPage - 1
        }&size=3`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCourses(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCourse = (courseId) => {
    axios
      .delete(`http://localhost:8081/api/course/delete/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => fetchCourses())
      .catch((err) => console.log(err));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length >= 2) {
      axios
        .get(`http://localhost:8081/api/course/courses/search?title=${query}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setFilteredCourses(res.data);
          } else {
            setFilteredCourses([]);
    }
  })
  .catch((err) => console.log(err));
    }
  };

  const handleSearchSelect = (courseTitle) => {
    setSearchTerm(courseTitle);
    setFilteredCourses([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="bg-white shadow-sm py-3 internal-navbar">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <div className="search-container d-flex align-items-center flex-grow-1">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search course by title..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {filteredCourses.length > 0 && (
              <ul className="dropdown-menu show course-dropdown">
                {filteredCourses.map((course) => (
                  <li
                    key={course.id}
                    className="dropdown-item"
                    onClick={() => handleSearchSelect(course.title)}
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="btn btn-primary add-course-btn"
            onClick={() => navigate("/addcourse")}
          >
            + Add New Course
          </button>
        </div>
      </div>

      <div className="container mt-4 container-custom">
        <h2 className="course-header">Course Management</h2>

        <div className="table-responsive">
          <table className="table table-hover table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>About</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id}>
                    <td
                      className="text-primary fw-semibold course-title-link"
                      onClick={() => navigate(`/coursemodules/${course.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {course.title}
                    </td>
                    <td>{course.description}</td>
                    <td>{course.aboutTheCourse}</td>
                    <td>{course.category}</td>
                    <td>{course.difficultyLevel}</td>
                    <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => navigate(`/editcourse/${course.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No courses available.
                  </td>
                </tr>
              )}  
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center my-4">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseManagementPage;
