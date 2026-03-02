import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Send, Play, Zap, Bot, FileText, Clock, ClipboardList, CreditCard } from 'lucide-react'

const leaderboard = [
    { rank: 1, name: 'Kavya Nair', score: 98.4, cls: 'XII-A' },
    { rank: 2, name: 'Arjun Mehta', score: 97.1, cls: 'XII-A' },
    { rank: 3, name: 'Sneha Pillai', score: 96.8, cls: 'XII-B' },
    { rank: 4, name: 'Rohan Das', score: 95.2, cls: 'XI-A' },
]

const timetable = [
    { time: '8:00 AM', sub: 'Physics', teacher: 'Mr. Rajan S.', room: 'Lab 2' },
    { time: '9:30 AM', sub: 'Mathematics', teacher: 'Ms. Anitha K.', room: 'Room 12' },
    { time: '11:00 AM', sub: 'Chemistry', teacher: 'Ms. Priya M.', room: 'Lab 1' },
    { time: '1:30 PM', sub: 'English', teacher: 'Ms. Leela V.', room: 'Room 8' },
    { time: '3:00 PM', sub: 'Biology', teacher: 'Mr. Arun T.', room: 'Lab 3' },
]

export default function StudentView() {
    const { homework, toggleHomework, addToast } = useApp()
    const [chatMsgs, setChatMsgs] = useState([
        { type: 'received', text: 'What chapters for tomorrow?', sender: 'Arjun' },
        { type: 'sent', text: 'Ch 8 & 9 of Physics! 📚', sender: 'You' },
        { type: 'received', text: 'Thanks! 🙏', sender: 'Sneha' },
    ])
    const [chatInput, setChatInput] = useState('')
    const [tab, setTab] = useState('overview')

    const sendMsg = () => {
        if (!chatInput.trim()) return
        setChatMsgs(m => [...m, { type: 'sent', text: chatInput, sender: 'You' }])
        setChatInput('')
        setTimeout(() => setChatMsgs(m => [...m, { type: 'received', text: 'Got it! Thanks 👍', sender: 'Kavya' }]), 1000)
    }

    const feeStatus = [
        { term: 'Term 1', amt: '₹4,200', status: 'Paid', col: 'green' },
        { term: 'Term 2', amt: '₹4,200', status: 'Paid', col: 'green' },
        { term: 'Term 3', amt: '₹4,200', status: 'Due', col: 'red' },
    ]

    return (
        <div className="dashboard-body">
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#1034A6,#1E50E2)', borderRadius: 20, padding: 24, color: 'white', display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,.2)', border: '3px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>KN</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: .7, marginBottom: 4 }}>Student Dashboard</div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800 }}>Welcome, Kavya Nair 👋</div>
                    <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>Class XII-A · Roll No. 04 · Rank #1 in class</div>
                </div>
                <div style={{ display: 'flex', gap: 16, textAlign: 'center' }}>
                    {[{ val: '98.4%', lbl: 'Average' }, { val: '97%', lbl: 'Attendance' }, { val: '#1', lbl: 'Class Rank' }].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,.15)', borderRadius: 12, padding: '12px 20px' }}>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800 }}>{s.val}</div>
                            <div style={{ fontSize: 11, opacity: .7, marginTop: 2 }}>{s.lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab nav */}
            <div style={{ display: 'flex', gap: 8 }}>
                {['overview', 'learning', 'social'].map(t => (
                    <button key={t} className="btn"
                        style={{ background: tab === t ? '#0A2463' : 'white', color: tab === t ? 'white' : '#475569', border: '1.5px solid ' + (tab === t ? '#0A2463' : '#E2E8F0'), textTransform: 'capitalize' }}
                        onClick={() => setTab(t)}>
                        {t === 'overview' ? '📋 Overview' : t === 'learning' ? '📚 Learning' : '💬 Social'}
                    </button>
                ))}
            </div>

            {tab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Timetable */}
                    <div className="card">
                        <div className="card-header"><div style={{ fontWeight: 700, color: '#0A2463' }}>📅 Tomorrow's Timetable</div></div>
                        <div style={{ padding: '0 16px 16px' }}>
                            {timetable.map((p, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < timetable.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                                    <div style={{ background: '#E8EFFD', borderRadius: 8, padding: '6px 10px', textAlign: 'center', minWidth: 70 }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#1E50E2' }}>{p.time}</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>{p.sub}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{p.teacher} · {p.room}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Homework */}
                    <div className="card">
                        <div className="card-header">
                            <div style={{ fontWeight: 700, color: '#0A2463' }}>✏️ Homework</div>
                            <span style={{ fontSize: 12, color: '#94A3B8' }}>{homework.filter(h => h.done).length}/{homework.length} done</span>
                        </div>
                        <div style={{ padding: '0 16px 16px' }}>
                            {homework.map(h => (
                                <div key={h.id} onClick={() => toggleHomework(h.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #F1F5F9',
                                        cursor: 'pointer', transition: 'all .15s', opacity: h.done ? .6 : 1
                                    }}>
                                    <div style={{
                                        width: 20, height: 20, borderRadius: 5, background: h.done ? '#10B981' : '#E2E8F0',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        border: '2px solid ' + (h.done ? '#10B981' : '#CBD5E1'), transition: 'all .2s'
                                    }}>
                                        {h.done && <span style={{ color: 'white', fontSize: 11, fontWeight: 900 }}>✓</span>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A', textDecoration: h.done ? 'line-through' : 'none' }}>{h.sub}</div>
                                        <div style={{ fontSize: 11, color: '#64748B', textDecoration: h.done ? 'line-through' : 'none' }}>{h.topic}</div>
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: 12 }}>
                                <div className="progress-bar" style={{ height: 8 }}>
                                    <div className="progress-fill" style={{ width: `${(homework.filter(h => h.done).length / homework.length) * 100}%`, background: 'linear-gradient(90deg,#059669,#10B981)' }} />
                                </div>
                                <div style={{ fontSize: 11, color: '#64748B', marginTop: 6 }}>
                                    {homework.filter(h => h.done).length} of {homework.length} tasks completed
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fee Status */}
                    <div className="card">
                        <div className="card-header"><div style={{ fontWeight: 700, color: '#0A2463' }}>💳 Fee Status</div></div>
                        <div className="card-body">
                            {feeStatus.map((f, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{f.term}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700 }}>{f.amt}</span>
                                    <span className={`chip chip-${f.col}`}>{f.status}</span>
                                </div>
                            ))}
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}
                                onClick={() => addToast('Redirecting to payment gateway…', 'info')}>
                                <CreditCard size={14} /> Pay Term 3 — ₹4,200
                            </button>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="card">
                        <div className="card-header"><div style={{ fontWeight: 700, color: '#0A2463' }}>🏆 Class Leaderboard</div></div>
                        <div className="card-body" style={{ paddingTop: 8 }}>
                            {leaderboard.map((lb, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', borderRadius: 10, background: lb.rank === 1 ? '#FFFBEB' : 'transparent', marginBottom: 4 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: lb.rank === 1 ? '#FFD700' : lb.rank === 2 ? '#C0C0C0' : lb.rank === 3 ? '#cd7f32' : '#F1F5F9',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: lb.rank <= 3 ? 'white' : '#64748B', flexShrink: 0
                                    }}>
                                        {lb.rank}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>{lb.name}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{lb.cls}</div>
                                    </div>
                                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800, color: '#1E50E2' }}>{lb.score}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {tab === 'learning' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Quick access */}
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ fontWeight: 700, color: '#0A2463', fontSize: 14, marginBottom: 16 }}>📚 Learning Resources</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                            {[
                                { icon: Play, label: 'Video Lectures', col: '#EF4444', bg: '#FEE2E2', msg: 'Opening video library…' },
                                { icon: FileText, label: 'Subject Notes', col: '#1E50E2', bg: '#E8EFFD', msg: 'Loading notes…' },
                                { icon: Zap, label: 'Flashcards', col: '#F59E0B', bg: '#FEF3C7', msg: 'Opening flashcard deck…' },
                                { icon: Bot, label: 'AI Assistant', col: '#8B5CF6', bg: '#EDE9FE', msg: 'Starting AI chat…' },
                            ].map((q, i) => (
                                <button key={i} onClick={() => addToast(q.msg, 'info')}
                                    style={{
                                        background: q.bg, border: `1.5px solid ${q.col}30`, borderRadius: 14, padding: '20px 12px',
                                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'all .2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${q.col}25` }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                                    <q.icon size={28} color={q.col} />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: q.col, textAlign: 'center' }}>{q.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Widget */}
                    <div style={{ background: 'linear-gradient(135deg,#EFF6FF,#F0FDF4)', border: '1.5px solid #BFDBFE', borderRadius: 16, padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#1E50E2,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>AI</div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 14, color: '#0A2463' }}>AI Study Assistant</div>
                                <div style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>● Online — ready to help</div>
                            </div>
                        </div>
                        <div style={{ background: 'white', borderRadius: 10, padding: 14, border: '1.5px solid #BFDBFE', fontSize: 13, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>
                            💡 <strong>Today's tip:</strong> For Wave Optics, focus on the path difference formula — Δ = d·sinθ. Try solving the 5 numericals step-by-step using energy conservation principles first!
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {['Explain Wave Optics', 'Practice problems', 'Summarize Chapter 8'].map(q => (
                                <button key={q} className="btn btn-outline btn-sm" onClick={() => addToast(`AI: Working on "${q}"…`, 'info')}>{q}</button>
                            ))}
                        </div>
                    </div>

                    {/* School bus GPS */}
                    <div className="card">
                        <div className="card-header"><div style={{ fontWeight: 700, color: '#0A2463' }}>🚌 School Bus GPS</div><span className="chip chip-green">● Live</span></div>
                        <div className="card-body">
                            <div style={{ height: 120, background: 'linear-gradient(135deg,#e8f4f8,#d4eef7)', borderRadius: 12, border: '1px solid #b8dcea', position: 'relative', overflow: 'hidden', marginBottom: 12 }}>
                                <svg viewBox="0 0 400 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .4 }}>
                                    <line x1="0" y1="60" x2="400" y2="60" stroke="#b8d8e8" strokeWidth="6" />
                                    <line x1="200" y1="0" x2="200" y2="120" stroke="#b8d8e8" strokeWidth="4" />
                                    <rect x="30" y="30" width="60" height="40" fill="#dbedf5" rx="4" />
                                    <rect x="150" y="10" width="50" height="35" fill="#dbedf5" rx="4" />
                                    <rect x="290" y="65" width="70" height="45" fill="#dbedf5" rx="4" />
                                </svg>
                                <div style={{
                                    position: 'absolute', top: 40, animation: 'busMove 4s ease-in-out infinite alternate',
                                    background: '#1E50E2', color: 'white', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700,
                                    display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(30,80,226,.4)'
                                }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 1.5s infinite' }} />
                                    🚌 Bus 03
                                </div>
                                <div style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(255,255,255,.9)', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#1E50E2' }}>
                                    ETA: 8 mins
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                {[{ lbl: 'Bus No.', val: 'Bus 03' }, { lbl: 'Driver', val: 'Mr. Selvam' }, { lbl: 'ETA', val: '8 mins' }, { lbl: 'Route', val: 'NH-45 → School' }].map((d, i) => (
                                    <div key={i} style={{ flex: 1, textAlign: 'center', background: '#F8FAFC', borderRadius: 10, padding: '8px 6px', border: '1px solid #E2E8F0' }}>
                                        <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600 }}>{d.lbl}</div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginTop: 3 }}>{d.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'social' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Class Chat */}
                    <div className="card">
                        <div className="card-header"><div style={{ fontWeight: 700, color: '#0A2463' }}>💬 XII-A Class Chat</div><span style={{ fontSize: 12, color: '#94A3B8' }}>24 members</span></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 16, height: 240, overflowY: 'auto' }}>
                            {chatMsgs.map((m, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'sent' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 2, padding: '0 4px' }}>{m.sender}</div>
                                    <div style={{
                                        padding: '8px 12px', borderRadius: m.type === 'sent' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                                        background: m.type === 'sent' ? '#1E50E2' : '#F1F5F9', color: m.type === 'sent' ? 'white' : '#334155',
                                        fontSize: 13, maxWidth: '80%'
                                    }}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9' }}>
                            <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                                placeholder="Type a message…"
                                style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 16px', fontSize: 13, color: '#334155' }}
                            />
                            <button onClick={sendMsg} style={{ padding: '0 16px', background: '#1E50E2', border: 'none', cursor: 'pointer', color: 'white', borderRadius: '0 0 14px 0' }}>
                                <Send size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Principal's Message */}
                    <div className="card">
                        <div className="card-header"><div style={{ fontWeight: 700, color: '#0A2463' }}>📣 Principal's Message</div></div>
                        <div className="card-body">
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#0A2463,#1E50E2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18 }}>P</div>
                                <div>
                                    <div style={{ fontWeight: 800, color: '#0F172A' }}>Fr. Joseph Antony</div>
                                    <div style={{ fontSize: 12, color: '#64748B' }}>Principal, Amalorpavam HSS</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.8, fontStyle: 'italic', borderLeft: '3px solid #1E50E2', paddingLeft: 14, marginBottom: 14 }}>
                                "Dear students, your dedication and hardwork are the pillars of our school's excellence. Approach every exam with confidence and remember — learning is a lifelong journey. God bless you all!"
                            </div>
                            <div style={{ fontSize: 11, color: '#94A3B8' }}>Posted: March 1, 2026</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
