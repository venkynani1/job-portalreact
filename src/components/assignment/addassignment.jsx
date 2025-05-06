import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './addassignment.css';
import Navbar from '../reusedcomponents/navbar';

const AddAssignmentPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [submissionDeadline, setSubmissionDeadline] = useState('');
    const navigate = useNavigate();
    const { moduleId } = useParams(); // ⬅️ Fetch moduleId from URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        const assignment = { title, description, url, submissionDeadline };

        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:8081/api/assignment/add/${moduleId}`, assignment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            navigate(`/coursemodules/${moduleId}`);
        })
        .catch((err) => {
            console.error('Error adding assignment:', err);
            alert('Failed to add assignment. Please check the console for details.');
        });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Add Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL (Optional)</label>
                        <input type="url" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Submission Deadline</label>
                        <input type="datetime-local" className="form-control" value={submissionDeadline} onChange={(e) => setSubmissionDeadline(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Assignment</button>
                </form>
            </div>
        </>
    );
};

export default AddAssignmentPage;
