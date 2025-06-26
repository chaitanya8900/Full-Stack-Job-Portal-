import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyApplications() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/apply/my-applications', {
            headers: { Authorization: token }
        })
            .then((res) => {
                setApps(res.data);
                setLoading(false);
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Failed to fetch');
                setLoading(false);
            });
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return '#f59e0b';
            case 'approved':
            case 'accepted':
                return '#10b981';
            case 'rejected':
                return '#ef4444';
            default:
                return '#6b7280';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return (
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                );
            case 'approved':
            case 'accepted':
                return (
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                );
            case 'rejected':
                return (
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                );
            default:
                return (
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                );
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}>
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem auto'
                    }}></div>
                    <p style={{ color: '#666', margin: 0 }}>Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '2rem 1rem',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {/* Header Section */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        color: 'white'
                    }}>
                        <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10A8,8 0 0,0 14,2M14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4A6,6 0 0,1 20,10A6,6 0 0,1 14,16Z" />
                        </svg>
                    </div>
                    <h1 style={{
                        color: '#1f2937',
                        fontSize: '2rem',
                        fontWeight: '700',
                        margin: '0 0 0.5rem 0'
                    }}>
                        My Applications
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '1rem',
                        margin: '0 0 0.5rem 0'
                    }}>
                        Track your job application status
                    </p>
                    <div style={{
                        display: 'inline-block',
                        background: '#f3f4f6',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        color: '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                    }}>
                        {apps.length} Application{apps.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Applications List */}
                {apps.length === 0 ? (
                    <div style={{
                        background: 'white',
                        padding: '3rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem auto',
                            color: '#9ca3af'
                        }}>
                            <svg style={{ width: '32px', height: '32px' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10A8,8 0 0,0 14,2M14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4A6,6 0 0,1 20,10A6,6 0 0,1 14,16Z" />
                            </svg>
                        </div>
                        <h3 style={{
                            color: '#374151',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            margin: '0 0 0.5rem 0'
                        }}>
                            No Applications Yet
                        </h3>
                        <p style={{
                            color: '#6b7280',
                            fontSize: '1rem',
                            margin: '0'
                        }}>
                            Start applying to jobs to see your applications here.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {apps.map((app) => (
                            <div
                                key={app._id}
                                style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                    padding: '1.5rem',
                                    transition: 'all 0.2s ease',
                                    border: '1px solid #f3f4f6'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            color: '#1f2937',
                                            fontSize: '1.25rem',
                                            fontWeight: '600',
                                            margin: '0 0 0.5rem 0',
                                            lineHeight: '1.3'
                                        }}>
                                            {app.jobId.title}
                                        </h3>
                                        <p style={{
                                            color: '#667eea',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            margin: '0 0 0.75rem 0'
                                        }}>
                                            {app.jobId.company}
                                        </p>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: `${getStatusColor(app.status)}15`,
                                        color: getStatusColor(app.status),
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        textTransform: 'capitalize'
                                    }}>
                                        {getStatusIcon(app.status)}
                                        {app.status}
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid #f3f4f6'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#6b7280',
                                        fontSize: '0.875rem'
                                    }}>
                                        <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                                        </svg>
                                        Applied on {new Date(app.appliedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <a
                                        href={`http://localhost:5000/${app.resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#667eea',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid #667eea',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = '#667eea';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'transparent';
                                            e.target.style.color = '#667eea';
                                        }}
                                    >
                                        <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                        </svg>
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default MyApplications;