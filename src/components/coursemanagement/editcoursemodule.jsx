import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editcoursemodule.css"; // Import external CSS file
import Navbar from "../reusedcomponents/navbar"

function EditCourseModulePage() {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [module, setModule] = useState({ title: "", url: "" });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/modules/${moduleId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => setModule(response.data))
            .catch((error) => console.error("Error fetching module details:", error));
    }, [moduleId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModule((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        setFiles(event.target.files); // update files state with selected files
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData to send the request as multipart/form-data
        const formData = new FormData();
        formData.append("title", module.title);
        formData.append("url", module.url); // optional if you're updating URL separately
        Array.from(files).forEach(file => {
            formData.append("files", file);
        });

        axios.put(`http://localhost:8081/api/modules/update/${moduleId}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data", // important for file uploads
            },
        })
            .then(() => {
                alert("Module updated successfully!");
                navigate(`/coursemodules/${module.course.id}`);
            })
            .catch((error) => console.error("Error updating course module:", error));
    };

    return (
        <>
            <Navbar /> {/* Add the Navbar here */}
            <div className="container mt-4">
                <h1 className="page-header">Edit Course Module</h1>
                <div className="card form-card mt-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={module.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url" className="form-label">File URLs (comma-separated)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="url"
                                    name="url"
                                    value={module.url}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="files" className="form-label">Upload Files</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="files"
                                    name="files"
                                    onChange={handleFileChange}
                                    multiple // allow multiple file uploads
                                />
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCourseModulePage;
