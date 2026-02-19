import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const C = {
    bg: '#000', surface: '#111', card: '#181818',
    border: 'rgba(255,255,255,0.09)', borderS: 'rgba(255,255,255,0.05)',
    accent: '#ef4444', text: '#fff', muted: '#a1a1aa', dim: '#555',
};

export default function AdminLogin() {
    const { login, loginErr, setLoginErr } = useAdminAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const ok = await login(email, password);
        setLoading(false);
        if (ok) navigate('/');
    };

    const inp = {
        width: '100%', boxSizing: 'border-box',
        background: '#0d0d0d',
        border: `1px solid ${C.border}`,
        borderRadius: '10px', padding: '13px 14px 13px 42px',
        fontSize: '14px', color: C.text, fontFamily: 'inherit', outline: 'none',
        transition: 'border-color 0.2s',
    };

    return (
        <div style={{
            minHeight: '100vh', background: C.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 60%)',
        }}>
            <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.3s ease' }}>

                {/* Logo + badge */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '16px',
                        background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                    }}>
                        <Shield size={28} color={C.accent} />
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px' }}>
                        LevelUp<span style={{ color: C.accent }}>.dev</span>
                    </h1>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: 700, color: C.accent,
                    }}>
                        <Lock size={11} /> ADMIN PANEL
                    </div>
                </div>

                {/* Card */}
                <div style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: '20px', padding: '32px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Sign in to Admin</h2>
                    <p style={{ fontSize: '13px', color: C.muted, marginBottom: '24px' }}>
                        Restricted access — authorised personnel only.
                    </p>

                    {/* Error */}
                    {loginErr && (
                        <div style={{
                            display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '18px',
                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)',
                            borderRadius: '10px', padding: '12px 14px',
                        }}>
                            <AlertCircle size={15} color={C.accent} style={{ marginTop: '1px', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: '#fca5a5', lineHeight: 1.5 }}>{loginErr}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Email */}
                        <div style={{ position: 'relative' }}>
                            <Mail size={15} color={C.dim} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            <input
                                type="email" required autoComplete="email"
                                placeholder="Admin email"
                                value={email} onChange={e => { setEmail(e.target.value); setLoginErr(''); }}
                                style={inp}
                                onFocus={e => e.target.style.borderColor = C.accent}
                                onBlur={e => e.target.style.borderColor = C.border}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ position: 'relative' }}>
                            <Lock size={15} color={C.dim} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            <input
                                type={showPw ? 'text' : 'password'} required
                                placeholder="Password"
                                value={password} onChange={e => { setPassword(e.target.value); setLoginErr(''); }}
                                style={{ ...inp, paddingRight: '42px' }}
                                onFocus={e => e.target.style.borderColor = C.accent}
                                onBlur={e => e.target.style.borderColor = C.border}
                            />
                            <button type="button" onClick={() => setShowPw(p => !p)} style={{
                                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer', color: C.dim, padding: '4px',
                            }}>
                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading} style={{
                            padding: '13px', borderRadius: '10px', border: 'none',
                            background: loading ? '#3a0808' : C.accent,
                            color: '#fff', fontSize: '14px', fontWeight: 700,
                            cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                            boxShadow: loading ? 'none' : '0 4px 20px rgba(239,68,68,0.35)',
                            transition: 'all 0.2s', marginTop: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            {loading ? (
                                <>
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
                                    Verifying…
                                </>
                            ) : (
                                <><Shield size={15} /> Sign In to Admin</>
                            )}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', fontSize: '12px', color: C.dim, marginTop: '20px' }}>
                    This panel is monitored and access-logged. Unauthorised access is prohibited.
                </p>
            </div>
        </div>
    );
}
