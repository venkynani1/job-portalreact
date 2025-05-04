import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editcourse.css"; // Importing external CSS for styling
import Navbar from "../reusedcomponents/navbar"

function EditCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [aboutTheCourse, setAboutTheCourse] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/course/get/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const course = response.data;
        setTitle(course.title);
        setDescription(course.description);
        setCategory(course.category);
        setAboutTheCourse(course.aboutTheCourse);
        setDifficultyLevel(course.difficultyLevel);
        setIsDataFetched(true);
      })
      .catch(() => {
        alert("Failed to load course details.");
      });
  }, [courseId]);

  const handleSubmit = () => {
    if (
      !title ||
      !description ||
      !category ||
      !aboutTheCourse ||
      !difficultyLevel
    ) {
      alert("All fields are required!");
      return;
    }

    const updatedCourse = {
      title,
      description,
      category,
      aboutTheCourse,
      difficultyLevel,
    };

    axios
      .put(
        `http://localhost:8081/api/course/update/${courseId}`,
        updatedCourse,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        alert("Course updated successfully!");
        navigate("/coursemanagement");
      })
      .catch(() => {
        alert("Error updating course. Please try again.");
      });
  };

  if (!isDataFetched) {
    return (
      <div className="container mt-4">
        <h1>Loading course details...</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar /> {/* Add the Navbar here */}
      <div className="container mt-4">
        <h1 className="page-header">Edit Course</h1>
        <div className="card form-card mt-4">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category:</label>
                <input
                  id="category"
                  type="text"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="aboutTheCourse" className="form-label">About the Course:</label>
                <textarea
                  id="aboutTheCourse"
                  className="form-control"
                  value={aboutTheCourse}
                  onChange={(e) => setAboutTheCourse(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="difficultyLevel" className="form-label">Difficulty Level:</label>
                <select
                  id="difficultyLevel"
                  className="form-select"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                >
                  <option value="">Select Difficulty Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary submit-btn"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCoursePage;
