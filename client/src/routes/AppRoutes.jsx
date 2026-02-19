import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Page Imports
import Home from '../pages/Home';
import About from '../pages/About';
import Blogs from '../pages/Blogs';
import Dashboard from '../pages/Dashboard';
import Course from '../pages/Course';
import Task from '../pages/Task';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Courses from '../pages/Courses';
import NotFound from '../pages/NotFound';

/* ──────────────────────────────────────────
   Guards
────────────────────────────────────────── */

/** Redirects unauthenticated users to /login */
function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FullPageLoader />;
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
}

/** Redirects already-authenticated users away from login/register */
function GuestRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <FullPageLoader />;
    if (user) return <Navigate to="/dashboard" replace />;
    return children;
}

/** Full-page loading spinner shown while auth status resolves */
function FullPageLoader() {
    return (
        <div style={{
            minHeight: '100vh', background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '16px',
            fontFamily: 'outfit, Arial, sans-serif',
        }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '3px solid rgba(60,131,246,0.2)',
                borderTopColor: '#3C83F6',
                animation: 'spin 0.75s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Loading…</p>
        </div>
    );
}

/* ──────────────────────────────────────────
   Routes
────────────────────────────────────────── */
const AppRoutes = () => {
    return (
        <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />

            {/* ── Guest-only Routes (redirect to /dashboard if already logged in) ── */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            {/* ── Protected Routes (redirect to /login if not authenticated) ── */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
            <Route path="/course/:id" element={<PrivateRoute><Course /></PrivateRoute>} />
            <Route path="/task/:id" element={<PrivateRoute><Task /></PrivateRoute>} />

            {/* ── 404 Fallback ── */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
