import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../reusedcomponents/navbar';
import './assignment.css';

const AssignmentListPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/assignment?page=${page}&size=${size}`,
        axiosConfig
      );
      setAssignments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/assignment/count`,
        axiosConfig
      );
      if (typeof response.data === 'number') {
        setTotalPages(Math.ceil(response.data / size));
      }
    } catch (error) {
      console.error("Error fetching assignment count:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await axios.delete(`http://localhost:8081/api/assignment/delete/${id}`, axiosConfig);
        fetchAssignments();
        fetchTotalPages();
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  return (
    <div className="assignment-wrapper">
      <Navbar />

      <div className="container-fluid px-5 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">Manage Assignments</h2>
          <button className="btn btn-primary shadow-sm custom-btn" onClick={() => navigate('/assignment/add')}>
            + Add Assignment
          </button>
        </div>

        <div className="card shadow-sm enterprise-card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-header table-bordered tbale-striped" >
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>URL</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.title}</td>
                        <td>{assignment.description}</td>
                        <td>
                          <a href={assignment.url} target="_blank" rel="noreferrer">
                            View
                          </a>
                        </td>
                        <td>{assignment.submissionDeadline}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => navigate(`/assignment/edit/${assignment.id}`)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(assignment.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-3">
                        No assignments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pagination-controls d-flex justify-content-between align-items-center mt-4">
          <button className="btn btn-outline-secondary" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            &larr; Previous
          </button>
          <span className="page-info">Page {page + 1} of {totalPages}</span>
          <button className="btn btn-outline-secondary" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
            Next &rarr;
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default AssignmentListPage;
