import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './editassignment.css';
import Navbar from '../reusedcomponents/navbar';

const EditAssignmentPage = () => {
    const [assignment, setAssignment] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [submissionDeadline, setSubmissionDeadline] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/assignment/${id}`)
            .then((response) => {
                setAssignment(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setUrl(response.data.url);
                setSubmissionDeadline(response.data.submissionDeadline);
            })
            .catch((error) => {
                console.error('Error fetching assignment:', error);
                alert('Error fetching assignment details');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedAssignment = {
            title,
            description,
            url,
            submissionDeadline,
        };

        axios
            .put(`http://localhost:8081/api/assignment/update/${id}`, updatedAssignment)
            .then(() => {
                navigate(`/coursemodules`);
            })
            .catch((error) => {
                console.error('Error updating assignment:', error);
                alert('Failed to update assignment');
            });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Edit Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL</label>
                        <input
                            type="url"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Submission Deadline</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={submissionDeadline}
                            onChange={(e) => setSubmissionDeadline(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Assignment
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditAssignmentPage;
