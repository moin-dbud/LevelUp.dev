import React from 'react';
import { BookOpen, Users, Clock, Star, Edit, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

const C = {
    accent: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#f59e0b', purple: '#a855f7',
    muted: '#a1a1aa', dim: '#555', card: '#111', raised: '#181818',
    border: 'rgba(255,255,255,0.08)', borderS: 'rgba(255,255,255,0.05)',
};

const COURSES = [
    { id: 'ai-cohort-2', title: '2.0 AI Powered Cohort', students: 1200, rating: 4.9, duration: '6 months', price: '₹14,999', status: 'live', category: 'AI' },
    { id: 'fullstack-dev', title: 'Full Stack Web Development', students: 1800, rating: 4.8, duration: '4 months', price: '₹9,999', status: 'live', category: 'Web Dev' },
    { id: 'dsa-mastery', title: 'DSA Mastery', students: 650, rating: 4.7, duration: '3 months', price: '₹7,999', status: 'live', category: 'DSA' },
    { id: 'devops-cloud', title: 'DevOps & Cloud Engineering', students: 260, rating: 4.8, duration: '3 months', price: '₹11,999', status: 'draft', category: 'DevOps' },
];

const CAT_COLORS = { AI: C.purple, 'Web Dev': C.blue, DSA: C.yellow, DevOps: C.green };

export default function AdminCourses() {
    return (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Courses</h1>
                    <p style={{ fontSize: '14px', color: C.muted }}>Manage all courses available on the platform</p>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: C.accent, border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    + New Course
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {COURSES.map(c => {
                    const catColor = CAT_COLORS[c.category] || C.blue;
                    return (
                        <div key={c.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                        >
                            {/* Header strip */}
                            <div style={{ height: '4px', background: catColor }} />
                            <div style={{ padding: '18px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '14px' }}>
                                    <div>
                                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: catColor, display: 'block', marginBottom: '4px' }}>{c.category}</span>
                                        <h3 style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.35 }}>{c.title}</h3>
                                    </div>
                                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', flexShrink: 0, background: c.status === 'live' ? 'rgba(34,197,94,0.12)' : 'rgba(85,85,85,0.2)', color: c.status === 'live' ? C.green : C.dim }}>
                                        {c.status === 'live' ? '● LIVE' : '◌ DRAFT'}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                                    {[
                                        { Icon: Users, val: c.students.toLocaleString() + ' students', color: C.blue },
                                        { Icon: Star, val: c.rating + ' rating', color: C.yellow },
                                        { Icon: Clock, val: c.duration, color: C.muted },
                                        { Icon: BookOpen, val: c.price, color: C.green },
                                    ].map(({ Icon, val, color }, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Icon size={12} color={color} />
                                            <span style={{ fontSize: '12px', color: C.muted }}>{val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '8px', borderTop: `1px solid ${C.borderS}`, paddingTop: '14px' }}>
                                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px', background: C.raised, border: `1px solid ${C.borderS}`, borderRadius: '8px', color: C.muted, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        <Eye size={12} /> View
                                    </button>
                                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px', background: C.raised, border: `1px solid ${C.borderS}`, borderRadius: '8px', color: C.muted, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        <Edit size={12} /> Edit
                                    </button>
                                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px', background: c.status === 'live' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${c.status === 'live' ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)'}`, borderRadius: '8px', color: c.status === 'live' ? C.accent : C.green, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        {c.status === 'live' ? <><ToggleRight size={12} /> Unpublish</> : <><ToggleLeft size={12} /> Publish</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
