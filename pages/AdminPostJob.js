import React, { useState } from 'react';
import axios from 'axios';

function AdminPostJob() {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const handlePostJob = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                'http://localhost:5000/api/jobs',
                { title, company, description, deadline },
                { headers: { Authorization: token } }
            );

            alert('Job posted successfully!');
            setTitle('');
            setCompany('');
            setDescription('');
            setDeadline('');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to post job');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    padding: '50px 40px',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <div style={{
                        fontSize: '48px',
                        marginBottom: '15px'
                    }}>💼</div>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        margin: '0 0 10px 0'
                    }}>Post New Job</h1>
                    <p style={{
                        fontSize: '18px',
                        opacity: 0.9,
                        margin: 0
                    }}>Create a new job opportunity for candidates</p>
                </div>

                {/* Form */}
                <div style={{ padding: '40px' }}>
                    <form onSubmit={handlePostJob}>
                        {/* Job Title */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: '20px',
                                    marginRight: '8px'
                                }}>🎯</span>
                                Job Title *
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Senior Software Engineer"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    fontSize: '16px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#fafafa'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.backgroundColor = '#fafafa';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Company */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: '20px',
                                    marginRight: '8px'
                                }}>🏢</span>
                                Company Name *
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. TechCorp Inc."
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    fontSize: '16px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#fafafa'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.backgroundColor = '#fafafa';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Job Description */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: '20px',
                                    marginRight: '8px'
                                }}>📝</span>
                                Job Description *
                            </label>
                            <textarea
                                placeholder="Describe the role, responsibilities, requirements, and qualifications..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={6}
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    fontSize: '16px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#fafafa',
                                    resize: 'vertical',
                                    fontFamily: 'Arial, sans-serif',
                                    lineHeight: '1.6'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.backgroundColor = '#fafafa';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Application Deadline */}
                        <div style={{ marginBottom: '40px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: '20px',
                                    marginRight: '8px'
                                }}>📅</span>
                                Application Deadline *
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    fontSize: '16px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#fafafa'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.backgroundColor = '#fafafa';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '18px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '18px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
                            }}
                        >
                            📤 Post Job
                        </button>
                    </form>

                    {/* Additional Info */}
                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: 0,
                            textAlign: 'center',
                            lineHeight: '1.6'
                        }}>
                            <strong>Note:</strong> Once posted, the job will be visible to all registered candidates.
                            Make sure all information is accurate before submitting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPostJob;