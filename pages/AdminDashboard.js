import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

function AdminDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/admin/dashboard", {
            headers: { Authorization: token }
        })
            .then((res) => setData(res.data))
            .catch((err) => alert(err.response?.data?.error || "Dashboard load failed"));
    }, []);

    if (!data) {
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
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: '2rem 1rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{
                        margin: 0,
                        color: '#2d3748',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Admin Dashboard
                    </h1>
                    <p style={{
                        margin: '0.5rem 0 0',
                        color: '#718096',
                        fontSize: '1.1rem'
                    }}>
                        Monitor and manage your job portal
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {/* Total Jobs */}
                    <div style={cardStyle("#4facfe", "#00f2fe")}>
                        <Stat title="Total Jobs" value={data.totalJobs} icon="💼" />
                    </div>
                    {/* Total Applications */}
                    <div style={cardStyle("#fa709a", "#fee140")}>
                        <Stat title="Total Applications" value={data.totalApplications} icon="📋" />
                    </div>
                </div>

                {/* Recent Applications */}
                <Section title="🕒 Recent Applications">
                    <div style={{ display: 'grid', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
                        {data.recentApplications.map(app => (
                            <div key={app._id} style={recentAppStyle}>
                                <div style={recentAppInnerStyle}>
                                    <div>
                                        <p style={labelStyle}>Job</p>
                                        <p style={valueStyle}>{app.jobId?.title || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p style={labelStyle}>Student</p>
                                        <p style={valueStyle}>{app.studentId?.name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p style={labelStyle}>Applied</p>
                                        <p style={valueStyle}>{new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Job Stats */}
                <Section title="📊 Job-wise Application Counts">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        {data.jobStats.map((job, index) => (
                            <div key={job.jobTitle} style={jobStatStyle(index)}>
                                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{job.jobTitle}</p>
                                <div style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '20px',
                                    padding: '0.5rem 1rem',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}>
                                    {job.applications}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
                    {/* Bar Chart */}
                    <ChartBox title="📊 Applications per Job">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.jobStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="jobTitle" tick={{ fontSize: 12, fill: '#718096' }} />
                                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#718096' }} />
                                <Tooltip />
                                <Bar dataKey="applications" fill="#667eea" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartBox>

                    {/* Pie Chart */}
                    <ChartBox title="🥧 Applications Distribution">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.jobStats}
                                    dataKey="applications"
                                    nameKey="jobTitle"
                                    cx="50%" cy="50%"
                                    outerRadius={100}
                                    label={({ value, percent }) => `${value} (${(percent * 100).toFixed(0)}%)`}
                                    labelLine={false}
                                >
                                    {data.jobStats.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'][index % 5]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartBox>
                </div>

                <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </div>
    );
}

// Utility Components and Styles
const Stat = ({ title, value, icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>{title}</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '3rem', fontWeight: 'bold' }}>{value}</p>
        </div>
        <div style={{
            width: '60px', height: '60px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        }}>{icon}</div>
    </div>
);

const cardStyle = (start, end) => ({
    background: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`,
    borderRadius: '16px',
    padding: '2rem',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease',
    onMouseEnter: e => (e.currentTarget.style.transform = 'translateY(-5px)'),
    onMouseLeave: e => (e.currentTarget.style.transform = 'translateY(0)')
});

const Section = ({ title, children }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{
            margin: '0 0 1.5rem',
            color: '#2d3748',
            fontSize: '1.8rem',
            fontWeight: '600'
        }}>{title}</h2>
        {children}
    </div>
);

const ChartBox = ({ title, children }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    }}>
        <h3 style={{
            margin: '0 0 1.5rem',
            color: '#2d3748',
            fontSize: '1.5rem',
            fontWeight: '600'
        }}>{title}</h3>
        {children}
    </div>
);

const recentAppStyle = {
    background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0'
};

const recentAppInnerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    alignItems: 'center'
};

const labelStyle = {
    margin: 0,
    fontSize: '0.9rem',
    color: '#718096',
    fontWeight: '500'
};

const valueStyle = {
    margin: '0.25rem 0 0',
    fontSize: '1.1rem',
    color: '#2d3748',
    fontWeight: '600'
};

const jobStatStyle = (index) => ({
    background: `linear-gradient(135deg, ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'][index % 5]} 0%, ${['#764ba2', '#667eea', '#f5576c', '#f093fb', '#00f2fe'][index % 5]} 100%)`,
    borderRadius: '12px',
    padding: '1.5rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export default AdminDashboard;
