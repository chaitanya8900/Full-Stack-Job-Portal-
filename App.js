import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import Apply from './pages/Apply';
import AdminPostJob from './pages/AdminPostJob';
import Navbar from './components/Navbar';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import JobDetail from './pages/JobDetail';
import EditJob from './pages/EditJob';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/admin/post-job" element={<AdminPostJob />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:jobId" element={<JobDetail />} />
        <Route path="/admin/edit-job/:jobId" element={<EditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
