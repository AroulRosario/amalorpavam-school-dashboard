import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCog, Plus, X, Shield, BookOpen, ClipboardCheck, Eye, Upload, Calendar, Users, Edit3, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

const CLASSES = ['LKG-A', 'LKG-B', 'UKG-A', 'UKG-B', ...Array.from({ length: 12 }, (_, i) => [`${i + 1}-A`, `${i + 1}-B`]).flat()]
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Tamil', 'Hindi', 'Computer Science', 'Social Science', 'Economics', 'Commerce', 'Physical Education', 'Art', 'Music']

const PERM_LABELS = [
    { key: 'homework', label: 'Assign Homework', icon: BookOpen, desc: 'Create and assign homework to students' },
    { key: 'markEntry', label: 'Mark Entry', icon: ClipboardCheck, desc: 'Enter marks for allotted exams' },
    { key: 'attendance', label: 'Attendance', icon: Users, desc: 'Mark daily attendance' },
    { key: 'contentUpload', label: 'Content Upload', icon: Upload, desc: 'Upload study materials' },
    { key: 'timetableView', label: 'View Timetable', icon: Calendar, desc: 'Access class timetable' },
    { key: 'studentPerformance', label: 'Student Performance', icon: Eye, desc: 'View student analytics' },
]

export default function TeacherManager() {
    const { teachers, addTeacher, updateTeacher, deleteTeacher, teacherPerms, updateTeacherPerms, students, updateStudent, addToast, DEFAULT_PERMS } = useApp()
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState({ name: '', email: '', password: 'teacher123', subjects: [], classes: [] })
    const [activeTab, setActiveTab] = useState('roster') // roster | permissions | mapping
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    const handleSubmit = () => {
        if (!form.name || !form.email) return
        if (editId) {
            updateTeacher(editId, form)
            addToast('Teacher updated!', 'success')
        } else {
            addTeacher(form)
            addToast('Teacher added!', 'success')
        }
        setShowForm(false)
        setEditId(null)
        setForm({ name: '', email: '', password: 'teacher123', subjects: [], classes: [] })
    }

    const toggleSubject = (s) => setForm(f => ({ ...f, subjects: f.subjects.includes(s) ? f.subjects.filter(x => x !== s) : [...f.subjects, s] }))
    const toggleClass = (c) => setForm(f => ({ ...f, classes: f.classes.includes(c) ? f.classes.filter(x => x !== c) : [...f.classes, c] }))

    return (
        <div className="dashboard-body">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Teacher Manager</h2>
                    <p style={{ fontSize: 14, color: '#64748B', margin: '4px 0 0' }}>Full control over staff accounts, permissions, and student mapping</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditId(null); setForm({ name: '', email: '', password: 'teacher123', subjects: [], classes: [] }); setShowForm(true) }}>
                    <Plus size={18} /> New Teacher
                </button>
            </header>

            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#F1F5F9', borderRadius: 12, padding: 4 }}>
                {[{ id: 'roster', label: 'Staff Roster' }, { id: 'permissions', label: 'Permissions' }].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                        flex: 1, padding: '10px 16px', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
                        background: activeTab === t.id ? 'white' : 'transparent',
                        color: activeTab === t.id ? '#1034A6' : '#64748B',
                        boxShadow: activeTab === t.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* STAFF ROSTER */}
            {activeTab === 'roster' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {teachers.map(t => (
                        <div key={t.id} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: t.active ? '#E8EFFD' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: t.active ? '#1034A6' : '#94A3B8' }}>
                                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>{t.name}</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>{t.email} · {t.subjects.join(', ') || 'No subjects'}</div>
                                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                                    {t.classes.map(c => <span key={c} style={{ fontSize: 10, fontWeight: 800, background: '#F1F5F9', padding: '2px 8px', borderRadius: 6, color: '#64748B' }}>{c}</span>)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.active ? '#10B981' : '#94A3B8' }} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: t.active ? '#10B981' : '#94A3B8' }}>{t.active ? 'Active' : 'Inactive'}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button className="btn btn-outline btn-sm" onClick={() => { setEditId(t.id); setForm({ name: t.name, email: t.email, password: t.password || 'teacher123', subjects: t.subjects, classes: t.classes }); setShowForm(true) }}><Edit3 size={14} /></button>
                                <button className="btn btn-sm" style={{ background: t.active ? '#FEE2E2' : '#D1FAE5', color: t.active ? '#EF4444' : '#059669', border: 'none' }} onClick={() => updateTeacher(t.id, { active: !t.active })}>{t.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}</button>
                                <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#EF4444', border: 'none' }} onClick={() => { deleteTeacher(t.id); addToast('Teacher removed.', 'warning') }}><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PERMISSIONS */}
            {activeTab === 'permissions' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {teachers.filter(t => t.active).map(t => {
                        const perms = teacherPerms[t.id] || DEFAULT_PERMS
                        return (
                            <div key={t.id} className="card" style={{ padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <Shield size={20} color="#1034A6" />
                                    <div style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</div>
                                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>({t.subjects.join(', ')})</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
                                    {PERM_LABELS.map(p => (
                                        <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', border: '1.5px solid #F1F5F9', borderRadius: 12, cursor: 'pointer', background: perms[p.key] ? '#F0FDF4' : 'white' }}
                                            onClick={() => updateTeacherPerms(t.id, { [p.key]: !perms[p.key] })}>
                                            <p.icon size={18} color={perms[p.key] ? '#059669' : '#CBD5E1'} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, fontSize: 13, color: perms[p.key] ? '#059669' : '#94A3B8' }}>{p.label}</div>
                                                <div style={{ fontSize: 11, color: '#94A3B8' }}>{p.desc}</div>
                                            </div>
                                            <div style={{ width: 36, height: 20, borderRadius: 10, background: perms[p.key] ? '#10B981' : '#E2E8F0', position: 'relative', transition: 'all 0.2s' }}>
                                                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: perms[p.key] ? 18 : 2, transition: 'all 0.2s' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}


            {/* Add/Edit Teacher Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-content" style={{ maxWidth: 500 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <h3 style={{ margin: 0 }}>{editId ? 'Edit Teacher' : 'Add Teacher'}</h3>
                                <button onClick={() => { setShowForm(false); setEditId(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Full Name</label>
                                    <input className="form-input" placeholder="e.g. Ms. Anitha K." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Email</label>
                                        <input className="form-input" placeholder="teacher@amal.edu" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Password</label>
                                        <input className="form-input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Subjects</label>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {SUBJECTS.map(s => (
                                            <button key={s} type="button" onClick={() => toggleSubject(s)} style={{
                                                padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer',
                                                background: form.subjects.includes(s) ? '#1034A6' : '#F1F5F9',
                                                color: form.subjects.includes(s) ? 'white' : '#64748B'
                                            }}>{s}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Assigned Classes</label>
                                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxHeight: 120, overflowY: 'auto' }}>
                                        {CLASSES.map(c => (
                                            <button key={c} type="button" onClick={() => toggleClass(c)} style={{
                                                padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                                                background: form.classes.includes(c) ? '#10B981' : '#F1F5F9',
                                                color: form.classes.includes(c) ? 'white' : '#94A3B8'
                                            }}>{c}</button>
                                        ))}
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={handleSubmit}>
                                    {editId ? 'Update Teacher' : 'Add Teacher'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
