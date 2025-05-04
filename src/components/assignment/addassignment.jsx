import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addassignment.css';
import Navbar from '../reusedcomponents/navbar'; // Adjust path as needed

const AddAssignmentPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [submissionDeadline, setSubmissionDeadline] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const assignment = { title, description, url, submissionDeadline };

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            await axios.post(
                'http://localhost:8081/api/assignment/add',
                assignment,
                config
            );
            navigate('/assignment');
        } catch (err) {
            console.error('Error adding assignment:', err);
            alert('Failed to add assignment. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="card shadow-lg border-0 rounded-3">
                    <div className="card-body">
                        <h3 className="mb-4 text-center text-dark">Add New Assignment</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="url" className="form-label">URL</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="submissionDeadline" className="form-label">Submission Deadline</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="submissionDeadline"
                                    value={submissionDeadline}
                                    onChange={(e) => setSubmissionDeadline(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Add Assignment</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAssignmentPage;
