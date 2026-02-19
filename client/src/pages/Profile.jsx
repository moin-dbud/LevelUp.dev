import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User, Briefcase, GraduationCap, FolderOpen,
    Pencil, LogOut, Mail, Phone, Calendar, FileText, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ─── Design tokens — exact Dashboard palette ─── */
const C = {
    bg: '#000000',
    nav: '#171717',
    surface: '#171717',
    card: '#232323',
    raised: '#2a2a2a',
    border: 'rgba(255,255,255,0.12)',
    borderS: 'rgba(255,255,255,0.05)',
    accent: '#3C83F6',
    grad: 'linear-gradient(135deg,#3b82f6,#7c3aed)',
    text: '#ffffff',
    muted: '#a1a1aa',
    dim: '#555',
};

const SECTIONS = [
    { id: 'basic', label: 'Basic Info', sub: 'Personal Information', Icon: User },
    { id: 'professional', label: 'Professional', sub: 'Work & education details', Icon: Briefcase },
    { id: 'batches', label: 'Your Batches', sub: 'Enrolled & purchased', Icon: GraduationCap },
    { id: 'projects', label: 'My Projects', sub: 'Submitted projects', Icon: FolderOpen },
];

export default function Profile() {
    const { user, loading, updateProfile, logout } = useAuth();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('basic');
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', contact: '', dob: '', bio: '' });

    useEffect(() => {
        if (user) setForm({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            contact: user.contact || '',
            dob: user.dob || '',
            bio: user.bio || '',
        });
    }, [user]);

    useEffect(() => {
        if (!loading && !user) navigate('/login');
    }, [user, loading, navigate]);

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSave = async () => {
        setSaving(true); setError(''); setSuccess('');
        try {
            await updateProfile({ firstName: form.firstName, lastName: form.lastName, contact: form.contact, dob: form.dob, bio: form.bio });
            setEditMode(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3500);
        } catch (err) { setError(err.message); }
        finally { setSaving(false); }
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.text, fontFamily: 'outfit, Arial, sans-serif' }}>
            Loading…
        </div>
    );

    const initials = `${form.firstName[0] || ''}${form.lastName[0] || ''}`.toUpperCase() || 'U';

    return (
        <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'outfit, outfit Fallback, Arial, sans-serif', color: C.text }}>

            {/* ══ NAVBAR — identical to Dashboard ══ */}
            <nav style={{ background: C.nav, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '65px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{ fontSize: '22px', fontWeight: 900, color: C.text, margin: 0 }}>
                            LevelUp<span style={{ color: C.accent }}>.dev</span>
                        </h1>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 700, fontSize: '16px', color: C.text }}>{form.firstName} {form.lastName}</span>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '50%',
                                background: C.grad,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: '15px', color: '#fff', cursor: 'pointer',
                                transition: 'transform 0.15s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {initials}
                            </div>
                        </Link>
                        <ChevronDown size={16} color={C.muted} />
                    </div>
                </div>
            </nav>

            {/* ══ BODY ══ */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px', alignItems: 'start' }}>

                {/* ── SIDEBAR ── */}
                <aside style={{ background: C.surface, borderRadius: '16px', border: `1px solid ${C.borderS}`, overflow: 'hidden' }}>

                    {/* Header */}
                    <div style={{ padding: '22px 20px 14px' }}>
                        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>My Profile</p>
                        <p style={{ fontSize: '12px', color: C.muted, lineHeight: 1.5 }}>Manage your personal information and preferences</p>
                    </div>

                    {/* Avatar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 20px 20px' }}>
                        <div style={{
                            width: '76px', height: '76px', borderRadius: '50%',
                            background: C.grad,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '24px', fontWeight: 800, color: '#fff',
                            marginBottom: '12px',
                            boxShadow: '0 0 24px rgba(60,131,246,0.25)',
                        }}>
                            {initials}
                        </div>
                        <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{form.firstName} {form.lastName}</p>
                        <span style={{
                            fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px',
                            background: 'rgba(60,131,246,0.15)', color: C.accent,
                            border: `1px solid rgba(60,131,246,0.35)`, borderRadius: '20px', padding: '3px 12px',
                        }}>
                            {user?.role || 'STUDENT'}
                        </span>
                    </div>

                    {/* Nav items */}
                    <div style={{ padding: '0 10px 12px' }}>
                        {SECTIONS.map(({ id, label, sub, Icon }) => {
                            const active = activeSection === id;
                            return (
                                <button key={id} onClick={() => setActiveSection(id)} style={{
                                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '11px',
                                    padding: '10px 13px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                    background: active ? C.accent : 'transparent',
                                    color: active ? '#fff' : C.muted,
                                    marginBottom: '3px', transition: 'all 0.2s', fontFamily: 'inherit',
                                }}
                                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.card; }}
                                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                                        background: active ? 'rgba(255,255,255,0.20)' : C.card,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Icon size={14} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '13px', marginBottom: '1px' }}>{label}</p>
                                        <p style={{ fontSize: '11px', opacity: 0.7 }}>{sub}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Stats */}
                    <div style={{ margin: '0 10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid ${C.borderS}`, borderRadius: '10px', overflow: 'hidden' }}>
                        {[['Streak', 1], ['Done', 1]].map(([label, val], i) => (
                            <div key={label} style={{ padding: '14px 10px', textAlign: 'center', borderRight: i === 0 ? `1px solid ${C.borderS}` : 'none' }}>
                                <p style={{ fontSize: '20px', fontWeight: 800, color: C.accent }}>{val}</p>
                                <p style={{ fontSize: '11px', color: C.dim }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ── MAIN ── */}
                <main style={{ background: C.surface, borderRadius: '16px', border: `1px solid ${C.borderS}`, overflow: 'hidden' }}>

                    {/* Top bar */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '26px 30px 22px', borderBottom: `1px solid ${C.borderS}` }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '5px' }}>Personal Information</h2>
                            <p style={{ fontSize: '13px', color: C.muted }}>Update your personal details and contact information</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                            {editMode ? (
                                <>
                                    <Btn onClick={() => setEditMode(false)} variant="outline">Cancel</Btn>
                                    <Btn onClick={handleSave} disabled={saving} variant="primary">
                                        {saving ? 'Saving…' : 'Save Changes'}
                                    </Btn>
                                </>
                            ) : (
                                <Btn onClick={() => setEditMode(true)} variant="outline">
                                    <Pencil size={13} /> Edit Profile
                                </Btn>
                            )}
                            <Btn onClick={handleLogout} variant="danger">
                                <LogOut size={13} /> Log Out
                            </Btn>
                        </div>
                    </div>

                    {/* Feedback banner */}
                    {(error || success) && (
                        <div style={{ padding: '0 30px' }}>
                            <div style={{
                                marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
                                background: error ? 'rgba(239,68,68,0.10)' : 'rgba(60,131,246,0.10)',
                                border: `1px solid ${error ? 'rgba(239,68,68,0.35)' : 'rgba(60,131,246,0.35)'}`,
                                color: error ? '#f87171' : C.accent, fontSize: '13px',
                            }}>
                                {error || success}
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div style={{ padding: '26px 30px' }}>
                        {/* Section heading */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={15} color="#fff" />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '14px' }}>Personal Information</span>
                        </div>

                        {/* Name row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                            <Field label="First Name" icon={<User size={13} color={C.dim} />} name="firstName" value={form.firstName} onChange={handleChange} disabled={!editMode} />
                            <Field label="Last Name" icon={<User size={13} color={C.dim} />} name="lastName" value={form.lastName} onChange={handleChange} disabled={!editMode} />
                        </div>

                        {/* Email / Contact */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                            <Field label="Email (read-only)" icon={<Mail size={13} color={C.dim} />} name="email" value={form.email} onChange={handleChange} disabled={true} type="email" />
                            <Field label="Contact" icon={<Phone size={13} color={C.dim} />} name="contact" value={form.contact} onChange={handleChange} disabled={!editMode} />
                        </div>

                        {/* DOB */}
                        <div style={{ marginBottom: '14px' }}>
                            <Field label="Date of Birth" icon={<Calendar size={13} color={C.dim} />} name="dob" value={form.dob} onChange={handleChange} disabled={!editMode} placeholder="dd-mm-yyyy" />
                        </div>

                        {/* Bio */}
                        <div>
                            <label style={lbl}>
                                <FileText size={13} color={C.dim} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                Bio
                            </label>
                            <textarea name="bio" value={form.bio} onChange={handleChange} disabled={!editMode}
                                placeholder="Tell us a little about yourself..." rows={4}
                                style={{
                                    width: '100%', boxSizing: 'border-box',
                                    background: C.card, border: `1px solid ${C.borderS}`,
                                    borderRadius: '10px', padding: '12px 14px',
                                    fontSize: '14px', color: editMode ? C.text : C.muted,
                                    fontFamily: 'inherit', resize: 'vertical', outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => { if (!editMode) return; e.target.style.borderColor = C.accent; }}
                                onBlur={e => e.target.style.borderColor = C.borderS}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

/* ── Field component ── */
function Field({ label, icon, name, value, onChange, disabled, type = 'text', placeholder }) {
    return (
        <div>
            <label style={lbl}>{icon && <span style={{ marginRight: '5px', verticalAlign: 'middle' }}>{icon}</span>}{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} disabled={disabled}
                placeholder={placeholder || label}
                style={{
                    width: '100%', boxSizing: 'border-box',
                    background: '#232323', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px', padding: '11px 14px',
                    fontSize: '14px', color: disabled ? '#555' : '#fff',
                    fontFamily: 'inherit', outline: 'none',
                    cursor: disabled ? 'default' : 'text', transition: 'border-color 0.2s',
                }}
                onFocus={e => { if (!disabled) e.target.style.borderColor = '#3C83F6'; }}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
        </div>
    );
}

/* ── Button ── */
function Btn({ onClick, disabled, variant, children }) {
    const base = { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', border: 'none' };
    const styles = {
        primary: { ...base, background: disabled ? '#232323' : '#3C83F6', color: '#fff' },
        outline: { ...base, background: 'transparent', color: '#ccc', border: '1px solid rgba(255,255,255,0.15)' },
        danger: { ...base, background: 'transparent', color: '#f87171', border: '1px solid rgba(248,113,113,0.35)' },
    };
    return <button onClick={onClick} disabled={disabled} style={styles[variant]}>{children}</button>;
}

const lbl = { display: 'block', fontSize: '12px', color: '#888', marginBottom: '7px', fontWeight: 500 };
