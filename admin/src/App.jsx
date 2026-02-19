import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminEnrollments from './pages/AdminEnrollments';
import AdminSettings from './pages/AdminSettings';

/* ── Full-page loader while session resolves ── */
function Loader() {
  return (
    <div style={{
      minHeight: '100vh', background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '14px',
      fontFamily: 'Outfit, sans-serif',
    }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid rgba(239,68,68,0.2)', borderTopColor: '#ef4444', animation: 'spin 0.75s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: '#555', fontSize: '13px' }}>Verifying access…</p>
    </div>
  );
}

/* ── Route guard: only authenticated admins get through ── */
function PrivateAdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return <Loader />;
  if (!admin) return <Navigate to="/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
}

/* ── Guest guard: already logged-in admins go to dashboard ── */
function GuestAdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return <Loader />;
  if (admin) return <Navigate to="/" replace />;
  return children;
}

function AdminApp() {
  return (
    <Routes>
      {/* Login — redirect to / if already authenticated */}
      <Route path="/login" element={<GuestAdminRoute><AdminLogin /></GuestAdminRoute>} />

      {/* Protected admin routes */}
      <Route path="/" element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>} />
      <Route path="/users" element={<PrivateAdminRoute><AdminUsers /></PrivateAdminRoute>} />
      <Route path="/courses" element={<PrivateAdminRoute><AdminCourses /></PrivateAdminRoute>} />
      <Route path="/enrollments" element={<PrivateAdminRoute><AdminEnrollments /></PrivateAdminRoute>} />
      <Route path="/settings" element={<PrivateAdminRoute><AdminSettings /></PrivateAdminRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AdminApp />
    </AdminAuthProvider>
  );
}
