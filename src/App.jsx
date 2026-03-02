import { useState } from 'react'
import {
    LayoutDashboard, Users, BookOpen, Calendar, Bell, Settings,
    ChevronRight, Search, TrendingUp, TrendingDown, Bus, CreditCard,
    MessageSquare, Award, Video, FileText, Upload, BarChart2, ShoppingBag,
    Coffee, Clipboard, Star, Globe, UserCog, Database, Layers,
    GraduationCap, ClipboardList, CheckSquare, Play, Zap, MapPin,
    AlertCircle, Package, Utensils, ArrowUp, Home, Book, Mic2,
    PieChart, Activity, Clock, Edit3, Plus, Send, Bot, LogOut, Shield
} from 'lucide-react'

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
const moduleCards = [
    { icon: Bell, color: '#1E50E2', bg: '#E8EFFD', title: 'Circular Distribution', desc: 'Send & track school circulars', tag: '3 New' },
    { icon: Award, color: '#F59E0B', bg: '#FEF3C7', title: 'Rank Card Management', desc: 'Generate & publish rank cards', tag: 'Active' },
    { icon: CreditCard, color: '#EF4444', bg: '#FEE2E2', title: 'Fee Management', desc: '₹2.4L outstanding · Send reminders', tag: '12 Due' },
    { icon: Layers, color: '#8B5CF6', bg: '#EDE9FE', title: 'Content Portal', desc: 'PPTs · PDFs · Video Lectures', tag: 'Upload' },
    { icon: Star, color: '#F59E0B', bg: '#FEF3C7', title: 'Achievements Portal', desc: 'Student competitions & awards', tag: '7 New' },
    { icon: Calendar, color: '#10B981', bg: '#D1FAE5', title: 'Event Calendar', desc: 'Sports Day · Annual Day · Exams', tag: '5 Events' },
    { icon: Utensils, color: '#F97316', bg: '#FFEDD5', title: 'Canteen Management', desc: 'Morning & Lunch order overview', tag: '240 orders' },
    { icon: Package, color: '#0EA5E9', bg: '#E0F2FE', title: 'Inventory Store', desc: 'Uniforms · Notebooks · Books', tag: 'Manage' },
    { icon: BarChart2, color: '#1E50E2', bg: '#E8EFFD', title: 'Performance Analytics', desc: 'Class-wise & subject trending', tag: 'Live' },
    { icon: UserCog, color: '#6366F1', bg: '#EEF2FF', title: 'Principal Appointments', desc: 'Book & manage meeting slots', tag: '4 Pending' },
    { icon: Globe, color: '#14B8A6', bg: '#CCFBF1', title: 'Educational Reels', desc: 'Short-form learning videos', tag: 'New' },
    { icon: Database, color: '#64748B', bg: '#F1F5F9', title: 'Bulk CSV Upload', desc: 'Import Students · Staff · Marks', tag: 'Import' },
]

const performanceData = [
    { month: 'Jun', score: 68 }, { month: 'Jul', score: 72 }, { month: 'Aug', score: 69 },
    { month: 'Sep', score: 78 }, { month: 'Oct', score: 82 }, { month: 'Nov', score: 85 },
    { month: 'Dec', score: 79 }, { month: 'Jan', score: 88 }, { month: 'Feb', score: 91 },
]

const teacherPerf = [
    { name: 'Ms. Anitha K.', subject: 'Mathematics', score: 94, trend: 'up' },
    { name: 'Mr. Rajan S.', subject: 'Physics', score: 88, trend: 'up' },
    { name: 'Ms. Priya M.', subject: 'Chemistry', score: 85, trend: 'down' },
    { name: 'Mr. Arun T.', subject: 'Biology', score: 91, trend: 'up' },
]

const events = [
    { day: '08', month: 'Mar', name: 'Annual Sports Day', desc: 'Ground A — All students' },
    { day: '15', month: 'Mar', name: 'Science Exhibition', desc: 'Main Hall — Classes IX-XII' },
    { day: '22', month: 'Mar', name: 'Parent-Teacher Meet', desc: 'Conference Hall' },
    { day: '28', month: 'Mar', name: 'Board Exam Prep Test', desc: 'Class XII — All subjects' },
]

const homework = [
    { done: true, sub: 'Mathematics', topic: 'Ch.7 Integration – Ex 7.3' },
    { done: false, sub: 'Physics', topic: 'Wave Optics – 5 numericals' },
    { done: false, sub: 'Chemistry', topic: 'Aldehyde reactions summary' },
    { done: true, sub: 'English', topic: 'Essay — Climate Change' },
]

const leaderboard = [
    { rank: 1, name: 'Kavya Nair', score: 98.4 },
    { rank: 2, name: 'Arjun Mehta', score: 97.1 },
    { rank: 3, name: 'Sneha Pillai', score: 96.8 },
    { rank: 4, name: 'Rohan Das', score: 95.2 },
]

const feeData = [
    { term: 'Term 1 (Apr-Jun)', amt: '₹4,200', status: 'Paid', color: 'green' },
    { term: 'Term 2 (Jul-Sep)', amt: '₹4,200', status: 'Paid', color: 'green' },
    { term: 'Term 3 (Oct-Dec)', amt: '₹4,200', status: 'Due', color: 'red' },
]

const chatMessages = [
    { type: 'received', text: 'What chapters for tomorrow?' },
    { type: 'sent', text: 'Ch 8 & 9 of Physics! 📚' },
    { type: 'received', text: 'Thanks teacher! 🙏' },
]

const myClasses = [
    { cls: 'XI-A', subject: 'Mathematics', students: 38, nextAt: '9:00 AM' },
    { cls: 'XI-B', subject: 'Mathematics', students: 36, nextAt: '11:30 AM' },
    { cls: 'XII-A', subject: 'Mathematics', students: 40, nextAt: '1:00 PM' },
]

const classPerfData = [
    { label: 'XI A', score: 84, col: '#1E50E2' },
    { label: 'XI B', score: 76, col: '#6366F1' },
    { label: 'XII A', score: 91, col: '#10B981' },
]

// ──────────────────────────────────────────────
// Tiny Bar Chart
// ──────────────────────────────────────────────
function TinyBar({ data }) {
    const max = Math.max(...data.map(d => d.score))
    return (
        <div className="chart-wrap" style={{ height: 140, paddingTop: 8 }}>
            {data.map((d, i) => (
                <div key={i} className="bar-group">
                    <span className="bar-val">{d.score}</span>
                    <div
                        className="bar"
                        style={{
                            height: `${(d.score / max) * 100}%`,
                            background: d.col || 'linear-gradient(to top, #1034A6, #4F83EE)'
                        }}
                    />
                    <span className="bar-label">{d.month || d.label}</span>
                </div>
            ))}
        </div>
    )
}

// ──────────────────────────────────────────────
// SVG Donut
// ──────────────────────────────────────────────
function DonutChart({ segments }) {
    const size = 90, r = 32, cx = 45, cy = 45
    const circ = 2 * Math.PI * r
    let offset = 0
    const total = segments.reduce((s, x) => s + x.val, 0)
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', flex: '0 0 90px' }}>
            {segments.map((seg, i) => {
                const dash = (seg.val / total) * circ
                const gap = circ - dash
                const el = (
                    <circle key={i}
                        cx={cx} cy={cy} r={r}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={14}
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset}
                        strokeLinecap="round"
                    />
                )
                offset += dash
                return el
            })}
            <circle cx={cx} cy={cy} r={20} fill="white" />
        </svg>
    )
}

// ──────────────────────────────────────────────
// Sidebar
// ──────────────────────────────────────────────
const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'User Management', badge: '3' },
    { icon: GraduationCap, label: 'Students' },
    { icon: BookOpen, label: 'Academics' },
    { icon: Calendar, label: 'Events & Calendar' },
    { icon: CreditCard, label: 'Fee Management', badge: '12' },
    { icon: Layers, label: 'Content Portal' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Award, label: 'Achievements' },
    { icon: Utensils, label: 'Canteen' },
    { icon: Package, label: 'Inventory' },
    { icon: MessageSquare, label: 'Communications' },
    { icon: Settings, label: 'System Settings' },
]

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">A</div>
                <div className="brand-text">
                    <div className="brand-name">Amalorpavam<br />Higher Sec. School</div>
                    <div className="brand-sub">Management System</div>
                </div>
            </div>
            <div className="sidebar-section-label" style={{ padding: '12px 16px 4px' }}>Main Menu</div>
            <nav className="sidebar-nav">
                {navItems.map((item, i) => (
                    <button key={i} className={`nav-item ${item.active ? 'active' : ''}`}>
                        <item.icon className="nav-icon" size={16} />
                        <span>{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </button>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button className="nav-item" style={{ color: 'rgba(255,255,255,.5)', width: '100%' }}>
                    <LogOut size={16} className="nav-icon" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}

// ──────────────────────────────────────────────
// Student Pane
// ──────────────────────────────────────────────
function StudentPane() {
    return (
        <div className="role-pane">
            <div className="pane-header student">
                <div className="pane-avatar">KN</div>
                <div className="pane-header-text">
                    <div className="pane-welcome">Welcome back,</div>
                    <div className="pane-name">Kavya Nair</div>
                    <div className="pane-role">Class XII-A · Roll No. 04</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span className="chip chip-green" style={{ background: 'rgba(16,185,129,.25)', color: '#6ee7b7' }}>🏆 Rank #1</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,.6)' }}>Attendance: 97%</span>
                </div>
            </div>

            <div className="pane-body" style={{ overflowY: 'auto' }}>
                {/* Today's Overview */}
                <div>
                    <div className="pane-section-title">Today's Overview</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div className="mini-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <div className="mini-icon" style={{ background: '#E8EFFD', color: '#1E50E2', width: 26, height: 26, borderRadius: 6 }}>
                                    <Clock size={13} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>Tomorrow's Timetable</span>
                            </div>
                            {[{ t: '8:00', s: 'Physics' }, { t: '9:30', s: 'Maths' }, { t: '11:00', s: 'Chemistry' }].map((r, i) => (
                                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 10, color: '#64748B', padding: '2px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none', width: '100%' }}>
                                    <span style={{ fontWeight: 700, color: '#1E50E2', minWidth: 36 }}>{r.t}</span>
                                    <span>{r.s}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mini-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <div className="mini-icon" style={{ background: '#FEF3C7', color: '#F59E0B', width: 26, height: 26, borderRadius: 6 }}>
                                    <ClipboardList size={13} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>Homework</span>
                            </div>
                            {homework.map((h, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, padding: '2px 0', width: '100%' }}>
                                    <div style={{ width: 12, height: 12, borderRadius: 3, background: h.done ? '#10B981' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {h.done && <span style={{ color: 'white', fontSize: 8, fontWeight: 900 }}>✓</span>}
                                    </div>
                                    <span style={{ color: h.done ? '#94A3B8' : '#334155', textDecoration: h.done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.sub}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Learning Resources */}
                <div>
                    <div className="pane-section-title">Learning Resources</div>
                    <div className="quick-btns">
                        {[
                            { icon: Play, label: 'Video Lectures', color: '#EF4444' },
                            { icon: FileText, label: 'Subject Notes', color: '#1E50E2' },
                            { icon: Zap, label: 'Flashcards', color: '#F59E0B' },
                            { icon: Bot, label: 'AI Assistant', color: '#8B5CF6' },
                        ].map((q, i) => (
                            <button key={i} className={`quick-btn ${i === 3 ? 'active' : ''}`} style={i === 3 ? { background: '#8B5CF6', borderColor: '#8B5CF6' } : {}}>
                                <q.icon size={12} color={i === 3 ? 'white' : q.color} />
                                {q.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Assistant */}
                <div className="ai-widget">
                    <div className="ai-header">
                        <div className="ai-icon">AI</div>
                        <span className="ai-title">AI Study Assistant</span>
                        <span className="chip chip-green" style={{ marginLeft: 'auto', fontSize: 9 }}>● Online</span>
                    </div>
                    <div className="ai-response">
                        💡 <strong>Today's tip:</strong> For Wave Optics, focus on the path difference formula — Δ = d·sinθ. Try the 5 numericals step-by-step using energy conservation!
                    </div>
                </div>

                {/* GPS & Fee */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                        <div className="pane-section-title">School Bus GPS</div>
                        <div className="gps-map">
                            <svg className="gps-roads" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="45" x2="200" y2="45" stroke="#b8d8e8" strokeWidth="4" />
                                <line x1="100" y1="0" x2="100" y2="90" stroke="#b8d8e8" strokeWidth="3" />
                                <line x1="0" y1="20" x2="200" y2="70" stroke="#cce5f0" strokeWidth="2" />
                                <rect x="20" y="25" width="30" height="20" fill="#dbedf5" rx="2" />
                                <rect x="70" y="10" width="25" height="18" fill="#dbedf5" rx="2" />
                                <rect x="140" y="50" width="35" height="22" fill="#dbedf5" rx="2" />
                            </svg>
                            <div className="gps-bus">
                                <div className="gps-pulse" />
                                Bus 03
                            </div>
                            <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 9, color: '#1E50E2', fontWeight: 700, background: 'rgba(255,255,255,.9)', padding: '2px 6px', borderRadius: 4 }}>
                                ETA: 8 mins
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="pane-section-title">Fee Status</div>
                        {feeData.map((f, i) => (
                            <div key={i} className="fee-row">
                                <span style={{ color: '#64748B', fontSize: 10 }}>{f.term.split(' ')[0]}</span>
                                <span style={{ fontWeight: 700, fontSize: 11 }}>{f.amt}</span>
                                <span className={`chip chip-${f.color}`} style={{ fontSize: 9, padding: '1px 6px' }}>{f.status}</span>
                            </div>
                        ))}
                        <button className="btn btn-primary btn-sm" style={{ marginTop: 6, width: '100%', justifyContent: 'center' }}>
                            <CreditCard size={11} /> Pay Now
                        </button>
                    </div>
                </div>

                {/* Leaderboard */}
                <div>
                    <div className="pane-section-title">Class Leaderboard</div>
                    {leaderboard.map((lb, i) => (
                        <div key={i} className="lb-item">
                            <div className={`lb-rank rank-${lb.rank <= 3 ? lb.rank : 'other'}`}>{lb.rank}</div>
                            <div className="lb-name">{lb.name}</div>
                            <div className="lb-score">{lb.score}%</div>
                        </div>
                    ))}
                </div>

                {/* Class Chat */}
                <div>
                    <div className="pane-section-title" style={{ marginBottom: 4 }}>Class Chat</div>
                    <div className="chat-widget">
                        <div className="chat-header">
                            <span>📣 XII-A Class Chat</span>
                            <span style={{ fontSize: 10, opacity: .7 }}>24 members</span>
                        </div>
                        <div className="chat-msg-wrap">
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`chat-msg ${m.type}`}>{m.text}</div>
                            ))}
                        </div>
                        <div className="chat-input-row">
                            <input className="chat-input" placeholder="Type a message…" readOnly />
                            <button className="chat-send"><Send size={12} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ──────────────────────────────────────────────
// Teacher Pane
// ──────────────────────────────────────────────
function TeacherPane() {
    return (
        <div className="role-pane">
            <div className="pane-header teacher">
                <div className="pane-avatar">AK</div>
                <div className="pane-header-text">
                    <div className="pane-welcome">Welcome back,</div>
                    <div className="pane-name">Ms. Anitha Kumar</div>
                    <div className="pane-role">Mathematics Dept. · Senior Teacher</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span className="chip" style={{ background: 'rgba(16,185,129,.25)', color: '#6ee7b7', fontSize: 9 }}>● Available</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,.6)' }}>Top Performer</span>
                </div>
            </div>

            <div className="pane-body" style={{ overflowY: 'auto' }}>
                {/* My Classes */}
                <div>
                    <div className="pane-section-title">My Classes Today</div>
                    {myClasses.map((c, i) => (
                        <div key={i} className="mini-card" style={{ marginBottom: 6 }}>
                            <div className="mini-icon" style={{ background: '#D1FAE5', color: '#059669' }}>
                                <GraduationCap size={16} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="mini-title">{c.cls} — {c.subject}</div>
                                <div className="mini-sub">{c.students} students · Next at {c.nextAt}</div>
                            </div>
                            <span className="chip chip-green" style={{ fontSize: 9, padding: '2px 8px' }}>Go →</span>
                        </div>
                    ))}
                </div>

                {/* Classroom Tools */}
                <div>
                    <div className="pane-section-title">Classroom Tools</div>
                    <div className="tool-grid">
                        {[
                            { icon: CheckSquare, label: 'Mark Attendance', bg: '#E8EFFD', color: '#1E50E2' },
                            { icon: Upload, label: 'Upload Content', bg: '#D1FAE5', color: '#059669' },
                            { icon: Edit3, label: 'Gradebook Entry', bg: '#FEF3C7', color: '#D97706' },
                            { icon: MessageSquare, label: 'Class Chat', bg: '#EDE9FE', color: '#7C3AED' },
                        ].map((t, i) => (
                            <button key={i} className="tool-btn">
                                <div className="tool-btn-icon" style={{ background: t.bg }}>
                                    <t.icon size={16} color={t.color} />
                                </div>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload shortcuts */}
                <div>
                    <div className="pane-section-title">Quick Upload</div>
                    <div className="quick-btns">
                        {[
                            { icon: FileText, label: 'PPT', color: '#EF4444' },
                            { icon: BookOpen, label: 'PDF', color: '#1E50E2' },
                            { icon: Play, label: 'Video', color: '#10B981' },
                            { icon: Mic2, label: 'Audio', color: '#F59E0B' },
                        ].map((q, i) => (
                            <button key={i} className="quick-btn">
                                <q.icon size={12} color={q.color} /> {q.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Class Performance bars */}
                <div>
                    <div className="pane-section-title">Class Performance</div>
                    <TinyBar data={classPerfData} />
                    <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                        {classPerfData.map((c, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: c.col }} />
                                <span style={{ color: '#64748B' }}>{c.label}: <strong style={{ color: '#0D0D0D' }}>{c.score}%</strong></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student grade trends */}
                <div>
                    <div className="pane-section-title">Grade Trends — XII-A</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { name: 'Kavya Nair', avg: 98, trend: 3 },
                            { name: 'Arjun Mehta', avg: 92, trend: -1 },
                            { name: 'Sneha Pillai', avg: 89, trend: 2 },
                            { name: 'Class Avg', avg: 84, trend: 4 },
                        ].map((s, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 11 }}>
                                    <span style={{ fontWeight: 600, color: '#334155' }}>{s.name}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontWeight: 700 }}>
                                        {s.avg}%
                                        <span style={{ color: s.trend > 0 ? '#10B981' : '#EF4444', fontSize: 10 }}>
                                            {s.trend > 0 ? '↑' : '↓'}{Math.abs(s.trend)}
                                        </span>
                                    </span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill"
                                        style={{ width: `${s.avg}%`, background: i === 3 ? 'linear-gradient(90deg,#F59E0B,#EF4444)' : 'linear-gradient(90deg,#059669,#10B981)' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Class Chat */}
                <div>
                    <div className="pane-section-title" style={{ marginBottom: 4 }}>Class Chat</div>
                    <div className="chat-widget">
                        <div className="chat-header" style={{ background: 'linear-gradient(135deg,#065F46,#059669)' }}>
                            <span>📚 XII-A Math Chat</span>
                            <span style={{ fontSize: 10, opacity: .7 }}>40 members</span>
                        </div>
                        <div className="chat-msg-wrap">
                            <div className="chat-msg received">Teacher, can you share the formula sheet?</div>
                            <div className="chat-msg sent">Uploaded it to Content Portal! Check resources section.</div>
                            <div className="chat-msg received">Thank you! 🙏</div>
                        </div>
                        <div className="chat-input-row">
                            <input className="chat-input" placeholder="Message students…" readOnly />
                            <button className="chat-send" style={{ background: '#059669' }}><Send size={12} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ──────────────────────────────────────────────
// Main Admin Dashboard
// ──────────────────────────────────────────────
function AdminDashboard() {
    return (
        <div className="dashboard-body">
            {/* Super Admin Control Bar */}
            <div className="admin-ctrl-bar">
                <Shield size={16} color="rgba(255,255,255,.7)" />
                <span className="admin-ctrl-label">Super Admin Controls</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
                    {[
                        { icon: Settings, label: 'System Settings' },
                        { icon: UserCog, label: 'Role Management' },
                        { icon: Globe, label: 'API Integrations' },
                        { icon: Database, label: 'Bulk CSV Upload', cls: 'green' },
                    ].map((c, i) => (
                        <button key={i} className={`ctrl-btn ${c.cls || ''}`}>
                            <c.icon size={13} />
                            {c.label}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="status-dot online" />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>System Online</span>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="stat-strip">
                {[
                    { icon: Users, val: '1,248', label: 'Total Students', trend: '+8', dir: 'up', cls: 'blue' },
                    { icon: GraduationCap, val: '84', label: 'Teaching Staff', trend: '+2', dir: 'up', cls: 'green' },
                    { icon: CreditCard, val: '₹2.4L', label: 'Outstanding Fees', trend: '-5%', dir: 'down', cls: 'red' },
                    { icon: TrendingUp, val: '88.4%', label: 'Avg Performance', trend: '+3.2%', dir: 'up', cls: 'amber' },
                ].map((s, i) => (
                    <div key={i} className={`stat-card ${s.cls}`}>
                        <div className={`stat-icon ${s.cls}`}>
                            <s.icon size={22} />
                        </div>
                        <div className="stat-info">
                            <div className="stat-value">{s.val}</div>
                            <div className="stat-label">{s.label}</div>
                            <div className={`stat-trend ${s.dir}`}>
                                {s.dir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {s.trend} this month
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Module Grid */}
            <div>
                <div className="section-header">
                    <div className="section-title">
                        <span className="section-title-dot" />
                        Core Modules
                    </div>
                    <span className="section-link">View All <ChevronRight size={12} /></span>
                </div>
                <div className="module-grid">
                    {moduleCards.map((m, i) => (
                        <div key={i} className="module-card">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="module-card-icon" style={{ background: m.bg }}>
                                    <m.icon size={20} color={m.color} />
                                </div>
                                <span className="tag tag-blue" style={{ fontSize: 9 }}>{m.tag}</span>
                            </div>
                            <div>
                                <div className="module-card-title">{m.title}</div>
                                <div className="module-card-desc">{m.desc}</div>
                            </div>
                            <div className="module-card-action">
                                <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px', color: m.color }}>
                                    Open <ChevronRight size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analytics Row */}
            <div className="analytics-row">
                {/* Performance chart */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📊 Classwise Performance Trend</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {['Monthly', 'Term', 'Annual'].map((t, i) => (
                                <button key={i} className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 10px', background: i === 0 ? '#E8EFFD' : 'transparent', color: i === 0 ? '#1E50E2' : '#94A3B8', borderRadius: 6 }}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="card-body">
                        <TinyBar data={performanceData} />
                        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                            {[
                                { label: 'Class Average', val: '88.4%', col: '#1E50E2' },
                                { label: 'Highest Score', val: '98.4%', col: '#10B981' },
                                { label: 'Pass Rate', val: '99.1%', col: '#F59E0B' },
                            ].map((s, i) => (
                                <div key={i} style={{ fontSize: 11 }}>
                                    <div style={{ fontWeight: 800, color: s.col, fontSize: 15 }}>{s.val}</div>
                                    <div style={{ color: '#94A3B8' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fee / Attendance donut */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>💰 Fee Collection</div>
                    </div>
                    <div className="card-body">
                        <div className="donut-wrap">
                            <DonutChart segments={[
                                { val: 76, color: '#10B981' },
                                { val: 14, color: '#F59E0B' },
                                { val: 10, color: '#EF4444' },
                            ]} />
                            <div className="donut-legend">
                                {[
                                    { label: 'Paid', val: '76%', col: '#10B981' },
                                    { label: 'Partial', val: '14%', col: '#F59E0B' },
                                    { label: 'Outstanding', val: '10%', col: '#EF4444' },
                                ].map((l, i) => (
                                    <div key={i} className="legend-item">
                                        <div className="legend-dot" style={{ background: l.col }} />
                                        <span className="legend-label">{l.label}</span>
                                        <span className="legend-val">{l.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="divider" style={{ margin: '14px 0' }} />
                        <button className="btn btn-green btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                            <Send size={12} /> Send Fee Reminders
                        </button>
                    </div>
                </div>
            </div>

            {/* Teacher Perf + Events */}
            <div className="two-col">
                {/* Teacher Performance */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>👨‍🏫 Teacher Performance</div>
                        <span className="chip chip-blue">Based on Student Results</span>
                    </div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr>
                                <th>Teacher</th><th>Subject</th><th>Score</th><th>Trend</th>
                            </tr></thead>
                            <tbody>
                                {teacherPerf.map((t, i) => (
                                    <tr key={i}>
                                        <td><div style={{ fontWeight: 600, fontSize: 12 }}>{t.name}</div></td>
                                        <td><span className="chip chip-blue">{t.subject}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div className="progress-bar" style={{ width: 60 }}>
                                                    <div className="progress-fill" style={{ width: `${t.score}%`, background: 'linear-gradient(90deg,#1034A6,#4F83EE)' }} />
                                                </div>
                                                <span style={{ fontWeight: 700, fontSize: 12 }}>{t.score}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`chip ${t.trend === 'up' ? 'chip-green' : 'chip-red'}`}>
                                                {t.trend === 'up' ? '↑ Up' : '↓ Down'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📅 Upcoming Events</div>
                        <button className="btn btn-primary btn-sm"><Plus size={12} /> Add Event</button>
                    </div>
                    <div className="card-body" style={{ padding: '12px 20px' }}>
                        {events.map((e, i) => (
                            <div key={i} className="event-item">
                                <div className="event-date-box">
                                    <div className="event-day">{e.day}</div>
                                    <div className="event-month">{e.month}</div>
                                </div>
                                <div className="event-info">
                                    <div className="event-name">{e.name}</div>
                                    <div className="event-desc">{e.desc}</div>
                                </div>
                                <ChevronRight size={14} color="#94A3B8" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Canteen + Inventory + Principal Appt */}
            <div className="three-col">
                {/* Canteen */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0A2463' }}>☕ Canteen Orders</div>
                        <span className="chip chip-green">Live</span>
                    </div>
                    <div className="card-body">
                        <div style={{ fontWeight: 700, fontSize: 11, color: '#64748B', marginBottom: 8 }}>MORNING ORDERS</div>
                        {[
                            { label: 'Idli & Sambar', count: 82, pct: 68 },
                            { label: 'Bread & Butter', count: 48, pct: 40 },
                            { label: 'Tea / Coffee', count: 110, pct: 92 },
                        ].map((o, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div className="flex-between" style={{ marginBottom: 3, fontSize: 11 }}>
                                    <span style={{ color: '#334155', fontWeight: 500 }}>{o.label}</span>
                                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{o.count}</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${o.pct}%`, background: 'linear-gradient(90deg,#F97316,#FDBA74)' }} />
                                </div>
                            </div>
                        ))}
                        <div className="divider" />
                        <div style={{ fontWeight: 700, fontSize: 11, color: '#64748B', margin: '8px 0' }}>LUNCH ORDERS</div>
                        {[
                            { label: 'Rice Meals', count: 206, pct: 82 },
                            { label: 'Veg Biryani', count: 64, pct: 51 },
                        ].map((o, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div className="flex-between" style={{ marginBottom: 3, fontSize: 11 }}>
                                    <span style={{ color: '#334155', fontWeight: 500 }}>{o.label}</span>
                                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{o.count}</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${o.pct}%`, background: 'linear-gradient(90deg,#10B981,#34D399)' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inventory */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0A2463' }}>📦 Inventory Store</div>
                        <button className="btn btn-outline btn-sm">Manage</button>
                    </div>
                    <div className="card-body" style={{ padding: '12px 20px' }}>
                        {[
                            { icon: '👕', name: 'School Uniform', stock: 148, orders: 12, color: '#1E50E2' },
                            { icon: '📓', name: 'Notebooks (Set)', stock: 312, orders: 28, color: '#10B981' },
                            { icon: '📚', name: 'Textbooks', stock: 200, orders: 45, color: '#F59E0B' },
                            { icon: '🖊️', name: 'Stationery Kit', stock: 400, orders: 8, color: '#8B5CF6' },
                        ].map((item, i) => (
                            <div key={i} className="order-row">
                                <span style={{ fontSize: 16 }}>{item.icon}</span>
                                <div style={{ flex: 1, marginLeft: 8 }}>
                                    <div style={{ fontWeight: 600, fontSize: 12, color: '#334155' }}>{item.name}</div>
                                    <div style={{ fontSize: 10, color: '#94A3B8' }}>Stock: {item.stock}</div>
                                </div>
                                <span className="chip chip-blue" style={{ fontSize: 10, gap: 2 }}>
                                    {item.orders} orders
                                </span>
                            </div>
                        ))}
                        <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                            <Plus size={12} /> New Order
                        </button>
                    </div>
                </div>

                {/* Principal Appointments */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0A2463' }}>🏛️ Principal Appointments</div>
                        <span className="chip chip-amber">4 Pending</span>
                    </div>
                    <div className="card-body" style={{ padding: '12px 20px' }}>
                        {[
                            { name: 'Mr. Senthil (Parent)', time: '9:30 AM', date: 'Today', type: 'Parent Meet', status: 'Confirmed', col: 'green' },
                            { name: 'Ms. Rekha T. (Staff)', time: '11:00 AM', date: 'Today', type: 'Staff Review', status: 'Confirmed', col: 'green' },
                            { name: 'Parent – Arjun M.', time: '2:30 PM', date: 'Tomorrow', type: 'Academic', status: 'Pending', col: 'amber' },
                            { name: 'Govt. Inspector', time: '10:00 AM', date: 'Mar 5', type: 'Inspection', status: 'Scheduled', col: 'blue' },
                        ].map((a, i) => (
                            <div key={i} style={{ padding: '9px 0', borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A' }}>{a.name}</div>
                                        <div style={{ fontSize: 10, color: '#64748B', display: 'flex', gap: 6, marginTop: 2 }}>
                                            <span>⏰ {a.time}</span>
                                            <span>📅 {a.date}</span>
                                        </div>
                                    </div>
                                    <span className={`chip chip-${a.col}`} style={{ fontSize: 9 }}>{a.status}</span>
                                </div>
                                <span className="tag tag-blue" style={{ fontSize: 9, marginTop: 4, display: 'inline-flex' }}>{a.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Role Panes Section */}
            <div>
                <div className="section-header">
                    <div className="section-title">
                        <span className="section-title-dot" style={{ background: '#10B981' }} />
                        Connected User Views
                    </div>
                    <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Activity size={13} color="#10B981" />
                        Live data flows between all dashboards
                    </span>
                </div>
                <div className="role-panes">
                    <StudentPane />
                    <TeacherPane />
                </div>
            </div>

            <div style={{ height: 24 }} />
        </div>
    )
}

// ──────────────────────────────────────────────
// App Root
// ──────────────────────────────────────────────
export default function App() {
    return (
        <div className="app-shell">
            <Sidebar />
            <div className="main-content">
                {/* Top Header */}
                <header className="top-header">
                    <div className="header-title">Admin Dashboard</div>
                    <div className="header-spacer" />
                    <div className="header-search">
                        <Search size={14} color="var(--gray-400)" />
                        <input placeholder="Search students, teachers, modules…" />
                    </div>
                    <button className="header-btn" style={{ position: 'relative' }}>
                        <Bell size={16} />
                        <div className="notif-dot" />
                    </button>
                    <button className="header-btn">
                        <Calendar size={16} />
                    </button>
                    <button className="header-btn">
                        <MessageSquare size={16} />
                    </button>
                    <div className="avatar">SA</div>
                </header>

                <AdminDashboard />
            </div>
        </div>
    )
}
