import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const isGuest = localStorage.getItem('guest') === 'true';

    const handleLogout = () => {
        localStorage.clear();
        alert('Logged out!');
        navigate('/login');
    };

    return (
        <nav style={navStyle}>
            <div style={leftSection}>
                {token ? (
                    <>
                        <Link style={linkStyle} to="/">Jobs</Link>
                        {role === 'admin' && (
                            <>
                                <Link style={linkStyle} to="/admin/post-job">Post Job</Link>
                                <Link style={linkStyle} to="/admin/dashboard">Dashboard</Link>
                            </>
                        )}
                        {(role === 'student' || isGuest) && (
                            <>
                                <Link style={linkStyle} to="/my-applications">My Applications</Link>
                                <Link style={linkStyle} to="/profile">Profile</Link>
                            </>
                        )}

                    </>
                ) : (
                    <>
                        <Link style={linkStyle} to="/login">Login</Link>
                        <Link style={linkStyle} to="/register">Register</Link>
                    </>
                )}
            </div>

            {token && (
                <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
}

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 30px',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    color: 'white',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: '1rem'
};

const leftSection = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    transition: 'background 0.3s',
    fontWeight: '500'
};

const logoutButtonStyle = {
    background: '#fff',
    color: '#333',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: '0.3s'
};

export default Navbar;
