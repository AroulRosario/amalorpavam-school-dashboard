import { useApp } from '../context/AppContext'
import {
    LayoutDashboard, Users, BookOpen, Calendar, Settings,
    CreditCard, Layers, BarChart2, Utensils, Package,
    UserCog, LogOut, ChevronRight, Globe, Smartphone, CheckSquare
} from 'lucide-react'

const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'homework', icon: CheckSquare, label: 'Homework Manager 📝' },
    { id: 'studentAppMgr', icon: Smartphone, label: 'Student App Manager 📱' },
    { id: 'fees', icon: CreditCard, label: 'Fee Management', badge: '3' },
    { id: 'content', icon: Layers, label: 'Content Portal' },
    { id: 'events', icon: Calendar, label: 'Events & Calendar' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'canteen', icon: Utensils, label: 'Canteen' },
    { id: 'inventory', icon: Package, label: 'Inventory Store' },
    { id: 'usermgmt', icon: UserCog, label: 'User Management' },
    { id: 'student-view', icon: Users, label: 'Student Dashboard 🎓' },
    { id: 'teacher-view', icon: BookOpen, label: 'Teacher Dashboard 📋' },
]

export default function Sidebar() {
    const { activePage, setActivePage, openModal } = useApp()
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
                {navItems.map((item) => (
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
            <div className="sidebar-footer">
                <button className="nav-item" style={{ width: '100%' }} onClick={() => openModal('systemSettings')}>
                    <Settings size={16} className="nav-icon" />
                    <span>System Settings</span>
                </button>
                <button className="nav-item" style={{ color: 'rgba(255,255,255,.5)', width: '100%' }}>
                    <LogOut size={16} className="nav-icon" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
