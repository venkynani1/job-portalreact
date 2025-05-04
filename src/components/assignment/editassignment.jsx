import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './editassignment.css';
import Navbar from "../reusedcomponents/navbar"
const EditAssignmentPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/assignment/get/${id}`,
          config
        );
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setUrl(data.url);
        setSubmissionDeadline(data.submissionDeadline);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        alert("Failed to fetch assignment. Please check your access token or try again later.");
      }
    };

    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAssignment = {
      title,
      description,
      url,
      submissionDeadline,
    };

    try {
      await axios.put(
        `http://localhost:8081/api/assignment/update/${id}`,
        updatedAssignment,
        config
      );
      navigate("/assignment");
    } catch (error) {
      console.error("Error updating assignment:", error);
      alert("Failed to update assignment. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-body">
            <h3 className="mb-4 text-center text-dark">Edit Assignment</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="url" className="form-label">URL</label>
                <input
                  type="url"
                  id="url"
                  className="form-control"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="submissionDeadline" className="form-label">Submission Deadline</label>
                <input
                  type="date"
                  id="submissionDeadline"
                  className="form-control"
                  value={submissionDeadline}
                  onChange={(e) => setSubmissionDeadline(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Update Assignment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAssignmentPage;
