import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../reusedcomponents/navbar"

function AddCoursePage() {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: "",
        description: "",
        category: "",
        aboutTheCourse: "",
        difficultyLevel: "",
    });

    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value });
    };

    const validateForm = () => {
        if (!course.title || !course.description || !course.category || !course.aboutTheCourse || !course.difficultyLevel) {
            return "All fields are required!";
        }
        return null;
    };

    const handleSubmit = () => {
        const formError = validateForm();
        if (formError) {
            setError(formError);
            return;
        }

        setError("");

        const courseData = {
            ...course,
            createdAt: new Date().toISOString(),
        };

        axios
            .post(
                `http://localhost:8081/api/course/add`,
                courseData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((response) => {
                alert("Course added successfully!");
                navigate("/coursemanagement");
            })
            .catch((error) => {
                console.error("Error adding course:", error);
                setError("Error adding course. Please try again.");
            });
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center text-dark mb-4">Add New Course</h2>
                <div className="card shadow-lg border-0 rounded-3">
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={course.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={course.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <textarea
                                    className="form-control"
                                    name="category"
                                    value={course.category}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">About the Course</label>
                                <textarea
                                    className="form-control"
                                    name="aboutTheCourse"
                                    value={course.aboutTheCourse}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Difficulty Level</label>
                                <select
                                    className="form-select"
                                    name="difficultyLevel"
                                    value={course.difficultyLevel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Difficulty Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={handleSubmit}
                            >
                                Add Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCoursePage;
