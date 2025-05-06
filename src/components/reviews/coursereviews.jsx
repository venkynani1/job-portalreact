import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../reusedcomponents/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./coursereviews.css";

function CourseReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8081/api/reviews/getAll?page=${
            currentPage - 1
          }&size=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Since the response contains a paginated Page<CourseReview>, update accordingly
        setReviews(response.data.content || []); // Reviews content
        setTotalPages(response.data.totalPages || 1); // Total pages
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="course-reviews-wrapper">
      <Navbar />

      <div className="container course-reviews-container">
        <div className="card shadow-sm reviews-card">
          <div className="card-header bg-white border-0">
            <h2 className="section-title">
              <i className="bi bi-chat-left-dots me-2"></i>Course Reviews
            </h2>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-striped table-bordered mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Job Seeker</th>
                    <th>Course</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Date Posted</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <tr key={review.id}>
                        <td>{review.jobSeeker?.name || "N/A"}</td>
                        <td>{review.course?.title || "N/A"}</td>
                        <td>
                          <span className="badge bg-primary">
                            {review.rating}
                          </span>
                        </td>
                        <td>{review.reviewText || "N/A"}</td>
                        <td>
                          {review.datePosted
                            ? new Date(review.datePosted).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <nav className="pagination-nav">
              <ul className="pagination justify-content-center mt-4">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
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
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
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

export default CourseReviewsPage;
