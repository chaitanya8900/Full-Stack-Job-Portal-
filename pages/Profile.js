import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: token }
        }).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setLoading(false);
        }).catch((err) => {
            alert('Failed to load profile');
            setLoading(false);
        });
    }, [token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await axios.put('http://localhost:5000/api/user/profile', { name, email }, {
                headers: { Authorization: token }
            });
            alert("Profile updated");
        } catch (err) {
            alert(err.response?.data?.error || "Update failed");
        } finally {
            setUpdating(false);
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
                    <p style={{ color: '#666', margin: 0 }}>Loading profile...</p>
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
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {/* Header Section */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '16px 16px 0 0',
                    boxShadow: '0 -5px 30px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                    }}>
                        {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h1 style={{
                        color: '#1f2937',
                        fontSize: '1.875rem',
                        fontWeight: '700',
                        margin: '0 0 0.5rem 0'
                    }}>
                        My Profile
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '1rem',
                        margin: '0'
                    }}>
                        Manage your personal information
                    </p>
                </div>

                {/* Form Section */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0 0 16px 16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}>
                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#374151',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter your full name"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    background: '#f9fafb'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                    e.target.style.background = 'white';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.boxShadow = 'none';
                                    e.target.style.background = '#f9fafb';
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#374151',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    background: '#f9fafb'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                    e.target.style.background = 'white';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.boxShadow = 'none';
                                    e.target.style.background = '#f9fafb';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: updating ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: updating ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                transform: updating ? 'none' : 'translateY(0)',
                                boxShadow: updating ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                if (!updating) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!updating) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                        >
                            {updating ? (
                                <>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite',
                                        marginRight: '0.5rem'
                                    }}></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <svg
                                        style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Update Profile
                                </>
                            )}
                        </button>
                    </form>
                </div>
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

export default Profile;