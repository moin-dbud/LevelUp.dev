import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Bell, LayoutGrid } from 'lucide-react';

const Course = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('modules');
    const [expandedModules, setExpandedModules] = useState({});

    const courseData = {
        name: "2.0 Job Ready AI Powered Cohort",
        completion: 2.04,
        modules: { completed: 2, total: 7 },
        subModules: { completed: 55, total: 230 },
        score: 561,
        totalScore: 27550,
    };

    const modules = [
        { id: 1, title: "Before We Start", status: "completed", lessons: [] },
        { id: 2, title: "Git & GitHub", status: "completed", lessons: [] },
        { id: 3, title: "Front-End", status: null, lessons: [] },
        { id: 4, title: "React-Projects", status: null, lessons: [] },
    ];

    const top3 = [
        { name: "Ritesh", rank: 2, points: "23.17k", color: "#f5c842", avatar: "R", avatarBg: "#e8702a" },
        { name: "Moin", rank: 1, points: "25.28k", color: "#6c8ef5", avatar: "M", avatarBg: "#7c3aed" },
        { name: "Mohini", rank: 3, points: "22.9k", color: "#f4a58a", avatar: "M", avatarBg: "#3aed73ff" },
    ];

    const leaderboard = [
        { name: "Shruti Badgujar", rank: 4, points: "22.08k", avatar: "S", avatarBg: "#6c4de8" },
        { name: "Devesh Gupta", rank: 5, points: "19.84k", avatar: "D", avatarBg: "#2563eb", img: true },
        { name: "Arshdeep Singh", rank: 6, points: "18.98k", avatar: "A", avatarBg: "#16a34a", img: true },
        { name: "Bhavya Dhanwani", rank: 7, points: "18.22k", avatar: "B", avatarBg: "#1d4ed8" },
        { name: "Nilesh Shakhya", rank: 8, points: "17.79k", avatar: "N", avatarBg: "#6366f1", img: true },
        { name: "Sameer Kumar", rank: 9, points: "16.37k", avatar: "S", avatarBg: "#dc2626", img: true },
    ];

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
    };

    const podiumHeights = { 1: 90, 2: 68, 3: 50 };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#111',
            fontFamily: 'outfit, outfit Fallback, Arial, sans-serif',
            color: '#fff',
        }}>
            {/* ──────── NAVBAR ──────── */}
            <nav className="bg-[#171717] border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <h1 className="text-xl sm:text-2xl font-black text-white"
                                style={{ fontFamily: 'outfit, outfit Fallback' }}>
                                LevelUp<span className="text-blue-500">.dev</span>
                            </h1>
                        </Link>

                        {/* Right Side */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block text-right">
                                    <p className="text-xl font-bold text-white">Moin Sheikh</p>
                                </div>
                                <Link to="/profile">
                                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-md cursor-pointer hover:scale-105 transition-transform">
                                        MS
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ──────── PAGE CONTENT ──────── */}
            <div style={{
                display: 'flex',
                gap: '16px',
                padding: '20px',
                boxSizing: 'border-box',
                background: 'black'
            }}>

                {/* ──────── LEFT PANEL ──────── */}
                <div style={{ flex: '0 0 58%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    {/* Course Header Card */}
                    <div style={{
                        background: '#171717',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.07)',
                        padding: '18px 20px',
                    }}>
                        {/* Back + Title */}
                        <Link to="/dashboard" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            color: '#fff', textDecoration: 'none', marginBottom: '14px'
                        }}>
                            <ArrowLeft size={20} />
                            <span style={{ fontSize: '18px', fontWeight: 600 }}>{courseData.name}</span>
                        </Link>

                        {/* Completion % */}
                        <div style={{ color: '#3C83F6', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                            {courseData.completion}% Complete
                        </div>

                        {/* Progress Bar */}
                        <div style={{
                            background: '#333', borderRadius: '4px', height: '4px',
                            marginBottom: '14px', overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${courseData.completion}%`, height: '100%',
                                background: 'linear-gradient(90deg, #3C83F6, #639CF8)',
                                borderRadius: '4px', transition: 'width 0.5s ease'
                            }} />
                        </div>

                        {/* Stats Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#aaa' }}>
                            <span>
                                Modules: <span style={{ color: '#fff', fontWeight: 600 }}>
                                    {courseData.modules.completed}/{courseData.modules.total}
                                </span>
                            </span>
                            <span>
                                Sub-Modules: <span style={{ color: '#fff', fontWeight: 600 }}>
                                    {courseData.subModules.completed}/{courseData.subModules.total}
                                </span>
                            </span>
                            <span>
                                Score: <span style={{ color: '#3C83F6', fontWeight: 600 }}>
                                    {courseData.score}/{(courseData.totalScore / 1000).toFixed(2)}k
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Modules Card */}
                    <div style={{
                        background: '#121212',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.07)',
                        overflow: 'hidden',
                        flex: 1,
                    }}>
                        {/* Tabs */}
                        <div style={{
                            background: '#232323',
                            display: 'flex', alignItems: 'center', gap: '4px',
                            borderBottom: '1px solid rgba(255,255,255,0.07)',
                            padding: '0 16px',
                        }}>
                            <button
                                onClick={() => setActiveTab('modules')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '14px 12px', fontSize: '13px', fontWeight: 600,
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: activeTab === 'modules' ? '#3C83F6' : '#888',
                                    borderBottom: activeTab === 'modules' ? '2px solid #3C83F6' : '2px solid transparent',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <LayoutGrid size={14} />
                                All Modules
                            </button>
                            <button
                                onClick={() => setActiveTab('announcements')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '14px 12px', fontSize: '13px', fontWeight: 600,
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: activeTab === 'announcements' ? '#e8702a' : '#888',
                                    borderBottom: activeTab === 'announcements' ? '2px solid #e8702a' : '2px solid transparent',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <Bell size={14} />
                                Announcements
                            </button>
                        </div>

                        {/* Module List */}
                        {activeTab === 'modules' && (
                            <div style={{ padding: '0' }}>
                                {/* Live Class Row */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '18px 20px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <span style={{ fontSize: '15px', fontWeight: 500 }}>Live Class</span>
                                    <button style={{
                                        background: '#c0392b',
                                        color: '#fff', border: 'none', borderRadius: '8px',
                                        padding: '6px 18px', fontSize: '13px', fontWeight: 600,
                                        cursor: 'pointer', letterSpacing: '0.3px',
                                    }}>
                                        Join Live
                                    </button>
                                </div>

                                {/* Dynamic Modules */}
                                {modules.map((module) => (
                                    <div key={module.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            style={{
                                                width: '100%', display: 'flex', alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '18px 20px',
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                color: '#fff', textAlign: 'left',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '15px', fontWeight: 500 }}>{module.title}</span>
                                                {module.status === 'completed' && (
                                                    <span style={{
                                                        fontSize: '11px', fontWeight: 600,
                                                        background: 'rgba(34,197,94,0.15)',
                                                        color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)',
                                                        borderRadius: '20px', padding: '2px 10px',
                                                    }}>
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronDown
                                                size={18}
                                                style={{
                                                    color: '#666',
                                                    transform: expandedModules[module.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.2s',
                                                }}
                                            />
                                        </button>

                                        {expandedModules[module.id] && module.lessons.length === 0 && (
                                            <div style={{ padding: '10px 20px 16px', color: '#555', fontSize: '13px' }}>
                                                No lessons available.
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'announcements' && (
                            <div style={{padding: '40px 20px', textAlign: 'center', color: '#555', fontSize: '14px' }}>
                                No announcements yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* ──────── RIGHT PANEL – LEADERBOARD ──────── */}
                <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        background: '#171717',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.07)',
                        overflow: 'hidden',
                        display: 'flex', flexDirection: 'column',
                        height: '100%',
                    }}>
                        {/* Leaderboard Header */}
                        <div style={{
                            background: '#232323',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '16px 20px',
                            borderBottom: '1px solid rgba(255,255,255,0.07)',
                            color: '#3C83F6', fontSize: '14px', fontWeight: 600,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                            Leaderboard
                        </div>

                        {/* Podium */}
                        <div style={{
                            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                            gap: '12px', padding: '24px 16px 0',
                        }}>
                            {top3.map((person) => (
                                <div key={person.rank} style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                                }}>
                                    {/* Avatar */}
                                    <div style={{
                                        width: person.rank === 1 ? '48px' : '42px',
                                        height: person.rank === 1 ? '48px' : '42px',
                                        borderRadius: '50%',
                                        background: person.avatarBg || '#555',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: person.rank === 1 ? '18px' : '15px',
                                        color: '#fff',
                                        border: person.rank === 1 ? '2px solid #6c8ef5' : 'none',
                                        overflow: 'hidden',
                                    }}>
                                        {person.avatar}
                                    </div>

                                    {/* Name */}
                                    <span style={{ fontSize: '12px', color: '#ccc', fontWeight: 500 }}>{person.name}</span>

                                    {/* Podium Block */}
                                    <div style={{
                                        width: '80px',
                                        height: `${podiumHeights[person.rank]}px`,
                                        background: person.color,
                                        borderRadius: '6px 6px 0 0',
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center',
                                        gap: '2px',
                                    }}>
                                        {person.rank === 1 && (
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)" style={{ marginBottom: '2px' }}>
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        )}
                                        <span style={{ color: '#000', fontWeight: 700, fontSize: '13px' }}>{person.rank}st</span>
                                        <span style={{ color: 'rgba(0,0,0,0.7)', fontSize: '11px' }}>{person.points} points</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Table */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {/* Header */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 80px 80px',
                                padding: '10px 16px',
                                background: '#242424',
                                fontSize: '11px', fontWeight: 700,
                                color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase',
                            }}>
                                <span>Name</span>
                                <span style={{ textAlign: 'center' }}>Rank</span>
                                <span style={{ textAlign: 'right' }}>Points</span>
                            </div>

                            {/* Rows */}
                            {leaderboard.map((user, i) => (
                                <div key={i} style={{
                                    display: 'grid', gridTemplateColumns: '1fr 80px 80px',
                                    padding: '11px 16px',
                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                    alignItems: 'center',
                                }}>
                                    {/* Name + Avatar */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            background: user.avatarBg,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '12px', fontWeight: 700, color: '#fff',
                                            flexShrink: 0,
                                        }}>
                                            {user.avatar}
                                        </div>
                                        <span style={{ fontSize: '13px', color: '#ccc' }}>{user.name}</span>
                                    </div>

                                    <span style={{ textAlign: 'center', fontSize: '13px', color: '#bbb' }}>{user.rank}</span>
                                    <span style={{ textAlign: 'right', fontSize: '13px', color: '#3C83F6', fontWeight: 600 }}>{user.points}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '14px 20px', textAlign: 'center',
                            borderTop: '1px solid rgba(255,255,255,0.07)',
                            fontSize: '13px', color: '#aaa',
                        }}>
                            You are ahead of{' '}
                            <span style={{ color: '#3C83F6', fontWeight: 700 }}>51.04%</span>
                            {' '}of students{' '}
                            <span style={{ color: '#3C83F6' }}>in this batch</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
