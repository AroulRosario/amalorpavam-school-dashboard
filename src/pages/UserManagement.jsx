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

    // Modal State
    const [showModal, setShowModal] = useState(false)
    const [editUser, setEditUser] = useState(null)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '' })

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
                        if (activeTab === 'teachers' || activeTab === 'students') {
                            setEditUser(null)
                            setFormData({ name: '', email: '', phone: '', role: activeTab === 'teachers' ? 'Teacher' : 'Student' })
                            setShowModal(true)
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
                            <button className="btn btn-ghost btn-sm" onClick={() => {
                                setEditUser(u)
                                setFormData({ name: u.name, email: u.email, phone: u.phone || '', role: activeTab === 'teachers' ? 'Teacher' : activeTab === 'students' ? 'Student' : 'Admin' })
                                setShowModal(true)
                            }}><Edit3 size={16} /></button>

                            <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }} onClick={() => {
                                if (confirm(`Remove ${u.name} from the system?`)) {
                                    if (activeTab === 'teachers') {
                                        deleteTeacher(u.id)
                                        addToast('Teacher removed.', 'info')
                                    } else if (activeTab === 'students') {
                                        deleteStudent(u.id)
                                        addToast('Student removed.', 'info')
                                    } else {
                                        addToast('Cannot delete system admins.', 'error')
                                    }
                                }
                            }}><Trash2 size={16} /></button>
                        </div>
                    </motion.div>
                ))}
                {currentList.length === 0 && (
                    <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
                        No users found matching your criteria.
                    </div>
                )}
            </div>

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-content" style={{ maxWidth: 450 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <h3 style={{ margin: 0 }}>{editUser ? 'Edit User' : `Add New ${activeTab === 'teachers' ? 'Staff' : 'Student'}`}</h3>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                if (!formData.name || !formData.email) return addToast('Name and email required', 'error')

                                if (editUser) {
                                    if (activeTab === 'teachers') updateTeacher(editUser.id, { ...editUser, ...formData })
                                    if (activeTab === 'students') updateStudent(editUser.id, { ...editUser, ...formData })
                                    addToast('User updated successfully', 'success')
                                } else {
                                    if (activeTab === 'teachers') addTeacher({ ...formData, subjects: [], classes: [], active: true })
                                    addToast('User added successfully', 'success')
                                }
                                setShowModal(false)
                            }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Full Name</label>
                                    <input className="form-input" placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Email Address</label>
                                    <input type="email" className="form-input" placeholder="john@amal.edu" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Phone (Optional)</label>
                                    <input type="tel" className="form-input" placeholder="+91..." value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
                                    {editUser ? 'Save Changes' : 'Create User'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
