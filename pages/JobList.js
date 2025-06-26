import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [saved, setSaved] = useState([]);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then((res) => {
                setJobs(res.data);
                setFiltered(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (role === 'student' && token) {
            axios.get("http://localhost:5000/api/user/saved", {
                headers: { Authorization: token }
            }).then(res => setSaved(res.data.map(job => job._id)))
                .catch(() => {
                    setSaved([]); // fallback to prevent error overlay
                });
        }
    }, [jobs, role, token]);

    useEffect(() => {
        let results = jobs.filter(job =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase())
        );

        results.sort((a, b) => {
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFiltered(results);
    }, [search, sortBy, jobs]);

    const toggleSave = async (jobId) => {
        try {
            await axios.post(`http://localhost:5000/api/user/save/${jobId}`, {}, {
                headers: { Authorization: token }
            });

            setSaved(prev =>
                prev.includes(jobId)
                    ? prev.filter(id => id !== jobId)
                    : [...prev, jobId]
            );
        } catch {
            alert("Failed to update saved jobs");
        }
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
                headers: { Authorization: token }
            });
            setJobs(jobs.filter(job => job._id !== jobId));
            alert("Job deleted");
        } catch {
            alert("Failed to delete job");
        }
    };

    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
    };

    const headerStyle = {
        color: '#1e293b',
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '2rem',
        textAlign: 'center'
    };

    const searchBarStyle = {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        marginBottom: '16px',
        outline: 'none',
        transition: 'border-color 0.2s',
        backgroundColor: '#ffffff'
    };

    const selectStyle = {
        padding: '10px 16px',
        fontSize: '14px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        marginBottom: '24px',
        backgroundColor: '#ffffff',
        outline: 'none',
        cursor: 'pointer'
    };

    const jobCardStyle = {
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
    };


    const jobHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
    };

    const jobTitleStyle = {
        color: '#2563eb',
        fontSize: '1.25rem',
        fontWeight: '600',
        textDecoration: 'none',
        margin: '0'
    };

    const saveButtonStyle = {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#fbbf24',
        transition: 'transform 0.2s',
        padding: '4px'
    };

    const companyStyle = {
        color: '#64748b',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px'
    };

    const descriptionStyle = {
        color: '#475569',
        fontSize: '14px',
        lineHeight: '1.5',
        marginBottom: '12px'
    };

    const deadlineStyle = {
        color: '#dc2626',
        fontSize: '13px',
        fontWeight: '500',
        marginBottom: '16px'
    };

    const buttonStyle = {
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background-color 0.2s'
    };

    const editButtonStyle = {
        backgroundColor: '#059669',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        marginRight: '8px',
        transition: 'background-color 0.2s'
    };

    const deleteButtonStyle = {
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    };

    const noJobsStyle = {
        textAlign: 'center',
        color: '#64748b',
        fontSize: '18px',
        padding: '40px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Find Your Dream Job</h2>

            <input
                type="text"
                placeholder="Search by job title or company name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={searchBarStyle}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={selectStyle}
            >
                <option value="newest">Sort by Newest Deadline</option>
                <option value="oldest">Sort by Oldest Deadline</option>
            </select>

            {filtered.length === 0 && (
                <div style={noJobsStyle}>
                    <p>No jobs found matching your criteria.</p>
                </div>
            )}

            {filtered.map((job) => (
                <div
                    key={job._id}
                    style={jobCardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <div style={jobHeaderStyle}>
                        <Link to={`/job/${job._id}`} style={jobTitleStyle}>
                            <h3 style={{ margin: 0 }}>{job.title}</h3>
                        </Link>
                        {role === 'student' && (
                            <button
                                onClick={() => toggleSave(job._id)}
                                style={saveButtonStyle}
                                title={saved.includes(job._id) ? "Remove from saved" : "Save job"}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                {saved.includes(job._id) ? "★" : "☆"}
                            </button>
                        )}
                    </div>

                    <p style={companyStyle}>
                        <strong>📍 {job.company}</strong>
                    </p>

                    <p style={descriptionStyle}>
                        {job.description.length > 150
                            ? job.description.substring(0, 150) + "..."
                            : job.description
                        }
                    </p>

                    <p style={deadlineStyle}>
                        ⏰ Deadline: {job.deadline?.slice(0, 10)}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {role === 'student' && (
                            <Link to={`/apply/${job._id}`} style={{ textDecoration: 'none' }}>
                                <button
                                    style={buttonStyle}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                                >
                                    Apply Now
                                </button>
                            </Link>
                        )}

                        {role === 'admin' && (
                            <div>
                                <button
                                    onClick={() => navigate(`/admin/edit-job/${job._id}`)}
                                    style={editButtonStyle}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#059669'}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    style={deleteButtonStyle}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
console.log("Loaded JobList page");


export default JobList;