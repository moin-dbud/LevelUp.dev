import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, Clock, Search } from 'lucide-react';

const C = {
    accent: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#f59e0b',
    muted: '#a1a1aa', dim: '#555', card: '#111',
    border: 'rgba(255,255,255,0.08)', borderS: 'rgba(255,255,255,0.05)',
};

const ENROLLMENTS = [
    { id: 1, user: 'Moin Sheikh', email: 'moinsheikh6646@gmail.com', course: '2.0 AI Powered Cohort', price: '₹14,999', date: '19 Feb 2026', progress: 0, status: 'active' },
    { id: 2, user: 'Arjun Mehta', email: 'arjun.m@example.com', course: 'Full Stack Web Dev', price: '₹9,999', date: '18 Feb 2026', progress: 10, status: 'active' },
    { id: 3, user: 'Priya Sharma', email: 'priya.s@example.com', course: 'DSA Mastery', price: '₹7,999', date: '17 Feb 2026', progress: 32, status: 'active' },
    { id: 4, user: 'Rohit Verma', email: 'rohit.v@example.com', course: 'DevOps & Cloud Engineering', price: '₹11,999', date: '16 Feb 2026', progress: 5, status: 'pending' },
    { id: 5, user: 'Sneha Patil', email: 'sneha.p@example.com', course: 'Full Stack Web Dev', price: '₹9,999', date: '15 Feb 2026', progress: 70, status: 'active' },
    { id: 6, user: 'Arjun Mehta', email: 'arjun.m@example.com', course: 'DSA Mastery', price: '₹7,999', date: '14 Feb 2026', progress: 45, status: 'active' },
];

export default function AdminEnrollments() {
    const [search, setSearch] = useState('');
    const filtered = ENROLLMENTS.filter(e =>
        e.user.toLowerCase().includes(search.toLowerCase()) ||
        e.course.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Enrollments</h1>
                <p style={{ fontSize: '14px', color: C.muted }}>All course enrollments on the platform</p>
            </div>

            {/* Summary pills */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'Total', val: ENROLLMENTS.length, color: C.blue },
                    { label: 'Active', val: ENROLLMENTS.filter(e => e.status === 'active').length, color: C.green },
                    { label: 'Pending', val: ENROLLMENTS.filter(e => e.status === 'pending').length, color: C.yellow },
                ].map(({ label, val, color }) => (
                    <div key={label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px 18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color }}>{val}</span>
                        <span style={{ fontSize: '13px', color: C.muted }}>{label}</span>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: '360px', marginBottom: '16px' }}>
                <Search size={14} color={C.dim} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Search by user or course…" value={search} onChange={e => setSearch(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', background: '#0d0d0d', border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px 12px 10px 36px', fontSize: '13px', color: '#fff', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border}
                />
            </div>

            {/* Table */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${C.borderS}` }}>
                                {['User', 'Course', 'Price', 'Progress', 'Date', 'Status'].map(h => (
                                    <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: '11px', color: C.dim, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(e => (
                                <tr key={e.id} style={{ borderBottom: `1px solid ${C.borderS}` }}
                                    onMouseEnter={el => el.currentTarget.style.background = '#161616'}
                                    onMouseLeave={el => el.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '13px 20px' }}>
                                        <p style={{ fontWeight: 600, marginBottom: '2px' }}>{e.user}</p>
                                        <p style={{ fontSize: '11px', color: C.dim }}>{e.email}</p>
                                    </td>
                                    <td style={{ padding: '13px 20px', color: C.muted, maxWidth: '180px' }}>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{e.course}</span>
                                    </td>
                                    <td style={{ padding: '13px 20px', fontWeight: 700, color: C.green }}>{e.price}</td>
                                    <td style={{ padding: '13px 20px', minWidth: '120px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, height: '4px', background: '#222', borderRadius: '99px', overflow: 'hidden' }}>
                                                <div style={{ width: `${e.progress}%`, height: '100%', background: C.blue, borderRadius: '99px' }} />
                                            </div>
                                            <span style={{ fontSize: '11px', color: C.muted, flexShrink: 0 }}>{e.progress}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '13px 20px', color: C.muted }}>{e.date}</td>
                                    <td style={{ padding: '13px 20px' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: e.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)', color: e.status === 'active' ? C.green : C.yellow }}>
                                            {e.status === 'active' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                            {e.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '12px 20px', borderTop: `1px solid ${C.borderS}`, fontSize: '12px', color: C.dim }}>
                    Showing {filtered.length} of {ENROLLMENTS.length} enrollments
                </div>
            </div>
        </div>
    );
}
