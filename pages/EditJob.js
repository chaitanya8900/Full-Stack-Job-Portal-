import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditJob() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState({
        title: '', company: '', description: '', deadline: ''
    });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then(res => {
                const j = res.data.find(j => j._id === jobId);
                if (j) setJob({
                    ...j,
                    deadline: j.deadline?.slice(0, 10)
                });
            });
    }, [jobId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/jobs/${jobId}`, job, {
                headers: { Authorization: token }
            });
            alert("Job updated successfully!");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.error || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e2e8f0'
    };

    const headerStyle = {
        color: '#1e293b',
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '8px',
        textAlign: 'center'
    };

    const subtitleStyle = {
        color: '#64748b',
        fontSize: '1rem',
        textAlign: 'center',
        marginBottom: '32px'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const fieldGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const labelStyle = {
        color: '#374151',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '120px',
        resize: 'vertical',
        fontFamily: 'inherit',
        lineHeight: '1.5'
    };

    const buttonStyle = {
        backgroundColor: '#059669',
        color: 'white',
        border: 'none',
        padding: '16px 24px',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)',
        marginTop: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    };

    const cancelButtonStyle = {
        backgroundColor: '#6b7280',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        transition: 'background-color 0.2s',
        marginRight: '12px'
    };

    const buttonContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '8px',
        gap: '12px'
    };

    const backLinkStyle = {
        color: '#6b7280',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '24px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'color 0.2s'
    };

    return (
        <div style={containerStyle}>
            <Link
                to="/"
                style={backLinkStyle}
                onMouseEnter={(e) => e.target.style.color = '#374151'}
                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            >
                ← Back to Job Listings
            </Link>

            <div style={cardStyle}>
                <h2 style={headerStyle}>Edit Job Posting</h2>
                <p style={subtitleStyle}>Update the job details below</p>

                <form onSubmit={handleUpdate} style={formStyle}>
                    <div style={fieldGroupStyle}>
                        <label style={labelStyle}>
                            <span>💼</span>
                            Job Title
                        </label>
                        <input
                            type="text"
                            value={job.title}
                            onChange={(e) => setJob({ ...job, title: e.target.value })}
                            required
                            placeholder="e.g. Senior Software Engineer"
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#059669';
                                e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={fieldGroupStyle}>
                        <label style={labelStyle}>
                            <span>🏢</span>
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={job.company}
                            onChange={(e) => setJob({ ...job, company: e.target.value })}
                            required
                            placeholder="e.g. Tech Innovations Inc."
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#059669';
                                e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={fieldGroupStyle}>
                        <label style={labelStyle}>
                            <span>📋</span>
                            Job Description
                        </label>
                        <textarea
                            value={job.description}
                            onChange={(e) => setJob({ ...job, description: e.target.value })}
                            required
                            placeholder="Describe the role, responsibilities, and requirements..."
                            style={textareaStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#059669';
                                e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={fieldGroupStyle}>
                        <label style={labelStyle}>
                            <span>⏰</span>
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            value={job.deadline}
                            onChange={(e) => setJob({ ...job, deadline: e.target.value })}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#059669';
                                e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={buttonContainerStyle}>
                        <Link
                            to="/"
                            style={cancelButtonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            style={buttonStyle}
                            disabled={loading}
                            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#047857')}
                            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#059669')}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <span>✓</span>
                                    Update Job
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default EditJob;