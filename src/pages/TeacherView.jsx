import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Send, Upload, CheckSquare, Edit3, Play, FileText, Mic2, Book } from 'lucide-react'

const myClasses = [
    { cls: 'XI-A', students: 38, nextAt: '9:00 AM', room: 'Room 12', topic: 'Differential Equations' },
    { cls: 'XI-B', students: 36, nextAt: '11:30 AM', room: 'Room 14', topic: 'Coordinate Geometry' },
    { cls: 'XII-A', students: 40, nextAt: '1:00 PM', room: 'Room 12', topic: 'Integration by Parts' },
]

const studentGrades = [
    { name: 'Kavya Nair', maths: 98, physics: 95, avg: 98.4, trend: 3 },
    { name: 'Arjun Mehta', maths: 94, physics: 92, avg: 97.1, trend: -1 },
    { name: 'Sneha Pillai', maths: 90, physics: 88, avg: 96.8, trend: 2 },
    { name: 'Rohan Das', maths: 88, physics: 86, avg: 95.2, trend: 1 },
]

export default function TeacherView() {
    const { attendance, toggleAttendance, openModal, addToast } = useApp()
    const [tab, setTab] = useState('classes')
    const [chatMsgs, setChatMsgs] = useState([
        { type: 'received', text: 'Teacher, can you share the formula sheet?', sender: 'Arjun' },
        { type: 'sent', text: 'Uploaded it to the Content Portal!', sender: 'You' },
        { type: 'received', text: 'Thank you! 🙏', sender: 'Kavya' },
    ])
    const [chatInput, setChatInput] = useState('')

    const sendMsg = () => {
        if (!chatInput.trim()) return
        setChatMsgs(m => [...m, { type: 'sent', text: chatInput, sender: 'You' }])
        setChatInput('')
        setTimeout(() => setChatMsgs(m => [...m, { type: 'received', text: 'Thank you, teacher! 🙏', sender: 'Student' }]), 900)
    }

    const attNames = Object.keys(attendance)
    const presentCount = Object.values(attendance).filter(a => a.present).length

    return (
        <div className="dashboard-body">
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#065F46,#059669)', borderRadius: 20, padding: 24, color: 'white', display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,.2)', border: '3px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>AK</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: .7, marginBottom: 4 }}>Teacher Dashboard</div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800 }}>Welcome, Ms. Anitha Kumar 👋</div>
                    <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>Mathematics Dept. · Senior Teacher · Top Performer</div>
                </div>
                <div style={{ display: 'flex', gap: 16, textAlign: 'center' }}>
                    {[{ val: '3', lbl: 'Classes Today' }, { val: '114', lbl: 'Students' }, { val: '94%', lbl: 'Performance' }].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,.15)', borderRadius: 12, padding: '12px 20px' }}>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800 }}>{s.val}</div>
                            <div style={{ fontSize: 11, opacity: .7, marginTop: 2 }}>{s.lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab nav */}
            <div style={{ display: 'flex', gap: 8 }}>
                {['classes', 'attendance', 'gradebook', 'content', 'chat'].map(t => (
                    <button key={t} className="btn"
                        style={{
                            background: tab === t ? '#059669' : 'white', color: tab === t ? 'white' : '#475569',
                            border: '1.5px solid ' + (tab === t ? '#059669' : '#E2E8F0'), textTransform: 'capitalize'
                        }}
                        onClick={() => setTab(t)}>
                        {t === 'classes' ? '🏫 My Classes' : t === 'attendance' ? '✅ Attendance' : t === 'gradebook' ? '📝 Gradebook' : t === 'content' ? '📤 Content' : '💬 Chat'}
                    </button>
                ))}
            </div>

            {tab === 'classes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {myClasses.map((c, i) => (
                        <div key={i} className="card">
                            <div style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                                <div style={{ width: 56, height: 56, borderRadius: 12, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏫</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{c.cls} — Mathematics</div>
                                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{c.students} students · {c.room} · Next: {c.nextAt}</div>
                                    <div style={{ fontSize: 12, color: '#059669', fontWeight: 600, marginTop: 4 }}>📌 Today's Topic: {c.topic}</div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="btn btn-outline btn-sm" onClick={() => { setTab('attendance'); addToast(`Taking attendance for ${c.cls}…`, 'info') }}>✅ Attendance</button>
                                    <button className="btn btn-green btn-sm" onClick={() => addToast(`Opening ${c.cls} class…`, 'success')}>Enter Class</button>
                                </div>
                            </div>
                            {/* Student performance quick view */}
                            <div style={{ borderTop: '1px solid #F1F5F9', padding: 16 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>Class Avg: 88% · Pass Rate: 100%</div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {studentGrades.slice(0, 3).map((s, j) => (
                                        <div key={j} style={{ flex: 1, background: '#F8FAFC', borderRadius: 10, padding: '8px 10px', border: '1px solid #E2E8F0' }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{s.name.split(' ')[0]}</div>
                                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800, color: '#059669' }}>{s.avg}%</div>
                                            <div style={{ fontSize: 10, color: s.trend > 0 ? '#10B981' : '#EF4444', fontWeight: 700 }}>{s.trend > 0 ? '↑' : ' ↓'}{Math.abs(s.trend)} pts</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'attendance' && (
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, color: '#0A2463', fontSize: 14 }}>✅ Attendance — XII-A · Today</div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#10B981' }}>{presentCount} Present</span>
                            <span style={{ fontSize: 13, color: '#EF4444', fontWeight: 700 }}>{attNames.length - presentCount} Absent</span>
                            <button className="btn btn-green btn-sm" onClick={() => addToast('Attendance saved!', 'success')}>💾 Save</button>
                        </div>
                    </div>
                    <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                        {attNames.map((name, i) => {
                            const a = attendance[name]
                            return (
                                <div key={i} onClick={() => toggleAttendance(name)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                                        background: a.present ? '#F0FDF4' : '#FFF1F2',
                                        border: `1.5px solid ${a.present ? '#6EE7B7' : '#FCA5A5'}`,
                                        borderRadius: 12, cursor: 'pointer', transition: 'all .2s'
                                    }}>
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%', background: a.present ? '#D1FAE5' : '#FEE2E2',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12,
                                        color: a.present ? '#059669' : '#EF4444'
                                    }}>
                                        {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>{name}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>Roll {a.roll}</div>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: 13, color: a.present ? '#059669' : '#EF4444' }}>
                                        {a.present ? 'Present ✓' : 'Absent ✗'}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-green" onClick={() => addToast('Attendance saved & SMS sent to parents!', 'success')}>
                            💾 Save & Notify Parents
                        </button>
                    </div>
                </div>
            )}

            {tab === 'gradebook' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div className="card-header">
                            <div style={{ fontWeight: 700, color: '#0A2463' }}>📝 Grade Trends — XII-A</div>
                            <button className="btn btn-primary btn-sm" onClick={() => openModal('gradebook')}>Open Full Gradebook</button>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead><tr><th>Student</th><th>Maths</th><th>Physics</th><th>Avg</th><th>Trend</th></tr></thead>
                                <tbody>
                                    {studentGrades.map((s, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 700 }}>{s.name}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                    <div className="progress-bar" style={{ width: 50 }}><div className="progress-fill" style={{ width: `${s.maths}%`, background: '#1E50E2' }} /></div>
                                                    <span style={{ fontWeight: 700 }}>{s.maths}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                    <div className="progress-bar" style={{ width: 50 }}><div className="progress-fill" style={{ width: `${s.physics}%`, background: '#8B5CF6' }} /></div>
                                                    <span style={{ fontWeight: 700 }}>{s.physics}</span>
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 800, color: '#059669', fontSize: 15, fontFamily: 'Outfit,sans-serif' }}>{s.avg}%</td>
                                            <td><span style={{ color: s.trend > 0 ? '#10B981' : '#EF4444', fontWeight: 700 }}>{s.trend > 0 ? '↑ +' : ' ↓'}{Math.abs(s.trend)}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                        {[
                            { icon: FileText, label: 'Upload PDF', col: '#EF4444', bg: '#FEE2E2' },
                            { icon: Play, label: 'Upload Video', col: '#8B5CF6', bg: '#EDE9FE' },
                            { icon: Book, label: 'Upload PPT', col: '#F59E0B', bg: '#FEF3C7' },
                            { icon: Mic2, label: 'Upload Audio', col: '#10B981', bg: '#D1FAE5' },
                        ].map((q, i) => (
                            <button key={i} onClick={() => openModal('uploadContent')}
                                style={{
                                    background: q.bg, border: `1.5px solid ${q.col}30`, borderRadius: 14, padding: 20,
                                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                                    transition: 'all .2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${q.col}25` }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                                <q.icon size={28} color={q.col} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: q.col }}>{q.label}</span>
                            </button>
                        ))}
                    </div>
                    <div style={{ border: '2px dashed #CBD5E1', borderRadius: 14, padding: 32, textAlign: 'center', cursor: 'pointer', background: '#FAFAFA' }}
                        onClick={() => openModal('uploadContent')}>
                        <div style={{ fontSize: 40, marginBottom: 8 }}>📤</div>
                        <div style={{ fontWeight: 700, color: '#475569', fontSize: 14, marginBottom: 4 }}>Drag & drop or click to upload</div>
                        <div style={{ fontSize: 12, color: '#94A3B8' }}>PDF · PPT · MP4 · Audio · Flashcards · Microlearning</div>
                    </div>
                </div>
            )}

            {tab === 'chat' && (
                <div className="card" style={{ maxWidth: 600 }}>
                    <div style={{ background: 'linear-gradient(135deg,#065F46,#059669)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>📚 XII-A Maths Chat</div>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>40 members</span>
                    </div>
                    <div style={{ height: 320, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {chatMsgs.map((m, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'sent' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 2, padding: '0 4px' }}>{m.sender}</div>
                                <div style={{
                                    padding: '8px 14px', borderRadius: m.type === 'sent' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                                    background: m.type === 'sent' ? '#059669' : '#F1F5F9', color: m.type === 'sent' ? 'white' : '#334155',
                                    fontSize: 13, maxWidth: '75%'
                                }}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9' }}>
                        <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMsg()}
                            placeholder="Message students…"
                            style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 16px', fontSize: 13, color: '#334155' }}
                        />
                        <button onClick={sendMsg} style={{ padding: '0 18px', background: '#059669', border: 'none', cursor: 'pointer', color: 'white' }}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
