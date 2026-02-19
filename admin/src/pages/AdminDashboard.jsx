import React, { useState } from 'react';
import {
    Users, BookOpen, ShoppingBag, TrendingUp,
    Activity, AlertCircle, CheckCircle, Clock,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
} from 'lucide-react';

const C = {
    accent: '#ef4444', blue: '#3b82f6', green: '#22c55e',
    yellow: '#f59e0b', purple: '#a855f7', muted: '#a1a1aa', dim: '#555',
    card: '#111', raised: '#181818', border: 'rgba(255,255,255,0.08)', borderS: 'rgba(255,255,255,0.05)',
};

/* ── Static data ── */
const STATS = [
    { label: 'Total Users', value: '1,284', change: '+12%', up: true, Icon: Users, color: C.blue },
    { label: 'Active Courses', value: '4', change: '+1', up: true, Icon: BookOpen, color: C.purple },
    { label: 'Enrollments', value: '3,910', change: '+8%', up: true, Icon: ShoppingBag, color: C.green },
    { label: 'Avg Progress', value: '34%', change: '-2%', up: false, Icon: TrendingUp, color: C.yellow },
];

const RECENT_USERS = [
    { name: 'Moin Sheikh', email: 'moinsheikh6646@gmail.com', courses: 1, joined: '19 Feb 2026', status: 'active' },
    { name: 'Arjun Mehta', email: 'arjun.m@example.com', courses: 2, joined: '18 Feb 2026', status: 'active' },
    { name: 'Priya Sharma', email: 'priya.s@example.com', courses: 3, joined: '17 Feb 2026', status: 'active' },
    { name: 'Rohit Verma', email: 'rohit.v@example.com', courses: 1, joined: '16 Feb 2026', status: 'inactive' },
    { name: 'Sneha Patil', email: 'sneha.p@example.com', courses: 2, joined: '15 Feb 2026', status: 'active' },
];

const RECENT_ENROLLMENTS = [
    { user: 'Moin Sheikh', course: '2.0 AI Powered Cohort', time: '2m ago', status: 'confirmed' },
    { user: 'Arjun Mehta', course: 'Full Stack Web Development', time: '1h ago', status: 'confirmed' },
    { user: 'Priya Sharma', course: 'DSA Mastery', time: '3h ago', status: 'confirmed' },
    { user: 'Rohit Verma', course: 'DevOps & Cloud Engineering', time: '6h ago', status: 'pending' },
    { user: 'Sneha Patil', course: 'Full Stack Web Development', time: '1d ago', status: 'confirmed' },
];

function StatCard({ label, value, change, up, Icon, color }) {
    return (
        <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: '14px', padding: '22px 24px',
            display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: C.muted, fontWeight: 500 }}>{label}</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={17} color={color} />
                </div>
            </div>
            <div>
                <p style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1 }}>{value}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                    {up
                        ? <ArrowUpRight size={14} color={C.green} />
                        : <ArrowDownRight size={14} color={C.accent} />
                    }
                    <span style={{ fontSize: '12px', color: up ? C.green : C.accent, fontWeight: 600 }}>{change}</span>
                    <span style={{ fontSize: '12px', color: C.dim }}>vs last month</span>
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Dashboard Overview</h1>
                <p style={{ fontSize: '14px', color: C.muted }}>Welcome back — here's what's happening on LevelUp.dev</p>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {STATS.map(s => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Two-col row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>

                {/* Recent enrollments */}
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${C.borderS}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity size={15} color={C.accent} />
                            <span style={{ fontWeight: 700, fontSize: '14px' }}>Recent Enrollments</span>
                        </div>
                        <span style={{ fontSize: '12px', color: C.dim }}>Last 7 days</span>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {RECENT_ENROLLMENTS.map((e, i) => (
                            <div key={i} style={{ padding: '12px 22px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: i < RECENT_ENROLLMENTS.length - 1 ? `1px solid ${C.borderS}` : 'none' }}>
                                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
                                    {e.user.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{e.user}</p>
                                    <p style={{ fontSize: '11px', color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.course}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', background: e.status === 'confirmed' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)', color: e.status === 'confirmed' ? C.green : C.yellow }}>
                                        {e.status}
                                    </span>
                                    <p style={{ fontSize: '10px', color: C.dim, marginTop: '3px' }}>{e.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Alerts */}
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                            <AlertCircle size={15} color={C.yellow} />
                            <span style={{ fontWeight: 700, fontSize: '14px' }}>System Alerts</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { msg: '1 enrollment pending manual review', color: C.yellow, Icon: Clock },
                                { msg: 'All courses are live and healthy', color: C.green, Icon: CheckCircle },
                                { msg: 'Server running on port 5000', color: C.green, Icon: CheckCircle },
                            ].map(({ msg, color, Icon }, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: `${color}0f`, borderRadius: '8px', border: `1px solid ${color}22` }}>
                                    <Icon size={13} color={color} />
                                    <span style={{ fontSize: '12px', color: C.muted }}>{msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Platform health */}
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '18px 22px' }}>
                        <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '14px' }}>Platform Health</p>
                        {[
                            { label: 'API Response', val: '98ms', pct: 92, color: C.green },
                            { label: 'DB Latency', val: '24ms', pct: 97, color: C.green },
                            { label: 'Error Rate', val: '0.3%', pct: 99, color: C.green },
                            { label: 'Active Sessions', val: '143', pct: 58, color: C.blue },
                        ].map(({ label, val, pct, color }) => (
                            <div key={label} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ fontSize: '12px', color: C.muted }}>{label}</span>
                                    <span style={{ fontSize: '12px', color, fontWeight: 600 }}>{val}</span>
                                </div>
                                <div style={{ height: '4px', background: '#222', borderRadius: '99px', overflow: 'hidden' }}>
                                    <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '99px', transition: 'width 0.6s' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Users table */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ padding: '18px 22px', borderBottom: `1px solid ${C.borderS}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users size={15} color={C.blue} />
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>Recent Users</span>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${C.borderS}` }}>
                                {['User', 'Email', 'Courses', 'Joined', 'Status'].map(h => (
                                    <th key={h} style={{ padding: '11px 22px', textAlign: 'left', fontSize: '11px', color: C.dim, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_USERS.map((u, i) => (
                                <tr key={i} style={{ borderBottom: i < RECENT_USERS.length - 1 ? `1px solid ${C.borderS}` : 'none' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#161616'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '13px 22px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', flexShrink: 0 }}>
                                                {u.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                            </div>
                                            <span style={{ fontWeight: 600 }}>{u.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '13px 22px', color: C.muted }}>{u.email}</td>
                                    <td style={{ padding: '13px 22px' }}>
                                        <span style={{ background: 'rgba(59,130,246,0.12)', color: C.blue, borderRadius: '20px', padding: '2px 10px', fontWeight: 600, fontSize: '12px' }}>{u.courses}</span>
                                    </td>
                                    <td style={{ padding: '13px 22px', color: C.muted }}>{u.joined}</td>
                                    <td style={{ padding: '13px 22px' }}>
                                        <span style={{ background: u.status === 'active' ? 'rgba(34,197,94,0.12)' : 'rgba(85,85,85,0.2)', color: u.status === 'active' ? C.green : C.dim, borderRadius: '20px', padding: '3px 10px', fontWeight: 600, fontSize: '11px' }}>
                                            {u.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
