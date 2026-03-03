import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Calendar, Users, ClipboardCheck, Plus, X } from 'lucide-react'

export default function ExamAllotment() {
    const { exams, allotExam, teachers, addToast } = useApp()
    const [showAllot, setShowAllot] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        class: 'LKG',
        subject: '',
        teacherId: '',
        date: ''
    })

    const classes = ['LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `${i + 1}`)]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.teacherId) return
        allotExam(formData)
        addToast('Exam allotted successfully!', 'success')
        setShowAllot(false)
    }

    return (
        <div className="dashboard-body">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463' }}>Exam Allotment</h2>
                    <p style={{ fontSize: 14, color: '#64748B' }}>Assign exams and mark entry permissions (LKG - 12)</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAllot(true)}>
                    <Plus size={18} /> Allot New Exam
                </button>
            </header>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {exams.map(exam => {
                    const teacher = teachers.find(t => t.id === Number(exam.teacherId))
                    return (
                        <motion.div key={exam.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                            <div className="card-header" style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ padding: 10, background: '#E8EFFD', borderRadius: 12 }}>
                                        <ClipboardCheck size={20} color="#1034A6" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: 16 }}>{exam.title}</div>
                                        <div style={{ fontSize: 12, color: '#64748B' }}>Class {exam.class} · {exam.subject}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: 16 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                                        <Users size={14} /> Assigned to: <strong>{teacher?.name || 'Unknown'}</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                                        <Calendar size={14} /> Scheduled Date: <strong>{exam.date}</strong>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            <AnimatePresence>
                {showAllot && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-content" style={{ maxWidth: 450 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <h3 style={{ margin: 0 }}>Allot Exam</h3>
                                <button onClick={() => setShowAllot(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Exam Title</label>
                                    <input className="form-input" placeholder="e.g., Mid-Term Mathematics" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Class</label>
                                        <select className="form-input" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })}>
                                            {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Subject</label>
                                        <input className="form-input" placeholder="e.g., Physics" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Assign Teacher</label>
                                    <select className="form-input" value={formData.teacherId} onChange={e => setFormData({ ...formData, teacherId: e.target.value })}>
                                        <option value="">Select Teacher</option>
                                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Exam Date</label>
                                    <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>Save Allotment</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
