import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Apply() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);
    const isGuest = localStorage.getItem("guest") === "true";
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/jobs`)
            .then((res) => {
                const found = res.data.find((j) => j._id === jobId);
                setJob(found);
            })
            .catch((err) => console.error(err));
    }, [jobId]);

    const handleApply = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (isGuest) {
            if (!guestName || !guestEmail) {
                alert("Please enter your name and email to apply.");
                return;
            }
            formData.append("guestName", guestName);
            formData.append("guestEmail", guestEmail);
        } else {
            formData.append("resume", resume);
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/apply/${jobId}`, formData, {
                headers: {
                    ...(token ? { Authorization: token } : {}),
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Applied successfully!');
        } catch (err) {
            alert(err.response?.data?.error || 'Application failed');
        }
    };

    if (!job) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8fafc',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #e5e7eb',
                        borderTop: '4px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '16px',
                        margin: 0
                    }}>Loading job details...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '40px 30px',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        margin: '0 0 10px 0'
                    }}>Apply for Position</h1>
                    <p style={{
                        fontSize: '16px',
                        opacity: 0.9,
                        margin: 0
                    }}>Submit your application below</p>
                </div>

                {/* Job Details */}
                <div style={{ padding: '30px' }}>
                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '25px',
                        borderRadius: '12px',
                        marginBottom: '30px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            margin: '0 0 20px 0',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#10b981',
                                borderRadius: '50%',
                                marginRight: '12px'
                            }}></span>
                            {job.title}
                        </h2>

                        <div style={{ marginBottom: '15px' }}>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>Company:</span>
                            <p style={{
                                fontSize: '16px',
                                color: '#6b7280',
                                margin: '5px 0 0 0'
                            }}>{job.company}</p>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>Description:</span>
                            <p style={{
                                fontSize: '16px',
                                color: '#6b7280',
                                margin: '5px 0 0 0',
                                lineHeight: '1.6'
                            }}>{job.description}</p>
                        </div>

                        <div>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>Application Deadline:</span>
                            <p style={{
                                fontSize: '16px',
                                color: '#dc2626',
                                margin: '5px 0 0 0',
                                fontWeight: '600'
                            }}>{job.deadline?.slice(0, 10)}</p>
                        </div>
                    </div>
                    {isGuest && (
                        <>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    required
                                    placeholder="Enter your full name"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={guestEmail}
                                    onChange={(e) => setGuestEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {/* Application Form */}
                    <form onSubmit={handleApply}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                Upload Resume *
                            </label>
                            <div style={{
                                position: 'relative',
                                border: '2px dashed #d1d5db',
                                borderRadius: '12px',
                                padding: '40px 20px',
                                textAlign: 'center',
                                backgroundColor: '#fafafa',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                    e.currentTarget.style.backgroundColor = '#eff6ff';
                                }}
                                onDragLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#d1d5db';
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    required
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer'
                                    }}
                                />
                                <div style={{
                                    fontSize: '48px',
                                    color: '#9ca3af',
                                    marginBottom: '10px'
                                }}>📄</div>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#6b7280',
                                    margin: '0 0 5px 0'
                                }}>
                                    {resume ? resume.name : 'Click or drag to upload your resume'}
                                </p>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#9ca3af',
                                    margin: 0
                                }}>PDF, DOC, DOCX files only</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '18px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#2563eb';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 12px rgba(59, 130, 246, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#3b82f6';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.3)';
                            }}
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Apply;