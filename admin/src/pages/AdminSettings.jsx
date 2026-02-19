import React from 'react';
import { Shield, Key, Bell, Globe, Database, Save } from 'lucide-react';

const C = {
    accent: '#ef4444', blue: '#3b82f6', green: '#22c55e',
    muted: '#a1a1aa', dim: '#555', card: '#111', raised: '#181818',
    border: 'rgba(255,255,255,0.08)', borderS: 'rgba(255,255,255,0.05)',
};

const inp = {
    width: '100%', boxSizing: 'border-box', background: '#0d0d0d',
    border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '10px',
    padding: '11px 14px', fontSize: '13px', color: '#fff',
    fontFamily: 'inherit', outline: 'none',
};

function Section({ Icon, color, title, sub, children }) {
    return (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.borderS}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={color} />
                </div>
                <div>
                    <p style={{ fontWeight: 700, fontSize: '14px' }}>{title}</p>
                    <p style={{ fontSize: '12px', color: C.muted }}>{sub}</p>
                </div>
            </div>
            <div style={{ padding: '20px 24px' }}>{children}</div>
        </div>
    );
}

export default function AdminSettings() {
    return (
        <div style={{ animation: 'fadeIn 0.25s ease', maxWidth: '700px' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Settings</h1>
                <p style={{ fontSize: '14px', color: C.muted }}>Configure the platform and admin access</p>
            </div>

            {/* Security */}
            <Section Icon={Shield} color={C.accent} title="Security" sub="Admin access and authentication settings">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: C.dim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Admin Whitelist (one email per line)</label>
                        <textarea rows={3} defaultValue={'moinsheikh6646@gmail.com'}
                            style={{ ...inp, resize: 'vertical' }}
                            onFocus={e => e.target.style.borderColor = C.accent}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                        <p style={{ fontSize: '11px', color: C.dim, marginTop: '5px' }}>Only these emails can access the admin panel.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: C.raised, borderRadius: '10px', border: `1px solid ${C.borderS}` }}>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: 600 }}>Session-only tokens</p>
                            <p style={{ fontSize: '12px', color: C.muted }}>Admin tokens clear when the browser closes</p>
                        </div>
                        <div style={{ width: '42px', height: '24px', background: C.green, borderRadius: '99px', position: 'relative', cursor: 'pointer' }}>
                            <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '3px', top: '3px' }} />
                        </div>
                    </div>
                </div>
            </Section>

            {/* API */}
            <Section Icon={Key} color={C.blue} title="API Configuration" sub="Backend server connection settings">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: C.dim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>API Base URL</label>
                        <input type="text" defaultValue="http://localhost:5000/api" style={inp}
                            onFocus={e => e.target.style.borderColor = C.blue}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.green, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', color: C.muted }}>Connected — server responding on port 5000</span>
                    </div>
                </div>
            </Section>

            {/* Notifications */}
            <Section Icon={Bell} color={C.accent} title="Notifications" sub="When to be notified">
                {[
                    { label: 'New user registration', sub: 'Email when a new user signs up', on: true },
                    { label: 'New enrollment', sub: 'Email on each course enrollment', on: true },
                    { label: 'Project submissions', sub: 'Email when a project is submitted', on: false },
                ].map(({ label, sub, on }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: `1px solid ${C.borderS}` }}>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: 600 }}>{label}</p>
                            <p style={{ fontSize: '12px', color: C.muted }}>{sub}</p>
                        </div>
                        <div style={{ width: '42px', height: '24px', background: on ? C.green : '#333', borderRadius: '99px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                            <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: on ? 'calc(100% - 21px)' : '3px', transition: 'left 0.2s' }} />
                        </div>
                    </div>
                ))}
            </Section>

            {/* Save */}
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: C.accent, border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(239,68,68,0.3)' }}>
                <Save size={15} /> Save Settings
            </button>
        </div>
    );
}
