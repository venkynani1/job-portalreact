import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./addcoursemodule.css"; // External CSS for styling
import Navbar from "../reusedcomponents/navbar"

function AddCourseModulePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !url) {
      setError("Both Title and URL are required.");
      return;
    }

    const module = { title, url };

    axios
      .post(`http://localhost:8081/api/modules/addmodule/${courseId}`, module)
      .then(() => {
        alert("Module added successfully!");
        navigate(`/coursemodules/${courseId}`);
      })
      .catch((error) => {
        console.error("Error adding course module:", error);
        setError("Failed to add module. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="container add-course-module-container mt-5">
        <h2 className="text-center mb-4">Add Course Module</h2>
        <div className="card form-card shadow-sm border-0">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter module title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="form-label">URL</label>
                <input
                  id="url"
                  type="url"
                  className="form-control"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Enter module URL"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 submit-btn">
                Add Module
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCourseModulePage;
