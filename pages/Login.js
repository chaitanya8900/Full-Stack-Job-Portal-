import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            // Save token and role
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('userId', res.data.user.id);

            alert('Login successful');

            // Redirect based on role
            if (res.data.user.role === 'admin') {
                navigate('/admin/post-job');
            } else {
                navigate('/');
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    const handleSkipSignIn = () => {
        localStorage.setItem('token', 'guest_token');
        localStorage.setItem('role', 'student');
        localStorage.setItem('guest', 'true');
        navigate('/');
    };


    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
                margin: '20px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        color: '#333',
                        fontSize: '2rem',
                        fontWeight: '700',
                        margin: '0 0 0.5rem 0'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '1rem',
                        margin: '0'
                    }}>
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#374151',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#374151',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            transform: loading ? 'none' : 'translateY(0)',
                            boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <button
                        onClick={handleSkipSignIn}
                        style={{
                            marginTop: '12px',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f3f4f6',
                            color: '#333',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                        onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
                    >
                        Skip Sign In
                    </button>

                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #e5e7eb'
                }}>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        margin: '0'
                    }}>
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            style={{
                                color: '#667eea',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = 'none';
                            }}
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;