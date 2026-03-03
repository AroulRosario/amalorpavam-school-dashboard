import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Users, GraduationCap, ShieldCheck, Search, Filter, Mail, Phone, MoreVertical, Trash2, Edit3, CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UserManagement() {
    const {
        teachers, addTeacher, updateTeacher, deleteTeacher,
        students, addStudent, updateStudent, deleteStudent,
        addToast, openModal
    } = useApp()

    const [activeTab, setActiveTab] = useState('teachers')
    const [searchTerm, setSearchTerm] = useState('')
    const [classFilter, setClassFilter] = useState('All')

    const admins = [
        { id: 'admin1', name: 'Fr. Joseph A.', email: 'admin@amal.edu', role: 'Super Admin', active: true, phone: '9840001122' },
        { id: 'admin2', name: 'Mrs. Selvi R.', email: 'selvi@amal.edu', role: 'Academic Coordinator', active: true, phone: '9840001123' },
    ]

    const tabs = [
        { id: 'teachers', label: 'Staff & Teachers', icon: Users, count: teachers.length, color: '#10B981' },
        { id: 'students', label: 'Students', icon: GraduationCap, count: students.length, color: '#1E50E2' },
        { id: 'admins', label: 'Administrators', icon: ShieldCheck, count: admins.length, color: '#7C3AED' },
    ]

    const filteredData = () => {
        let base = []
        if (activeTab === 'teachers') base = teachers
        else if (activeTab === 'students') base = students
        else base = admins

        return base.filter(u => {
            const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesClass = activeTab === 'students' && classFilter !== 'All' ? u.class === classFilter : true
            return matchesSearch && matchesClass
        })
    }

    const currentList = filteredData()

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>User Management Hub</h2>
                    <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Centralized control for all school account types</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-outline" onClick={() => openModal('roleManagement')}>
                        <ShieldCheck size={18} /> Permissions
                    </button>
                    <button className="btn btn-primary" onClick={() => {
                        if (activeTab === 'teachers') {
                            const name = prompt('Teacher Name:')
                            const email = prompt('Email:')
                            if (name && email) addTeacher({ name, email, subjects: [], classes: [] })
                        } else if (activeTab === 'students') {
                            openModal('addStudent')
                        } else {
                            addToast('Admin creation restricted to Super Admin only.', 'info')
                        }
                    }}>
                        + New {activeTab === 'teachers' ? 'Staff' : activeTab === 'students' ? 'Student' : 'Admin'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => { setActiveTab(t.id); setSearchTerm(''); setClassFilter('All') }}
                        style={{
                            flex: 1,
                            padding: '16px 24px',
                            borderRadius: 20,
                            border: 'none',
                            background: activeTab === t.id ? t.color : 'white',
                            color: activeTab === t.id ? 'white' : '#64748B',
                            boxShadow: activeTab === t.id ? `0 10px 20px ${t.color}30` : '0 4px 12px rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ padding: 8, background: activeTab === t.id ? 'rgba(255,255,255,0.2)' : '#F1F5F9', borderRadius: 12 }}>
                            <t.icon size={20} color={activeTab === t.id ? 'white' : t.color} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, fontWeight: 800 }}>{t.label}</div>
                            <div style={{ fontSize: 11, opacity: 0.7 }}>{t.count} Active Users</div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="card" style={{ padding: 16, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', padding: '10px 16px', borderRadius: 14 }}>
                    <Search size={18} color="#94A3B8" />
                    <input
                        placeholder={`Search ${activeTab}...`}
                        style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: 14 }}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                {activeTab === 'students' && (
                    <select
                        className="form-input"
                        style={{ width: 140, marginBottom: 0 }}
                        value={classFilter}
                        onChange={e => setClassFilter(e.target.value)}
                    >
                        <option>All Classes</option>
                        <option>XII-A</option>
                        <option>XII-B</option>
                        <option>XI-A</option>
                        <option>XI-B</option>
                        <option>X-A</option>
                    </select>
                )}
                <button className="btn btn-outline" style={{ padding: '10px 16px' }}><Filter size={18} /> More Filters</button>
            </div>

            {/* User List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {currentList.map((u, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        key={u.id || i}
                        className="card"
                        style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 20 }}
                    >
                        <div style={{
                            width: 48, height: 48, borderRadius: 16,
                            background: activeTab === 'teachers' ? '#D1FAE5' : activeTab === 'students' ? '#E8EFFD' : '#F3E8FF',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, fontWeight: 900, color: tabs.find(t => t.id === activeTab).color
                        }}>
                            {u.name[0]}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 800, fontSize: 15, color: '#0A2463' }}>{u.name}</span>
                                {u.active !== false ? <CheckCircle size={14} color="#10B981" /> : <XCircle size={14} color="#EF4444" />}
                                {activeTab === 'students' && <span style={{ fontSize: 11, fontWeight: 800, background: '#F1F5F9', color: '#64748B', padding: '2px 8px', borderRadius: 6 }}>{u.class}</span>}
                            </div>
                            <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}><Mail size={12} /> {u.email}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B' }}><Phone size={12} /> {u.phone || 'N/A'}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => addToast('Opening edit view...', 'info')}><Edit3 size={16} /></button>
                            <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }} onClick={() => {
                                if (confirm('Delete user?')) {
                                    if (activeTab === 'teachers') deleteTeacher(u.id)
                                    else if (activeTab === 'students') deleteStudent(u.id)
                                    else addToast('Cannot delete system admins.', 'error')
                                }
                            }}><Trash2 size={16} /></button>
                            <button className="btn btn-ghost btn-sm"><MoreVertical size={16} /></button>
                        </div>
                    </motion.div>
                ))}
                {currentList.length === 0 && (
                    <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
                        No users found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}
