import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Zap, Send, Loader2, CheckCircle2, AlertCircle,
    Mail, MessageSquare, User, Tag, FileText,
    MapPin, Clock, ArrowUpRight, ChevronDown,
    HelpCircle, Bug, Lightbulb, CreditCard, MoreHorizontal, LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:5000/api';

/* ── palette (matching dashboard) ── */
const C = {
    bg: '#0a0a0a', surface: '#0f0f0f', card: '#141414', raised: '#1a1a1a',
    border: 'rgba(255,255,255,0.07)', borderH: 'rgba(255,255,255,0.14)',
    accent: '#3C83F6', accentSoft: 'rgba(60,131,246,0.1)',
    text: '#f0f0f0', muted: '#888', dim: '#555',
    green: '#22c55e', amber: '#f59e0b', red: '#ef4444',
};

const categories = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle },
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'billing', label: 'Billing', icon: CreditCard },
    { value: 'other', label: 'Other', icon: MoreHorizontal },
];

export default function Contact() {
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;
    const location = useLocation();

    const [form, setForm] = useState({
        name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '',
        email: user?.email || '',
        subject: '',
        category: 'general',
        message: '',
    });
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState(null); // { type: 'success' | 'error', text }

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);
        setSending(true);
        try {
            const res = await fetch(`${API}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    userId: user?._id || null,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Something went wrong');
            setResult({ type: 'success', text: 'Message sent! We\'ll get back to you within 24 hours.' });
            setForm(p => ({ ...p, subject: '', category: 'general', message: '' }));
        } catch (err) {
            setResult({ type: 'error', text: err.message });
        } finally {
            setSending(false);
        }
    };

    const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : '';

    /* ── nav links differ based on auth ── */
    const navLinks = isLoggedIn
        ? [['/', 'Home'], ['/courses', 'Courses'], ['/blogs', 'Blogs'], ['/contact', 'Contact']]
        : [['/', 'Home'], ['/courses', 'Courses'], ['/blogs', 'Blogs'], ['/about', 'About'], ['/contact', 'Contact']];

    return (
        <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Outfit, sans-serif', color: C.text }}>
            <style>{`
                * { box-sizing: border-box; }
                @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
                .c-input { width:100%; background:${C.raised}; border:1px solid ${C.border}; border-radius:9px;
                    padding:11px 14px 11px 38px; font-size:13px; font-weight:500; color:#fff;
                    font-family:inherit; outline:none; transition:border-color 0.15s; }
                .c-input:focus { border-color: rgba(60,131,246,0.5); }
                .c-input::placeholder { color:${C.dim}; }
                .c-textarea { width:100%; background:${C.raised}; border:1px solid ${C.border}; border-radius:9px;
                    padding:11px 14px; font-size:13px; font-weight:500; color:#fff; font-family:inherit;
                    outline:none; resize:vertical; min-height:120px; transition:border-color 0.15s; line-height:1.6; }
                .c-textarea:focus { border-color: rgba(60,131,246,0.5); }
                .c-textarea::placeholder { color:${C.dim}; }
                .c-select { width:100%; background:${C.raised}; border:1px solid ${C.border}; border-radius:9px;
                    padding:11px 14px 11px 38px; font-size:13px; font-weight:500; color:#fff;
                    font-family:inherit; outline:none; appearance:none; cursor:pointer; transition:border-color 0.15s; }
                .c-select:focus { border-color: rgba(60,131,246,0.5); }
                .c-nav-link { padding:7px 13px; border-radius:8px; font-size:13px; font-weight:600;
                    text-decoration:none; transition: color 0.15s; }
                .c-nav-link:hover { color:#fff !important; }
                @media(max-width:800px){
                    .c-grid { grid-template-columns:1fr !important; }
                    .c-info { display:none !important; }
                }
            `}</style>

            {/* ══ NAV ══ */}
            <nav style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Zap size={13} color="#fff" />
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'agile, sans-serif' }}>
                            LevelUp<span style={{ color: C.accent }}>.dev</span>
                        </span>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {navLinks.map(([to, label]) => (
                            <Link key={to} to={to} className="c-nav-link"
                                style={{
                                    color: location.pathname === to ? '#fff' : C.muted,
                                    background: location.pathname === to ? C.accentSoft : 'transparent'
                                }}>
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {isLoggedIn ? (
                            <>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span style={{ fontSize: 11, color: C.muted }}>Student</span>
                                </div>
                                <Link to="/profile" style={{ textDecoration: 'none' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${C.accent},#7c3aed)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: '#fff', cursor: 'pointer' }}>
                                        {initials}
                                    </div>
                                </Link>
                                <button onClick={logout} title="Sign out"
                                    style={{ width: 32, height: 32, borderRadius: 7, background: 'transparent', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.dim }}>
                                    <LogOut size={13} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" style={{ padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', color: '#fff', background: C.accent }}>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* ══ CONTENT ══ */}
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 64px' }}>
                {/* heading */}
                <div style={{ marginBottom: 32, animation: 'fadeUp 0.4s ease' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: C.accent, textTransform: 'uppercase' }}>Get In Touch</span>
                    <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '8px 0 6px', letterSpacing: '-0.02em' }}>
                        Contact Us
                    </h1>
                    <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
                        Have a question, found a bug, or want to suggest something? We'd love to hear from you.
                    </p>
                </div>

                <div className="c-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'flex-start' }}>
                    {/* ── FORM ── */}
                    <form onSubmit={handleSubmit} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 28px 24px', animation: 'fadeUp 0.5s ease' }}>
                        {/* name + email row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={14} color={C.dim} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input className="c-input" placeholder="Your name"
                                        value={form.name} onChange={e => set('name', e.target.value)}
                                        readOnly={isLoggedIn} style={isLoggedIn ? { opacity: 0.6, cursor: 'default' } : {}} required />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={14} color={C.dim} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input className="c-input" type="email" placeholder="you@example.com"
                                        value={form.email} onChange={e => set('email', e.target.value)}
                                        readOnly={isLoggedIn} style={isLoggedIn ? { opacity: 0.6, cursor: 'default' } : {}} required />
                                </div>
                            </div>
                        </div>

                        {/* subject + category row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Subject</label>
                                <div style={{ position: 'relative' }}>
                                    <FileText size={14} color={C.dim} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input className="c-input" placeholder="What's this about?"
                                        value={form.subject} onChange={e => set('subject', e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Category</label>
                                <div style={{ position: 'relative' }}>
                                    <Tag size={14} color={C.dim} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <ChevronDown size={14} color={C.dim} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <select className="c-select" value={form.category} onChange={e => set('category', e.target.value)}>
                                        {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* message */}
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Message</label>
                            <textarea className="c-textarea" placeholder="Tell us more…"
                                value={form.message} onChange={e => set('message', e.target.value)} required />
                        </div>

                        {/* result alert */}
                        {result && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '12px 16px', borderRadius: 10, marginBottom: 16,
                                background: result.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                                border: `1px solid ${result.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                            }}>
                                {result.type === 'success'
                                    ? <CheckCircle2 size={16} color={C.green} />
                                    : <AlertCircle size={16} color={C.red} />}
                                <span style={{ fontSize: 13, fontWeight: 600, color: result.type === 'success' ? C.green : C.red }}>{result.text}</span>
                            </div>
                        )}

                        <button type="submit" disabled={sending} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '11px 26px', borderRadius: 10, border: 'none',
                            background: C.accent, color: '#fff', fontWeight: 700, fontSize: 14,
                            fontFamily: 'inherit', cursor: sending ? 'wait' : 'pointer',
                            opacity: sending ? 0.6 : 1, transition: 'opacity 0.2s, transform 0.15s',
                        }}
                            onMouseEnter={e => { if (!sending) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                            {sending ? <><Loader2 size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> Sending…</> : <><Send size={15} /> Send Message</>}
                        </button>

                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </form>

                    {/* ── SIDEBAR INFO ── */}
                    <div className="c-info" style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeUp 0.6s ease' }}>
                        {/* quick contacts */}
                        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px' }}>
                            <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: '0 0 14px' }}>Other ways to reach us</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 7, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Mail size={13} color={C.accent} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 11, color: C.dim, fontWeight: 600 }}>Email</p>
                                        <p style={{ margin: 0, fontSize: 12, color: C.text, fontWeight: 600 }}>hello@moinsheikh.in</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 7, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <MapPin size={13} color={C.accent} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 11, color: C.dim, fontWeight: 600 }}>Location</p>
                                        <p style={{ margin: 0, fontSize: 12, color: C.text, fontWeight: 600 }}>Mumbai, India</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 7, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Clock size={13} color={C.accent} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 11, color: C.dim, fontWeight: 600 }}>Response Time</p>
                                        <p style={{ margin: 0, fontSize: 12, color: C.text, fontWeight: 600 }}>Within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ card */}
                        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px' }}>
                            <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Common Questions</p>
                            {[
                                { q: 'Is the platform free?', a: 'Yes! We have a free tier with full access to core lessons.' },
                                { q: 'How do I reset my password?', a: 'Go to the login page and click "Forgot Password".' },
                                { q: 'Can I get a refund?', a: 'Refunds are available within 7 days of purchase.' },
                            ].map((item, i) => (
                                <div key={i} style={{ marginBottom: i < 2 ? 10 : 0 }}>
                                    <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: C.text }}>{item.q}</p>
                                    <p style={{ margin: 0, fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{item.a}</p>
                                </div>
                            ))}
                        </div>

                        {/* social */}
                        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <MessageSquare size={14} color={C.accent} />
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#fff' }}>Join our Discord</p>
                                <p style={{ margin: 0, fontSize: 10, color: C.dim }}>Get help from the community</p>
                            </div>
                            <a href="#" style={{ width: 28, height: 28, borderRadius: 7, background: C.raised, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.dim, textDecoration: 'none' }}>
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
