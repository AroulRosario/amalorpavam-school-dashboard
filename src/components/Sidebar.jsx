import { useApp } from '../context/AppContext'
import {
    LayoutDashboard, Users, BookOpen, Calendar, Settings,
    CreditCard, Layers, BarChart2, Utensils, Package,
    UserCog, LogOut, ChevronRight, Globe, Smartphone, CheckSquare,
    Bell, Award, Database
} from 'lucide-react'

const navGroups = [
    {
        label: 'Main Menu',
        items: [
            { id: 'dashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
            { id: 'students', icon: Users, label: 'Student Roster' },
            { id: 'usermgmt', icon: UserCog, label: 'User Management Hub' },
            { id: 'studentAppMgr', icon: Smartphone, label: 'App Feed & Live' },
        ]
    },
    {
        label: 'Academic & Admin',
        items: [
            { id: 'homework', icon: CheckSquare, label: 'Homework Manager' },
            { id: 'exams', icon: BookOpen, label: 'Exam Allotment' },
            { id: 'timetable', icon: Calendar, label: 'Timetable Manager' },
            { id: 'class-mgr', icon: Layers, label: 'Class Management' },
            { id: 'circulars', icon: Bell, label: 'Circulars & Notices' },
            { id: 'achievements', icon: Award, label: 'Hall of Fame' },
        ]
    },
    {
        label: 'Services & Tools',
        items: [
            { id: 'fees', icon: CreditCard, label: 'Fee Specialist', badge: '3' },
            { id: 'analytics', icon: BarChart2, label: 'Performance Hub' },
            { id: 'inventory', icon: Package, label: 'Inventory Store' },
            { id: 'bulk-import', icon: Database, label: 'Bulk Data Import' },
        ]
    }
]

export default function Sidebar() {
    const { activePage, setActivePage, openModal, logoutAdmin } = useApp()
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">A</div>
                <div className="brand-text">
                    <div className="brand-name">Amalorpavam<br />Higher Sec. School</div>
                    <div className="brand-sub">Management System</div>
                </div>
            </div>
            {navGroups.map((group, idx) => (
                <div key={idx}>
                    <div className="sidebar-section-label" style={{ padding: '16px 16px 4px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 }}>{group.label}</div>
                    <nav className="sidebar-nav">
                        {group.items.map((item) => (
                            <button key={item.id}
                                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                                onClick={() => setActivePage(item.id)}
                            >
                                <item.icon className="nav-icon" size={16} />
                                <span>{item.label}</span>
                                {item.badge && <span className="nav-badge">{item.badge}</span>}
                                {activePage === item.id && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: .7 }} />}
                            </button>
                        ))}
                    </nav>
                </div>
            ))}
            <div className="sidebar-footer">
                <button className="nav-item" style={{ width: '100%' }} onClick={() => openModal('systemSettings')}>
                    <Settings size={16} className="nav-icon" />
                    <span>System Settings</span>
                </button>
                <button
                    className="nav-item"
                    style={{ color: '#EF4444', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', borderRadius: 0, marginTop: 4 }}
                    onClick={() => { if (confirm('Logout of Admin Portal?')) logoutAdmin() }}
                >
                    <LogOut size={16} className="nav-icon" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
