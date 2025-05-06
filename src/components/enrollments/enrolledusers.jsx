import React, { useState, useEffect } from "react";
import axios from "axios";
import InstructorNavbar from "../reusedcomponents/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./enrolledusers.css";

function EnrolledUsersPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEnrollments();
  }, [currentPage]);
  const fetchEnrollments = () => {
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:8081/api/enrollments/getAll?page=${currentPage}&size=11`;
  
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.content) {
          setEnrollments(response.data.content); // Enrollment content
          setTotalPages(response.data.totalPages); // Total pages for pagination
        }
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
      });
  };
  
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleIssueCertificate = (enrollmentId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://localhost:8081/api/certificates/issue/${enrollmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Certificate issued successfully!");
        fetchEnrollments(); // Refresh to update the issued flag
      })
      .catch((error) => {
        console.error("Error issuing certificate:", error);

          alert("Certificate already issued.");
        
      });
  };

  return (
    <div className="enrolled-users-wrapper">
      <InstructorNavbar />
      <div className="container enrolled-users-container">
        <div className="card shadow-sm enrolled-users-card">
          <div className="card-header bg-white border-0">
            <h2 className="section-title">
              <i className="bi bi-people-fill me-2"></i>Enrolled Users
            </h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Job Seeker</th>
                    <th>Course</th>
                    <th>Completed</th>
                    <th>Enrolled Date</th>
                    <th>Completion Date</th>
                    <th>Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.length > 0 ? (
                    enrollments.map((enrollment) => (
                      <tr key={enrollment.id}>
                        <td>{enrollment.jobSeeker?.name || "N/A"}</td>
                        <td>{enrollment.course?.title || "N/A"}</td>
                        <td>
                          <span
                            className={`badge ${
                              enrollment.completed ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {enrollment.completed ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          {enrollment.enrolledDate
                            ? new Date(enrollment.enrolledDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          {enrollment.completionDate
                            ? new Date(enrollment.completionDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          {enrollment.completed ? (
                            enrollment.certificateIssued ? (
                              <span className="text-success">Already Issued</span>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleIssueCertificate(enrollment.id)}
                              >
                                Issue
                              </button>
                            )
                          ) : (
                            <span className="text-muted">Not completed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No enrollments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <nav className="pagination-nav">
              <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledUsersPage;
