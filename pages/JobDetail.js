import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function JobDetail() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then(res => {
                const found = res.data.find(j => j._id === jobId);
                setJob(found);
            });
    }, [jobId]);

    const containerStyle = {
        maxWidth: '800px',
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

    const logoStyle = {
        maxWidth: '150px',
        height: 'auto',
        marginBottom: '24px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
    };

    const titleStyle = {
        color: '#1e293b',
        fontSize: '2.25rem',
        fontWeight: '700',
        marginBottom: '8px',
        lineHeight: '1.2'
    };

    const companyStyle = {
        color: '#2563eb',
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const sectionStyle = {
        marginBottom: '24px'
    };

    const labelStyle = {
        color: '#374151',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const contentStyle = {
        color: '#4b5563',
        fontSize: '1rem',
        lineHeight: '1.6',
        backgroundColor: '#f9fafb',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
    };

    const deadlineStyle = {
        color: '#dc2626',
        fontSize: '1rem',
        fontWeight: '600',
        backgroundColor: '#fef2f2',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #fecaca',
        display: 'inline-block'
    };

    const skillsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '8px'
    };

    const skillTagStyle = {
        backgroundColor: '#dbeafe',
        color: '#1d4ed8',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        border: '1px solid #bfdbfe'
    };

    const buttonStyle = {
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        padding: '16px 32px',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
        marginTop: '24px'
    };

    const loadingStyle = {
        textAlign: 'center',
        color: '#64748b',
        fontSize: '1.25rem',
        padding: '60px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
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

    if (!job) {
        return (
            <div style={containerStyle}>
                <div style={loadingStyle}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #e5e7eb',
                        borderTop: '4px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p>Loading job details...</p>
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
                {job.logoUrl && (
                    <img src={job.logoUrl} alt="Company logo" style={logoStyle} />
                )}

                <h1 style={titleStyle}>{job.title}</h1>

                <div style={companyStyle}>
                    <span>🏢</span>
                    {job.company}
                </div>

                <div style={sectionStyle}>
                    <div style={labelStyle}>
                        <span>📋</span>
                        Job Description
                    </div>
                    <div style={contentStyle}>
                        {job.description}
                    </div>
                </div>

                <div style={sectionStyle}>
                    <div style={labelStyle}>
                        <span>⏰</span>
                        Application Deadline
                    </div>
                    <div style={deadlineStyle}>
                        {new Date(job.deadline).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                {job.skills?.length > 0 && (
                    <div style={sectionStyle}>
                        <div style={labelStyle}>
                            <span>🛠️</span>
                            Required Skills
                        </div>
                        <div style={skillsContainerStyle}>
                            {job.skills.map((skill, index) => (
                                <span key={index} style={skillTagStyle}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {localStorage.getItem('role') === 'student' && (
                    <Link to={`/apply/${job._id}`} style={{ textDecoration: 'none' }}>
                        <button
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#1d4ed8';
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#2563eb';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
                            }}
                        >
                            Apply for this Position →
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default JobDetail;