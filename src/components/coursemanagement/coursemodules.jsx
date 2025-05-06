import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./coursemodules.css";
import Navbar from "../reusedcomponents/navbar";

function CourseModules() {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [modules, setModules] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const fetchModules = () => {
    axios
      .get(`http://localhost:8081/api/modules/course/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setModules(res.data))
      .catch((err) => console.error("Failed to fetch modules:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || files.length === 0) {
      alert("Please enter a title and select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    for (let file of files) {
      formData.append("files", file);
    }

    axios
      .post(`http://localhost:8081/api/modules/addmodule/${courseId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setTitle("");
        setFiles([]);
        fileInputRef.current.value = null;
        fetchModules();
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Failed to upload module. Please check the console.");
      });
  };

  const handleDelete = (moduleId) => {
    axios
      .delete(`http://localhost:8081/api/modules/delete/${moduleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => fetchModules())
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete the module. Please check the console.");
      });
  };

  const handleEdit = (moduleId) => {
    navigate(`/edit/${moduleId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container course-modules-wrapper mt-5">
        <h2 className="page-header">Manage Course Modules</h2>
        <form onSubmit={handleSubmit} className="module-form card shadow-sm p-4 mb-5">
          <div className="mb-3">
            <label className="form-label">Module Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter module title"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Files</label>
            <input
              type="file"
              className="form-control"
              multiple
              ref={fileInputRef}
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Add Module
          </button>
        </form>

        <h3>Existing Modules</h3>
        {modules.length === 0 ? (
          <p className="text-muted">No modules added yet.</p>
        ) : (
          modules.map((mod) => (
            <div className="card module-card shadow-sm mb-3" key={mod.id}>
              <div className="card-body">
                <h5 className="card-title">{mod.title}</h5>
                {mod.url ? (
                  <ul className="file-list">
                    {mod.url.split(",").map((file, idx) => (
                      <li key={idx}>
                        <a href={file} target="_blank" rel="noreferrer">
                          {decodeURIComponent(file.split("/").pop())}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No files attached.</p>
                )}
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(mod.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(mod.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/addassignment/${mod.id}`)}
                  >
                    Add assignment
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/editassignment/${mod.id}`)}  
                  >
                    Edit Assignment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CourseModules;
