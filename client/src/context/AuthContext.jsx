import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // checking existing session

    /* ── Restore session on mount ── */
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { setLoading(false); return; }

        fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data?.user) setUser(data.user); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    /* ── Register ── */
    const register = async ({ firstName, lastName, email, password }) => {
        const res = await fetch(`${API}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    /* ── Login ── */
    const login = async ({ email, password }) => {
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    /* ── Update Profile ── */
    const updateProfile = async (fields) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API}/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(fields),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Update failed');
        setUser(data.user);
        return data.user;
    };

    /* ── Logout ── */
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, updateProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
