import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Mail } from 'lucide-react';

const C = {
    accent: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#f59e0b',
    muted: '#a1a1aa', dim: '#555', card: '#111',
    border: 'rgba(255,255,255,0.08)', borderS: 'rgba(255,255,255,0.05)',
};

const USERS = [
    { id: 1, name: 'Moin Sheikh', email: 'moinsheikh6646@gmail.com', role: 'admin', courses: 1, joined: '19 Feb 2026', status: 'active' },
    { id: 2, name: 'Arjun Mehta', email: 'arjun.m@example.com', role: 'student', courses: 2, joined: '18 Feb 2026', status: 'active' },
    { id: 3, name: 'Priya Sharma', email: 'priya.s@example.com', role: 'student', courses: 3, joined: '17 Feb 2026', status: 'active' },
    { id: 4, name: 'Rohit Verma', email: 'rohit.v@example.com', role: 'student', courses: 1, joined: '16 Feb 2026', status: 'inactive' },
    { id: 5, name: 'Sneha Patil', email: 'sneha.p@example.com', role: 'student', courses: 2, joined: '15 Feb 2026', status: 'active' },
    { id: 6, name: 'Dev Kumar', email: 'dev.k@example.com', role: 'student', courses: 0, joined: '14 Feb 2026', status: 'active' },
    { id: 7, name: 'Neha Joshi', email: 'neha.j@example.com', role: 'student', courses: 1, joined: '13 Feb 2026', status: 'inactive' },
];

export default function AdminUsers() {
    const [search, setSearch] = useState('');
    const filtered = USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Users</h1>
                <p style={{ fontSize: '14px', color: C.muted }}>Manage all registered users on the platform</p>
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={14} color={C.dim} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                        type="text" placeholder="Search users…" value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', boxSizing: 'border-box', background: '#0d0d0d', border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px 12px 10px 36px', fontSize: '13px', color: '#fff', fontFamily: 'inherit', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = C.accent}
                        onBlur={e => e.target.style.borderColor = C.border}
                    />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#111', border: `1px solid ${C.border}`, borderRadius: '10px', color: C.muted, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <Filter size={13} /> Filter
                </button>
            </div>

            {/* Table */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${C.borderS}` }}>
                                {['User', 'Email', 'Role', 'Courses', 'Joined', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', color: C.dim, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u) => (
                                <tr key={u.id} style={{ borderBottom: `1px solid ${C.borderS}` }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#161616'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '13px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                                                {u.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                            </div>
                                            <span style={{ fontWeight: 600 }}>{u.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '13px 20px', color: C.muted }}>{u.email}</td>
                                    <td style={{ padding: '13px 20px' }}>
                                        <span style={{ background: u.role === 'admin' ? 'rgba(239,68,68,0.12)' : 'rgba(59,130,246,0.12)', color: u.role === 'admin' ? C.accent : C.blue, borderRadius: '20px', padding: '2px 10px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '13px 20px', fontWeight: 600 }}>{u.courses}</td>
                                    <td style={{ padding: '13px 20px', color: C.muted }}>{u.joined}</td>
                                    <td style={{ padding: '13px 20px' }}>
                                        <span style={{ background: u.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(85,85,85,0.2)', color: u.status === 'active' ? C.green : C.dim, borderRadius: '20px', padding: '3px 10px', fontWeight: 600, fontSize: '11px' }}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '13px 20px' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button title="Send email" style={{ padding: '6px', background: 'transparent', border: `1px solid ${C.borderS}`, borderRadius: '7px', color: C.dim, cursor: 'pointer', display: 'flex' }}><Mail size={13} /></button>
                                            <button title="Activate / Deactivate" style={{ padding: '6px', background: 'transparent', border: `1px solid ${C.borderS}`, borderRadius: '7px', color: u.status === 'active' ? C.yellow : C.green, cursor: 'pointer', display: 'flex' }}>
                                                {u.status === 'active' ? <UserX size={13} /> : <UserCheck size={13} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '12px 20px', borderTop: `1px solid ${C.borderS}`, fontSize: '12px', color: C.dim }}>
                    Showing {filtered.length} of {USERS.length} users
                </div>
            </div>
        </div>
    );
}
