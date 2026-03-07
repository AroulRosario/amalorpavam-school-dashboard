import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'

// Pages
import StudentsPage from './pages/Students'
import EventsPage from './pages/Events'
import FeePage from './pages/FeeManagement'
import ContentPage from './pages/ContentPortal'
import CanteenPage from './pages/Canteen'
import InventoryPage from './pages/Inventory'
import AnalyticsPage from './pages/Analytics'
import StudentView from './pages/StudentView'
import TeacherView from './pages/TeacherView'
import StudentAppMgr from './pages/StudentAppManager'
import HomeworkAdmin from './pages/HomeworkAdmin'
import ModuleAwaiting from './pages/ModuleAwaiting'
import ExamAllotment from './pages/ExamAllotment'
import TimetableManager from './pages/TimetableManager'
import TeacherManager from './pages/TeacherManager'

// Mobile Pages
import MobileHome from './pages/MobileHome'
import MobileLearning from './pages/MobileLearning'
import MobileSchedule from './pages/MobileSchedule'
import MobileProfile from './pages/MobileProfile'
import CircularManager from './pages/CircularManager'
import AchievementManager from './pages/AchievementManager'
import BulkImport from './pages/BulkImport'
import UserManagement from './pages/UserManagement'

// Modals
import {
    AddStudentModal, AddEventModal, UploadContentModal, BulkCSVModal,
    FeeReminderModal, AppointmentModal, SystemSettingsModal, GradebookModal,
    RoleManagementModal
} from './components/Modals'

// Icons
import {
    Search, Bell, Calendar, MessageSquare, Settings,
    TrendingUp, TrendingDown, Users, GraduationCap, CreditCard,
    Layers, Award, Package, Utensils, BarChart2, Database,
    UserCog, Globe, Star, Shield, ChevronRight, Plus, Send,
    Activity, CheckSquare, Upload, Edit3, Smartphone, BookOpen, Briefcase, ClipboardCheck
} from 'lucide-react'

// Components
import BottomNav from './components/BottomNav'

// ── Tiny bar chart component ────────────────────────────────
const monthlyData = [
    { month: 'Jun', score: 68 }, { month: 'Jul', score: 72 }, { month: 'Aug', score: 69 },
    { month: 'Sep', score: 78 }, { month: 'Oct', score: 82 }, { month: 'Nov', score: 85 },
    { month: 'Dec', score: 79 }, { month: 'Jan', score: 88 }, { month: 'Feb', score: 91 },
]
function MiniBarChart({ data, height = 130 }) {
    const max = Math.max(...data.map(d => d.score))
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height, paddingTop: 12 }}>
            {data.map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: 1 }}>
                    <span style={{ fontSize: 9, color: '#64748B', fontWeight: 700 }}>{d.score}</span>
                    <div style={{
                        width: '100%', borderRadius: '3px 3px 0 0', minHeight: 4,
                        background: `linear-gradient(to top,#1034A6,#4F83EE)`,
                        height: `${(d.score / max) * 90}%`, transition: 'height .4s ease'
                    }} />
                    <span style={{ fontSize: 9, color: '#94A3B8' }}>{d.month}</span>
                </div>
            ))}
        </div>
    )
}

// ── SVG donut ───────────────────────────────────────────────
function Donut({ segments }) {
    const size = 88, r = 30, cx = 44, cy = 44
    const circ = 2 * Math.PI * r
    let offset = 0
    const total = segments.reduce((s, x) => s + x.val, 0)
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
            style={{ transform: 'rotate(-90deg)', flex: '0 0 88px' }}>
            {segments.map((seg, i) => {
                const dash = (seg.val / total) * circ
                const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                    stroke={seg.color} strokeWidth={14} strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} />
                offset += dash; return el
            })}
            <circle cx={cx} cy={cy} r={18} fill="white" />
        </svg>
    )
}

// ── Admin Dashboard ─────────────────────────────────────────
const moduleCards = [
    { icon: Smartphone, color: '#6366F1', bg: '#EEF2FF', title: 'Student App Manager', desc: 'Control News Feed & Live Classes', tag: 'Advanced', modal: null, page: 'studentAppMgr' },
    { icon: CheckSquare, color: '#10B981', bg: '#D1FAE5', title: 'Homework Manager', desc: 'Assign to individual students', tag: 'New', modal: null, page: 'homework' },
    { icon: UserCog, color: '#8B5CF6', bg: '#EDE9FE', title: 'Teacher Manager', desc: 'Staff CRUD · Permissions · Mapping', tag: 'Core', modal: null, page: 'teacher-mgr' },
    { icon: Calendar, color: '#0EA5E9', bg: '#E0F2FE', title: 'Timetable Manager', desc: 'Class-wise LKG–12 schedules', tag: 'New', modal: null, page: 'timetable' },
    { icon: ClipboardCheck, color: '#F59E0B', bg: '#FEF3C7', title: 'Exam Allotment', desc: 'Assign exams to teachers', tag: 'Active', modal: null, page: 'exams' },
    { icon: Bell, color: '#1E50E2', bg: '#E8EFFD', title: 'Circular Distribution', desc: 'Send & track school circulars', tag: '3 New', modal: null, page: 'circulars' },
    { icon: Award, color: '#F59E0B', bg: '#FEF3C7', title: 'Rank Card Management', desc: 'Generate & publish rank cards', tag: 'Active', modal: null, page: 'analytics' },
    { icon: CreditCard, color: '#EF4444', bg: '#FEE2E2', title: 'Fee Management', desc: '₹2.4L outstanding · Send reminders', tag: '12 Due', modal: 'feeReminder', page: 'fees' },
    { icon: Layers, color: '#8B5CF6', bg: '#EDE9FE', title: 'Content Portal', desc: 'PPTs · PDFs · Video Lectures', tag: 'Upload', modal: 'uploadContent', page: 'content' },
    { icon: Star, color: '#F59E0B', bg: '#FEF3C7', title: 'Achievements Portal', desc: 'Student competitions & awards', tag: '7 New', modal: null, page: 'achievements' },
    { icon: Calendar, color: '#10B981', bg: '#D1FAE5', title: 'Event Calendar', desc: 'Sports Day · Annual Day · Exams', tag: '5 Events', modal: null, page: 'events' },
    { icon: Utensils, color: '#F97316', bg: '#FFEDD5', title: 'Canteen Management', desc: 'Morning & Lunch order overview', tag: 'Live', modal: null, page: 'canteen' },
    { icon: Package, color: '#0EA5E9', bg: '#E0F2FE', title: 'Inventory Store', desc: 'Uniforms · Notebooks · Books', tag: 'Manage', modal: null, page: 'inventory' },
    { icon: BarChart2, color: '#1E50E2', bg: '#E8EFFD', title: 'Performance Analytics', desc: 'Class-wise & subject trending', tag: 'Live', modal: null, page: 'analytics' },
    { icon: Database, color: '#64748B', bg: '#F1F5F9', title: 'Bulk CSV Upload', desc: 'Import Students · Staff · Marks', tag: 'Import', modal: 'bulkCSV', page: 'bulk-import' },
]

function AdminDashboard() {
    const { openModal, setActivePage, addToast, students, events, appointments } = useApp()

    const teacherPerf = [
        { name: 'Ms. Anitha K.', subject: 'Mathematics', score: 94, trend: 'up' },
        { name: 'Mr. Rajan S.', subject: 'Physics', score: 88, trend: 'up' },
        { name: 'Ms. Priya M.', subject: 'Chemistry', score: 85, trend: 'down' },
        { name: 'Mr. Arun T.', subject: 'Biology', score: 91, trend: 'up' },
    ]
    const eventsSlice = events.slice(0, 4)
    const apptSlice = appointments.slice(0, 4)

    return (
        <div className="dashboard-body">
            {/* Super Admin Ctrl Bar */}
            <div className="admin-ctrl-bar">
                <Shield size={16} color="rgba(255,255,255,.7)" />
                <span className="admin-ctrl-label">Super Admin</span>
                {[
                    { label: 'System Settings', icon: Settings, fn: () => openModal('systemSettings') },
                    { label: 'Role Management', icon: UserCog, fn: () => openModal('roleManagement') },
                    { label: 'API Integrations', icon: Globe, fn: () => addToast('API settings opened!', 'info') },
                    { label: 'Bulk CSV Upload', icon: Database, fn: () => openModal('bulkCSV'), cls: 'green' },
                ].map((c, i) => (
                    <button key={i} className={`ctrl-btn ${c.cls || ''}`} onClick={c.fn}>
                        <c.icon size={13} />{c.label}
                    </button>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="status-dot online" />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>System Online</span>
                </div>
            </div>

            {/* KPI strip */}
            <div className="stat-strip">
                {[
                    { icon: Users, val: students.length.toLocaleString(), label: 'Total Students', trend: '+8', dir: 'up', cls: 'blue', page: 'students' },
                    { icon: GraduationCap, val: '84', label: 'Teaching Staff', trend: '+2', dir: 'up', cls: 'green', page: 'usermgmt' },
                    { icon: CreditCard, val: '₹2.4L', label: 'Outstanding Fees', trend: '-5%', dir: 'down', cls: 'red', page: 'fees' },
                    { icon: TrendingUp, val: '88.4%', label: 'Avg Performance', trend: '+3.2%', dir: 'up', cls: 'amber', page: 'analytics' },
                ].map((s, i) => (
                    <div key={i} className={`stat-card ${s.cls}`} onClick={() => setActivePage(s.page)} style={{ cursor: 'pointer' }}>
                        <div className={`stat-icon ${s.cls}`}><s.icon size={22} /></div>
                        <div className="stat-info">
                            <div className="stat-value">{s.val}</div>
                            <div className="stat-label">{s.label}</div>
                            <div className={`stat-trend ${s.dir}`}>
                                {s.dir === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                                {s.trend} this month
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Module grid */}
            <div>
                <div className="section-header">
                    <div className="section-title"><span className="section-title-dot" />Core Modules</div>
                </div>
                <div className="module-grid">
                    {moduleCards.map((m, i) => (
                        <div key={i} className="module-card"
                            onClick={() => {
                                if (m.modal) openModal(m.modal)
                                else if (m.page) setActivePage(m.page)
                                else addToast(`${m.title} — coming soon!`, 'info')
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="module-card-icon" style={{ background: m.bg }}><m.icon size={20} color={m.color} /></div>
                                <span className="tag tag-blue" style={{ fontSize: 9 }}>{m.tag}</span>
                            </div>
                            <div>
                                <div className="module-card-title">{m.title}</div>
                                <div className="module-card-desc">{m.desc}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: 11, color: m.color, fontWeight: 600, gap: 4 }}>
                                Open <ChevronRight size={11} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analytics row */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }}>
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📊 Performance Trend</div>
                        <button className="btn btn-outline btn-sm" onClick={() => setActivePage('analytics')}>Full Analytics</button>
                    </div>
                    <div className="card-body"><MiniBarChart data={monthlyData} /></div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>💰 Fee Collection</div>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <Donut segments={[{ val: 76, color: '#10B981' }, { val: 14, color: '#F59E0B' }, { val: 10, color: '#EF4444' }]} />
                            <div style={{ flex: 1 }}>
                                {[{ l: 'Paid', v: '76%', col: '#10B981' }, { l: 'Partial', v: '14%', col: '#F59E0B' }, { l: 'Outstanding', v: '10%', col: '#EF4444' }].map((x, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 12 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: x.col, flexShrink: 0 }} />
                                        <span style={{ color: '#64748B', flex: 1 }}>{x.l}</span>
                                        <span style={{ fontWeight: 800 }}>{x.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-green btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}
                            onClick={() => openModal('feeReminder')}>
                            <Send size={12} /> Send Reminders
                        </button>
                    </div>
                </div>
            </div>

            {/* Teacher perf + Events */}
            <div className="two-col">
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>👨‍🏫 Teacher Performance</div>
                        <button className="btn btn-outline btn-sm" onClick={() => setActivePage('analytics')}>View All</button>
                    </div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Teacher</th><th>Subject</th><th>Score</th><th>Trend</th></tr></thead>
                            <tbody>
                                {teacherPerf.map((t, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, fontSize: 12 }}>{t.name}</td>
                                        <td><span className="chip chip-blue">{t.subject}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div className="progress-bar" style={{ width: 50 }}>
                                                    <div className="progress-fill" style={{ width: `${t.score}%`, background: 'linear-gradient(90deg,#1034A6,#4F83EE)' }} />
                                                </div>
                                                <span style={{ fontWeight: 700, fontSize: 12 }}>{t.score}</span>
                                            </div>
                                        </td>
                                        <td><span className={`chip chip-${t.trend === 'up' ? 'green' : 'red'}`}>{t.trend === 'up' ? '↑ Up' : '↓ Down'}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📅 Upcoming Events</div>
                        <button className="btn btn-primary btn-sm" onClick={() => openModal('addEvent')}><Plus size={12} /> Add</button>
                    </div>
                    <div style={{ padding: '8px 20px' }}>
                        {eventsSlice.length === 0 && <div style={{ color: '#94A3B8', fontSize: 13, padding: 16, textAlign: 'center' }}>No events. Add one!</div>}
                        {eventsSlice.map((e, i) => (
                            <div key={i} className="event-item">
                                <div className="event-date-box">
                                    <div className="event-day">{e.day}</div>
                                    <div className="event-month">{e.month}</div>
                                </div>
                                <div className="event-info">
                                    <div className="event-name">{e.name}</div>
                                    <div className="event-desc">{e.desc}</div>
                                </div>
                                <button className="btn btn-ghost btn-sm" onClick={() => setActivePage('events')}>→</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Appointments quick view */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>🏛️ Principal Appointments</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setActivePage('events')}>View All</button>
                        <button className="btn btn-primary btn-sm" onClick={() => openModal('addAppointment')}><Plus size={12} /> Book</button>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '12px 20px', gap: 12 }}>
                    {apptSlice.map((a, i) => (
                        <div key={i} style={{ padding: 14, background: '#F8FAFC', borderRadius: 12, border: '1.5px solid #E2E8F0' }}>
                            <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A', marginBottom: 4 }}>{a.name}</div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>⏰ {a.time} · 📅 {a.date}</div>
                            <span className={`chip chip-${a.status === 'Confirmed' ? 'green' : a.status === 'Pending' ? 'amber' : 'blue'}`} style={{ fontSize: 10 }}>{a.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Role views nav */}
            <div>
                <div className="section-header">
                    <div className="section-title"><span className="section-title-dot" style={{ background: '#10B981' }} />User Role Views</div>
                    <span style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Activity size={13} color="#10B981" />Click a card to open the dashboard (Internal View)
                    </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Student preview card */}
                    <div style={{ background: 'linear-gradient(135deg,#1034A6,#1E50E2)', borderRadius: 20, padding: 24, color: 'white', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all .2s' }}
                        onClick={() => setActivePage('student-view')}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = ''}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.2)', border: '2px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>KN</div>
                            <div>
                                <div style={{ fontSize: 11, opacity: .7 }}>Internal Student Dashboard</div>
                                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800 }}>Kavya Nair</div>
                                <div style={{ fontSize: 12, opacity: .75 }}>Class XII-A · Rank #1</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {['📋 Overview', '📚 Learning', '🚌 GPS', '💬 Chat'].map(b => (
                                <div key={b} style={{ background: 'rgba(255,255,255,.15)', borderRadius: 8, padding: '5px 10px', fontSize: 11, fontWeight: 600 }}>{b}</div>
                            ))}
                        </div>
                        <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(255,255,255,.2)', borderRadius: 10, padding: '8px 16px', fontSize: 12, fontWeight: 700 }}>
                            Open Internal View →
                        </div>
                    </div>
                    {/* Teacher preview card */}
                    <div style={{ background: 'linear-gradient(135deg,#065F46,#059669)', borderRadius: 20, padding: 24, color: 'white', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all .2s' }}
                        onClick={() => setActivePage('teacher-view')}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = ''}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.2)', border: '2px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>AK</div>
                            <div>
                                <div style={{ fontSize: 11, opacity: .7 }}>Teacher Dashboard</div>
                                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800 }}>Ms. Anitha Kumar</div>
                                <div style={{ fontSize: 12, opacity: .75 }}>Mathematics · Senior Teacher</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {['✅ Attendance', '📝 Grades', '📤 Upload', '💬 Chat'].map(b => (
                                <div key={b} style={{ background: 'rgba(255,255,255,.15)', borderRadius: 8, padding: '5px 10px', fontSize: 11, fontWeight: 600 }}>{b}</div>
                            ))}
                        </div>
                        <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(255,255,255,.2)', borderRadius: 10, padding: '8px 16px', fontSize: 12, fontWeight: 700 }}>
                            Open Dashboard →
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: 24 }} />
        </div>
    )
}

// ── Modal dispatcher ────────────────────────────────────────
function ModalDispatcher() {
    const { modal } = useApp()
    if (!modal) return null
    const map = {
        addStudent: <AddStudentModal />,
        addEvent: <AddEventModal />,
        uploadContent: <UploadContentModal />,
        bulkCSV: <BulkCSVModal />,
        feeReminder: <FeeReminderModal />,
        addAppointment: <AppointmentModal />,
        systemSettings: <SystemSettingsModal />,
        gradebook: <GradebookModal />,
        roleManagement: <RoleManagementModal />,
    }
    return map[modal.type] || null
}

// ── Page titles map ─────────────────────────────────────────
const pageTitles = {
    dashboard: 'Admin Dashboard',
    students: 'Students',
    fees: 'Fee Management',
    content: 'Content Portal',
    events: 'Events & Calendar',
    analytics: 'Analytics',
    canteen: 'Canteen Management',
    inventory: 'Inventory Store',
    usermgmt: 'User Management',
    studentAppMgr: 'Student App Manager',
    homework: 'Homework Manager',
    exams: 'Exam Allotment',
    'teacher-mgr': 'Teacher Manager',
    timetable: 'Timetable Manager',
    'student-view': 'Student View — Kavya Nair',
    'teacher-view': 'Teacher View — Ms. Anitha Kumar',
    'mobile-home': 'Welcome, Kavya',
    'mobile-learning': 'Learning Center',
    'mobile-schedule': 'Today\'s Schedule',
    'mobile-profile': 'Profile',
}

// ── Admin Login Screen ──────────────────────────────────
function AdminLogin() {
    const { loginAdmin } = useApp()
    const [email, setEmail] = useState('admin@amal.edu')
    const [pass, setPass] = useState('admin123')
    const [err, setErr] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        if (!loginAdmin(email, pass)) setErr('Invalid admin credentials.')
    }

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #071845, #1034A6)', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'white', borderRadius: 32, padding: 48, width: 440, boxShadow: '0 40px 100px rgba(0,0,0,0.4)', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg, #10B981, #1E50E2)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 36, fontWeight: 900, boxShadow: '0 10px 25px rgba(16,185,129,0.3)' }}>A</div>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0A2463', margin: 0 }}>Super Admin Login</h1>
                <p style={{ color: '#64748B', fontSize: 16, marginTop: 8, marginBottom: 32 }}>Amalorpavam School Management Suite</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginLeft: 4 }}>ADMIN EMAIL</label>
                        <input className="form-input" style={{ width: '100%', padding: '14px 18px', borderRadius: 16, marginTop: 6, border: '2px solid #F1F5F9', fontSize: 15 }} value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginLeft: 4 }}>PASSWORD</label>
                        <input className="form-input" type="password" style={{ width: '100%', padding: '14px 18px', borderRadius: 16, marginTop: 6, border: '2px solid #F1F5F9', fontSize: 15 }} value={pass} onChange={e => setPass(e.target.value)} />
                    </div>
                    {err && <div style={{ background: '#FEE2E2', color: '#EF4444', padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 700 }}>{err}</div>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 18, fontSize: 16, fontWeight: 800, justifyContent: 'center', marginTop: 12 }}>Access Dashboard</button>
                </form>

                <div style={{ marginTop: 40, padding: 20, background: '#F8FAFC', borderRadius: 20, border: '1px solid #E2E8F0', textAlign: 'left' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#1034A6', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>System Access:</div>
                    <div style={{ fontSize: 13, color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Email:</span> <span style={{ fontWeight: 700, color: '#0F172A' }}>admin@amal.edu</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748B', display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span>Pass:</span> <span style={{ fontWeight: 700, color: '#0F172A' }}>admin123</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

// ── App Shell ────────────────────────────────────────────────
export default function App() {
    const { activePage, setActivePage, openModal, addToast, admin, logoutAdmin } = useApp()

    if (!admin) return <AdminLogin />

    const isMobileView = activePage.startsWith('mobile-')

    const pageContent = {
        dashboard: <AdminDashboard />,
        students: <StudentsPage />,
        fees: <FeePage />,
        content: <ContentPage />,
        events: <EventsPage />,
        analytics: <AnalyticsPage />,
        canteen: <CanteenPage />,
        inventory: <InventoryPage />,
        usermgmt: <UserManagement />,
        studentAppMgr: <StudentAppMgr />,
        homework: <HomeworkAdmin />,
        exams: <ExamAllotment />,
        'teacher-mgr': <TeacherManager />,
        timetable: <TimetableManager />,
        'student-view': <StudentView />,
        'teacher-view': <TeacherView />,
        'mobile-home': <MobileHome />,
        'mobile-learning': <MobileLearning />,
        'mobile-schedule': <MobileSchedule />,
        'mobile-profile': <MobileProfile />,
        circulars: <CircularManager />,
        achievements: <AchievementManager />,
        'bulk-import': <BulkImport />,
    }

    if (isMobileView) {
        return (
            <div className="mobile-shell">
                {pageContent[activePage]}
                <BottomNav />
                <ModalDispatcher />
                <Toast />
            </div>
        )
    }

    return (
        <div className="app-shell">
            <Sidebar />
            <div className="main-content">
                <header className="top-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {activePage !== 'dashboard' && (
                            <button className="btn btn-ghost btn-sm" onClick={() => setActivePage('dashboard')} style={{ padding: '4px 8px' }}>←</button>
                        )}
                        <div className="header-title">{pageTitles[activePage] || 'Dashboard'}</div>
                    </div>
                    <div className="header-spacer" />
                    <div className="header-search">
                        <Search size={14} color="var(--gray-400)" />
                        <input placeholder="Search students, modules…" />
                    </div>
                    <button className="header-btn" onClick={() => addToast('3 new notifications', 'info')}>
                        <Bell size={16} /><div className="notif-dot" />
                    </button>
                    <button className="header-btn" onClick={() => setActivePage('events')}>
                        <Calendar size={16} />
                    </button>
                    <button className="header-btn" onClick={() => addToast('Opening messages…', 'info')}>
                        <MessageSquare size={16} />
                    </button>
                    <button className="header-btn" onClick={() => openModal('systemSettings')}>
                        <Settings size={16} />
                    </button>
                    <div className="avatar" title="Logout" onClick={() => { if (confirm('Logout of Admin Portal?')) logoutAdmin() }}>SA</div>
                </header>
                {pageContent[activePage] || <AdminDashboard />}
            </div>
            <ModalDispatcher />
            <Toast />
        </div>
    )
}
