import React, { useState } from 'react';
import {
    Search, Filter, MessageSquare, Send, Trash2, X,
    Clock, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp,
    MailOpen, Reply,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformStore';

const C = {
    accent: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#f59e0b',
    purple: '#a855f7', muted: '#a1a1aa', dim: '#555', card: '#111',
    border: 'rgba(255,255,255,0.08)', borderS: 'rgba(255,255,255,0.05)',
};

const STATUS_COLORS = {
    open: { bg: 'rgba(59,130,246,0.1)', color: C.blue },
    'in-progress': { bg: 'rgba(245,158,11,0.1)', color: C.yellow },
    replied: { bg: 'rgba(34,197,94,0.1)', color: C.green },
    closed: { bg: 'rgba(85,85,85,0.15)', color: C.dim },
};

const CAT_COLORS = {
    general: C.blue,
    bug: C.accent,
    feature: C.purple,
    billing: C.yellow,
    other: C.muted,
};

export default function AdminContacts() {
    const {
        contacts, contactsLoading, fetchContacts,
        updateContactStatus, replyToContact, deleteContact,
    } = usePlatform();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expanded, setExpanded] = useState(null);

    /* Reply modal */
    const [replyTarget, setReplyTarget] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [replying, setReplying] = useState(false);

    /* Delete confirm */
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = contacts.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.subject.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const openCount = contacts.filter(c => c.status === 'open').length;
    const inProgressCount = contacts.filter(c => c.status === 'in-progress').length;
    const repliedCount = contacts.filter(c => c.status === 'replied').length;

    const handleReply = async () => {
        if (!replyText.trim() || !replyTarget) return;
        setReplying(true);
        try {
            await replyToContact(replyTarget._id, replyText);
            setReplyTarget(null);
            setReplyText('');
        } catch (_) { /* toast is shown by context */ }
        finally { setReplying(false); }
    };

    const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }) : '—';

    return (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Contact Submissions</h1>
                <p style={{ fontSize: '14px', color: C.muted }}>Manage user messages, reply to inquiries, and track ticket status</p>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                {[
                    { label: 'Total', value: contacts.length, color: C.muted },
                    { label: 'Open', value: openCount, color: C.blue },
                    { label: 'In Progress', value: inProgressCount, color: C.yellow },
                    { label: 'Replied', value: repliedCount, color: C.green },
                ].map(s => (
                    <div key={s.label} style={{
                        padding: '10px 18px', borderRadius: 10, background: C.card,
                        border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        <span style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</span>
                        <span style={{ fontSize: 11, color: C.dim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <Search size={14} color={C.dim} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                        type="text" placeholder="Search by name, email, or subject…" value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', boxSizing: 'border-box', background: '#0d0d0d', border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px 12px 10px 36px', fontSize: '13px', color: '#fff', fontFamily: 'inherit', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = C.accent}
                        onBlur={e => e.target.style.borderColor = C.border}
                    />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['all', 'open', 'in-progress', 'replied', 'closed'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)} style={{
                            padding: '8px 14px', borderRadius: 9, border: `1px solid ${statusFilter === s ? C.accent : C.border}`,
                            background: statusFilter === s ? 'rgba(239,68,68,0.1)' : 'transparent',
                            color: statusFilter === s ? C.accent : C.muted, fontSize: 12, fontWeight: 600,
                            fontFamily: 'inherit', cursor: 'pointer', textTransform: 'capitalize',
                            transition: 'all 0.15s',
                        }}>
                            {s === 'all' ? 'All' : s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ticket list */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                {contactsLoading ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: C.dim, fontSize: 13 }}>
                        <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite', marginBottom: 8 }} /><br />Loading tickets…
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: C.dim, fontSize: 13 }}>
                        <MessageSquare size={24} style={{ marginBottom: 8, opacity: 0.4 }} /><br />No tickets found.
                    </div>
                ) : filtered.map((ticket, idx) => {
                    const isExpanded = expanded === ticket._id;
                    const sc = STATUS_COLORS[ticket.status] || STATUS_COLORS.open;
                    const cc = CAT_COLORS[ticket.category] || C.muted;
                    return (
                        <div key={ticket._id} style={{ borderBottom: idx < filtered.length - 1 ? `1px solid ${C.borderS}` : 'none' }}>
                            {/* Ticket row */}
                            <div
                                onClick={() => setExpanded(isExpanded ? null : ticket._id)}
                                style={{
                                    padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
                                    cursor: 'pointer', transition: 'background 0.12s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#161616'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                {/* Avatar */}
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                                    background: `linear-gradient(135deg, ${cc}, ${cc}88)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800, fontSize: 12, color: '#fff',
                                }}>
                                    {(ticket.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                                        <span style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{ticket.name}</span>
                                        <span style={{ fontSize: 11, color: C.dim }}>·</span>
                                        <span style={{ fontSize: 11, color: C.dim }}>{ticket.email}</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: 13, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <strong style={{ color: '#ddd' }}>{ticket.subject}</strong>
                                    </p>
                                </div>

                                {/* Category */}
                                <span style={{
                                    background: `${cc}18`, color: cc, borderRadius: 20,
                                    padding: '3px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: 0.5, flexShrink: 0,
                                }}>
                                    {ticket.category}
                                </span>

                                {/* Status */}
                                <span style={{
                                    background: sc.bg, color: sc.color, borderRadius: 20,
                                    padding: '3px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: 0.5, flexShrink: 0,
                                }}>
                                    {ticket.status}
                                </span>

                                {/* Date */}
                                <span style={{ fontSize: 11, color: C.dim, flexShrink: 0, minWidth: 100 }}>
                                    {fmtDate(ticket.createdAt)}
                                </span>

                                {/* Expand icon */}
                                {isExpanded ? <ChevronUp size={14} color={C.dim} /> : <ChevronDown size={14} color={C.dim} />}
                            </div>

                            {/* Expanded detail */}
                            {isExpanded && (
                                <div style={{
                                    padding: '0 20px 18px 70px', animation: 'fadeIn 0.2s ease',
                                }}>
                                    <div style={{
                                        background: '#0a0a0a', border: `1px solid ${C.borderS}`,
                                        borderRadius: 10, padding: '16px 18px', marginBottom: 14,
                                    }}>
                                        <p style={{ fontSize: 12, color: C.dim, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Message</p>
                                        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>
                                            {ticket.message}
                                        </p>
                                    </div>

                                    {/* Actions row */}
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {/* Reply */}
                                        <button onClick={() => { setReplyTarget(ticket); setReplyText(''); }} style={{
                                            display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
                                            borderRadius: 8, border: `1px solid rgba(59,130,246,0.2)`,
                                            background: 'rgba(59,130,246,0.06)', color: C.blue,
                                            fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                                            transition: 'all 0.15s',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.12)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.06)'}
                                        >
                                            <Reply size={12} /> Reply
                                        </button>

                                        {/* Status change */}
                                        {ticket.status !== 'closed' && (
                                            <>
                                                {ticket.status === 'open' && (
                                                    <button onClick={() => updateContactStatus(ticket._id, 'in-progress')} style={{
                                                        display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
                                                        borderRadius: 8, border: `1px solid rgba(245,158,11,0.2)`,
                                                        background: 'rgba(245,158,11,0.06)', color: C.yellow,
                                                        fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                                                        transition: 'all 0.15s',
                                                    }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.12)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.06)'}
                                                    >
                                                        <Clock size={12} /> Mark In Progress
                                                    </button>
                                                )}
                                                <button onClick={() => updateContactStatus(ticket._id, 'closed')} style={{
                                                    display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
                                                    borderRadius: 8, border: `1px solid rgba(85,85,85,0.3)`,
                                                    background: 'rgba(85,85,85,0.06)', color: C.dim,
                                                    fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                                                    transition: 'all 0.15s',
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(85,85,85,0.12)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(85,85,85,0.06)'}
                                                >
                                                    <CheckCircle2 size={12} /> Close Ticket
                                                </button>
                                            </>
                                        )}
                                        {ticket.status === 'closed' && (
                                            <button onClick={() => updateContactStatus(ticket._id, 'open')} style={{
                                                display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
                                                borderRadius: 8, border: `1px solid rgba(59,130,246,0.2)`,
                                                background: 'rgba(59,130,246,0.06)', color: C.blue,
                                                fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                                                transition: 'all 0.15s',
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.12)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.06)'}
                                            >
                                                <MailOpen size={12} /> Reopen
                                            </button>
                                        )}

                                        {/* Delete */}
                                        <button onClick={() => setDeleteTarget(ticket)} style={{
                                            display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
                                            borderRadius: 8, border: `1px solid rgba(239,68,68,0.2)`,
                                            background: 'rgba(239,68,68,0.04)', color: C.accent,
                                            fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                                            transition: 'all 0.15s', marginLeft: 'auto',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.04)'}
                                        >
                                            <Trash2 size={12} /> Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div style={{ padding: '12px 20px', borderTop: `1px solid ${C.borderS}`, fontSize: '12px', color: C.dim }}>
                    Showing {filtered.length} of {contacts.length} tickets
                </div>
            </div>

            {/* ══ REPLY MODAL ══ */}
            {replyTarget && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
                }} onClick={() => setReplyTarget(null)}>
                    <div onClick={e => e.stopPropagation()} style={{
                        background: '#111', border: `1px solid ${C.border}`, borderRadius: 16,
                        padding: '28px 28px 24px', width: '100%', maxWidth: 520,
                        position: 'relative', animation: 'fadeIn 0.2s ease',
                    }}>
                        <button onClick={() => setReplyTarget(null)} style={{
                            position: 'absolute', top: 14, right: 14, background: 'none',
                            border: 'none', color: C.dim, cursor: 'pointer', padding: 4,
                        }}><X size={18} /></button>

                        <div style={{ marginBottom: 18 }}>
                            <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 6px', color: '#fff' }}>
                                <Reply size={16} style={{ marginRight: 8, verticalAlign: '-2px' }} />
                                Reply to {replyTarget.name}
                            </h2>
                            <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>
                                Re: <strong style={{ color: C.muted }}>{replyTarget.subject}</strong> · {replyTarget.email}
                            </p>
                        </div>

                        {/* Original message excerpt */}
                        <div style={{
                            background: '#0a0a0a', border: `1px solid ${C.borderS}`, borderRadius: 10,
                            padding: '12px 14px', marginBottom: 16, maxHeight: 100, overflowY: 'auto',
                        }}>
                            <p style={{ fontSize: 11, color: C.dim, fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Original Message</p>
                            <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{replyTarget.message}</p>
                        </div>

                        <textarea
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            placeholder="Type your reply…"
                            rows={5}
                            style={{
                                width: '100%', boxSizing: 'border-box', background: '#0d0d0d',
                                border: `1px solid ${C.border}`, borderRadius: 10,
                                padding: '12px 14px', fontSize: 13, color: '#fff',
                                fontFamily: 'inherit', outline: 'none', resize: 'vertical',
                                lineHeight: 1.6, marginBottom: 14,
                            }}
                            onFocus={e => e.target.style.borderColor = C.blue}
                            onBlur={e => e.target.style.borderColor = C.border}
                            autoFocus
                        />

                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setReplyTarget(null)} style={{
                                padding: '10px 20px', borderRadius: 9, border: `1px solid ${C.border}`,
                                background: 'transparent', color: C.muted, fontSize: 13, fontWeight: 600,
                                fontFamily: 'inherit', cursor: 'pointer',
                            }}>
                                Cancel
                            </button>
                            <button onClick={handleReply} disabled={replying || !replyText.trim()} style={{
                                padding: '10px 22px', borderRadius: 9, border: 'none',
                                background: C.blue, color: '#fff', fontSize: 13, fontWeight: 700,
                                fontFamily: 'inherit', cursor: replying ? 'wait' : 'pointer',
                                opacity: (replying || !replyText.trim()) ? 0.5 : 1,
                                display: 'flex', alignItems: 'center', gap: 6, transition: 'opacity 0.15s',
                            }}>
                                {replying
                                    ? <><Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> Sending…</>
                                    : <><Send size={14} /> Send Reply</>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ DELETE CONFIRM MODAL ══ */}
            {deleteTarget && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
                }} onClick={() => setDeleteTarget(null)}>
                    <div onClick={e => e.stopPropagation()} style={{
                        background: '#111', border: `1px solid ${C.border}`, borderRadius: 14,
                        padding: '24px 24px 20px', width: '100%', maxWidth: 380,
                        animation: 'fadeIn 0.2s ease',
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: 18 }}>
                            <Trash2 size={28} color={C.accent} style={{ marginBottom: 8 }} />
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>Delete Ticket?</h3>
                            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>
                                This will permanently delete the ticket from <strong>{deleteTarget.name}</strong>.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => setDeleteTarget(null)} style={{
                                flex: 1, padding: '10px', borderRadius: 9, border: `1px solid ${C.border}`,
                                background: 'transparent', color: C.muted, fontSize: 13, fontWeight: 600,
                                fontFamily: 'inherit', cursor: 'pointer',
                            }}>
                                Cancel
                            </button>
                            <button onClick={() => { deleteContact(deleteTarget._id); setDeleteTarget(null); setExpanded(null); }} style={{
                                flex: 1, padding: '10px', borderRadius: 9, border: 'none',
                                background: C.accent, color: '#fff', fontSize: 13, fontWeight: 700,
                                fontFamily: 'inherit', cursor: 'pointer',
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
